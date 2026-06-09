# ===== AWS / instância =====

variable "aws_region" {
  description = "Região AWS onde a instância sobe."
  type        = string
  default     = "sa-east-1" # São Paulo
}

variable "project_name" {
  description = "Prefixo de nomes/tags dos recursos."
  type        = string
  default     = "mirante-painel"
}

variable "instance_type" {
  description = "Tipo EC2. Stack (ClickHouse+PG+MinIO+Next) pede 4 vCPU / 16 GB."
  type        = string
  default     = "t3.xlarge"
}

variable "root_volume_gb" {
  description = "Tamanho do disco raiz (gp3, GB)."
  type        = number
  default     = 160
}

variable "key_name" {
  description = "Nome do EC2 key pair criado a partir de ssh_public_key."
  type        = string
  default     = "mirante-painel"
}

# ===== Acesso =====

variable "ssh_public_key_path" {
  description = "Caminho do arquivo da chave SSH PÚBLICA (ex.: ~/.ssh/id_ed25519.pub). Lido via file(); ~ é expandido."
  type        = string
  # sem default: obrigatório
}

variable "allowed_ingress_cidrs" {
  description = "CIDRs liberados para SSH (22) e portas de auditoria (PG 5432, ClickHouse 8123/9100, MinIO 9000/9001, Studio 54323). Web 80/443 fica público. Ex.: [\"SEU_IP/32\"]."
  type        = list(string)
  # sem default: obrigatório (vazio = SSH fechado = sem acesso)
}

# ===== Cloudflare DNS =====

variable "cloudflare_api_token" {
  description = "Token Cloudflare escopado à zona (DNS:Edit). NÃO usar token global."
  type        = string
  sensitive   = true
}

variable "cloudflare_zone_name" {
  description = "Zona DNS gerenciada na Cloudflare."
  type        = string
  default     = "mirantegov.cloud"
}

variable "app_subdomain" {
  description = "Subdomínio do painel (registro A criado: <app_subdomain>.<cloudflare_zone_name>)."
  type        = string
  default     = "painel"
}

variable "cloudflare_proxied" {
  description = "Proxy Cloudflare (nuvem laranja). Deixe false para ACME HTTP-01 do Traefik funcionar."
  type        = bool
  default     = false
}

# ===== Git clone (cloud-init) =====

variable "git_repo_url" {
  description = "URL HTTPS do repositório a clonar na instância."
  type        = string
  default     = "https://github.com/mirantegov/painel.git"
}

variable "git_ref" {
  description = "Branch/tag/commit a fazer checkout."
  type        = string
  default     = "main"
}

variable "github_token" {
  description = "PAT fine-grained read-only (só este repo) para clonar repo privado. Vazio = clone sem auth (repo público)."
  type        = string
  sensitive   = true
  default     = ""
}

# ===== App =====

variable "app_secret_key" {
  description = "Segredo do app gravado em /opt/mirante/.app_secret (chmod 600). Placeholder p/ E2/E3."
  type        = string
  sensitive   = true
  default     = ""
}
