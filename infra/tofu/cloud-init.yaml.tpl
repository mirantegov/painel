#cloud-config
package_update: true
package_upgrade: true

packages:
  - git

users:
  - default
  - name: deploy
    groups: [sudo]
    shell: /bin/bash
    sudo: "ALL=(ALL) NOPASSWD:ALL"
    ssh_authorized_keys:
      - ${ssh_public_key}

write_files:
  - path: /opt/mirante/.app_secret
    permissions: "0600"
    owner: root:root
    content: ${app_secret_key}

runcmd:
  # Docker Engine + Compose plugin (script oficial)
  - curl -fsSL https://get.docker.com | sh
  - usermod -aG docker deploy
  - usermod -aG docker ubuntu

  # Swap 4G (cobre picos de build Next / ETL com 16G RAM)
  - test -f /swapfile || (fallocate -l 4G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile)
  - grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab

  # Diretórios persistentes do stack (E1.10) — chown ANTES do clone
  - mkdir -p /opt/mirante/data/postgres /opt/mirante/data/minio /opt/mirante/data/clickhouse /opt/mirante/backups
  - chown -R deploy:deploy /opt/mirante

  # Clona o repositório como deploy (token usado só aqui; remote reescrito sem token)
  - su - deploy -c "git clone --branch ${git_ref} ${git_clone_url} /opt/mirante/painel"
  - su - deploy -c "cd /opt/mirante/painel && git remote set-url origin ${git_origin_url}"

  - chown root:root /opt/mirante/.app_secret && chmod 600 /opt/mirante/.app_secret

  # Próximos passos (E2/E3): criar .env.production e subir docker-compose.prod.yml
