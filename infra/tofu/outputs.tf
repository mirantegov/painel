output "public_ip" {
  description = "IP público fixo (Elastic IP)."
  value       = aws_eip.mirante.public_ip
}

output "instance_id" {
  value = aws_instance.mirante.id
}

output "app_fqdn" {
  description = "Hostname com registro A criado na Cloudflare."
  value       = local.app_fqdn
}

output "dns_record" {
  description = "Registro Cloudflare (nome -> IP, proxied)."
  value       = "${cloudflare_record.painel.hostname} -> ${aws_eip.mirante.public_ip} (proxied=${var.cloudflare_proxied})"
}

output "ssh_command" {
  description = "Comando de acesso (usuário deploy)."
  value       = "ssh deploy@${aws_eip.mirante.public_ip}"
}

output "ami_id" {
  description = "AMI Ubuntu 24.04 resolvida."
  value       = data.aws_ami.ubuntu.id
}
