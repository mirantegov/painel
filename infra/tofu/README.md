# infra/tofu — Provisionamento da VPS (OpenTofu, AWS EC2)

Provisiona a VPS de homologação do Mirante Painel (Épico 1) como código: 1 instância EC2 Ubuntu 24.04, disco gp3, Elastic IP, security group e bootstrap via cloud-init (Docker + Compose, swap, usuário `deploy`, diretórios `/opt/mirante`).

> Não sobe a aplicação — só a máquina. App/Traefik/Postgres/ClickHouse vêm depois via `docker-compose.prod.yml` (Épicos 2–3).

## Recursos criados

- `aws_instance` (default: `t3.xlarge`, 4 vCPU / 16 GB)
- `aws_ebs` root gp3 criptografado (default 160 GB)
- `aws_eip` (IP fixo → alvo do DNS `painel.mirantegov.cloud`)
- `aws_security_group`: 80/443 público; 22 só do seu IP; portas de auditoria só se `audit_ingress_cidrs` for setado
- `aws_key_pair` a partir da sua chave pública

## Pré-requisitos

- `tofu` instalado
- Conta AWS + credenciais IAM com permissão EC2/VPC
- Sua chave SSH pública e seu IP público

## Uso

```bash
cd infra/tofu
cp .env.example .env      # preencha (ver seção abaixo)
set -a && source .env && set +a

tofu init
tofu plan
tofu apply                # cria a infra (custo a partir daqui)

tofu output ssh_command   # como conectar
tofu output public_ip     # aponte o DNS A para este IP
```

Destruir: `tofu destroy`.

## O que preencher no `.env`

| Variável | Obrigatório | O que é |
| --- | --- | --- |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | Sim (ou `AWS_PROFILE`) | Credencial IAM |
| `TF_VAR_ssh_public_key` | Sim | Conteúdo de `~/.ssh/*.pub` |
| `TF_VAR_ssh_ingress_cidr` | Sim | `SEU_IP/32` (`curl -s ifconfig.me`) |
| `TF_VAR_audit_ingress_cidrs` | Não | `["SEU_IP/32"]` p/ DataGrip nos bancos |
| `TF_VAR_instance_type` / `aws_region` / `root_volume_gb` | Não | Overrides (têm default) |

## Estado

Local por padrão (`terraform.tfstate`, ignorado no git). Para time, migrar para backend S3+DynamoDB (bloco comentado em `versions.tf`).
