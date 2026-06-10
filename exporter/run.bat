@echo off
REM ============================================================
REM  Mirante - Exportador Elotech (Windows)
REM  Preencha os 4 valores abaixo e rode: run.bat
REM ============================================================

REM --- Banco do ERP (local) ---
set DATABASE_URL=postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO

REM --- MinIO (S3) da VPS ---
set S3_ENDPOINT=https://minio.mirantegov.cloud
set S3_BUCKET=mirante-parquet
set S3_ACCESS_KEY=PREENCHA
set S3_SECRET_KEY=PREENCHA

REM --- Alvo: IBGE + entidades + exercicios ---
set IBGE=4117107
set ANO=2026
set ENTIDADES=1, 2, 3
set EXERCICIOS=2024, 2025, 2026

echo.
echo === SMOKE (siscop.banco + siscop.entidade) ===
exporter-windows-amd64.exe --municipio %IBGE% --ano %ANO% --schema siscop --manifest export-smoke.yaml --var ENTIDADES="%ENTIDADES%"
if errorlevel 1 ( echo FALHOU no smoke & exit /b 1 )

echo.
echo Smoke OK. Para a exportacao COMPLETA, rode:
echo   exporter-windows-amd64.exe --municipio %IBGE% --ano %ANO% --schema siscop --manifest elotech-eloweb.yaml --var ENTIDADES="%ENTIDADES%" --var EXERCICIOS="%EXERCICIOS%"
