@echo off
REM ============================================================
REM  Mirante - Exportador Elotech (Windows)
REM  Preencha os valores abaixo e rode: run.bat
REM  Exporta 3 schemas: siscop (contabil), aise (tributos+RH), apice (licitacoes)
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
REM EXERCICIOS: anos para siscop (contabil) e aise (tributos/RH)
set EXERCICIOS=2024, 2025, 2026
REM EXERCICIOS_LIC: licitacoes/contratos comecam em 2000 (contratos antigos em
REM andamento referenciam licitacoes antigas). Ajuste o intervalo conforme o cliente.
set EXERCICIOS_LIC=2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026

echo.
echo === SMOKE (siscop.banco + siscop.entidade) ===
exporter-windows-amd64.exe --municipio %IBGE% --ano %ANO% --schema siscop --manifest export-smoke.yaml --var ENTIDADES="%ENTIDADES%"
if errorlevel 1 ( echo FALHOU no smoke & exit /b 1 )

echo.
echo Smoke OK. Para a exportacao COMPLETA dos 3 schemas, rode na ordem:
echo.
echo   REM 1) Contabil (siscop)
echo   exporter-windows-amd64.exe --municipio %IBGE% --ano %ANO% --manifest elotech-eloweb.yaml --var ENTIDADES="%ENTIDADES%" --var EXERCICIOS="%EXERCICIOS%"
echo.
echo   REM 2) Tributos + RH (aise) -- dump full, sem --var
echo   exporter-windows-amd64.exe --municipio %IBGE% --ano %ANO% --manifest elotech-aise.yaml
echo.
echo   REM 3) Licitacoes + Contratos (apice) -- EXERCICIOS a partir de 2000
echo   exporter-windows-amd64.exe --municipio %IBGE% --ano %ANO% --manifest elotech-apice.yaml --var ENTIDADES="%ENTIDADES%" --var EXERCICIOS="%EXERCICIOS_LIC%"
echo.
echo (O --schema nao e necessario: cada manifest ja traz o schema no 'source'.)
