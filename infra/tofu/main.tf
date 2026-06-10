data "aws_vpc" "default" {
  default = true
}

# AZs que ofertam o instance_type escolhido (evita AZ sem t3.xlarge etc.)
data "aws_ec2_instance_type_offerings" "supported" {
  filter {
    name   = "instance-type"
    values = [var.instance_type]
  }
  location_type = "availability-zone"
}

# Subnets do VPC default SÓ nas AZs que suportam o tipo
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
  filter {
    name   = "availability-zone"
    values = data.aws_ec2_instance_type_offerings.supported.locations
  }
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd*/ubuntu-noble-24.04-amd64-server-*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_key_pair" "deploy" {
  key_name   = var.key_name
  public_key = local.ssh_public_key
}

locals {
  # Conteúdo da chave pública lido do arquivo (~ expandido).
  ssh_public_key = trimspace(file(pathexpand(var.ssh_public_key_path)))

  # Portas restritas ao allowlist (além do SSH 22).
  audit_ports = [5432, 8123, 9100, 9000, 9001, 54323]

  # URL de clone com token embutido quando github_token presente (repo privado).
  git_clone_url = var.github_token != "" ? replace(var.git_repo_url, "https://", "https://x-access-token:${var.github_token}@") : var.git_repo_url

  app_fqdn = "${var.app_subdomain}.${var.cloudflare_zone_name}"
}

resource "aws_security_group" "mirante" {
  name        = "${var.project_name}-sg"
  description = "Mirante Painel: web publico + SSH/auditoria restritos"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.allowed_ingress_cidrs
  }

  ingress {
    description = "HTTP (Traefik / ACME HTTP-01)"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS (Traefik)"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  dynamic "ingress" {
    for_each = local.audit_ports
    content {
      description = "Auditoria porta ${ingress.value}"
      from_port   = ingress.value
      to_port     = ingress.value
      protocol    = "tcp"
      cidr_blocks = var.allowed_ingress_cidrs
    }
  }

  egress {
    description = "Saida livre (egress)"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-sg"
  }
}

resource "aws_instance" "mirante" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.instance_type
  subnet_id                   = data.aws_subnets.default.ids[0]
  vpc_security_group_ids      = [aws_security_group.mirante.id]
  key_name                    = aws_key_pair.deploy.key_name
  associate_public_ip_address = true

  user_data = templatefile("${path.module}/cloud-init.yaml.tpl", {
    ssh_public_key = local.ssh_public_key
    git_clone_url  = local.git_clone_url
    git_origin_url = var.git_repo_url
    git_ref        = var.git_ref
    app_secret_key = var.app_secret_key
  })

  root_block_device {
    volume_type = "gp3"
    volume_size = var.root_volume_gb
    encrypted   = true
  }

  tags = {
    Name = var.project_name
  }
}

resource "aws_eip" "mirante" {
  instance = aws_instance.mirante.id
  domain   = "vpc"

  tags = {
    Name = "${var.project_name}-eip"
  }
}

# ===== Cloudflare DNS =====

data "cloudflare_zone" "this" {
  name = var.cloudflare_zone_name
}

resource "cloudflare_record" "painel" {
  zone_id = data.cloudflare_zone.this.id
  name    = var.app_subdomain
  type    = "A"
  value   = aws_eip.mirante.public_ip
  proxied = var.cloudflare_proxied
  ttl     = var.cloudflare_proxied ? 1 : 300
  comment = "Mirante Painel - gerenciado por OpenTofu"
}

# MinIO S3 API (via Traefik). DNS-only (proxied=false) p/ não quebrar SigV4/uploads.
resource "cloudflare_record" "minio" {
  zone_id = data.cloudflare_zone.this.id
  name    = "minio"
  type    = "A"
  value   = aws_eip.mirante.public_ip
  proxied = false
  ttl     = 300
  comment = "MinIO S3 API via Traefik - OpenTofu"
}
