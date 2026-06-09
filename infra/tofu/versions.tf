terraform {
  required_version = ">= 1.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.40"
    }
  }

  # Estado local por padrão (homolog). Para time/multi-máquina, migrar para S3 + DynamoDB:
  # backend "s3" {
  #   bucket         = "mirante-tofu-state"
  #   key            = "vps/terraform.tfstate"
  #   region         = "sa-east-1"
  #   dynamodb_table = "mirante-tofu-locks"
  #   encrypt        = true
  # }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Project   = var.project_name
      ManagedBy = "opentofu"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}
