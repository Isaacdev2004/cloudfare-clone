# Run the Cloudflare-clone Vite app from the monorepo root.
# Prereqs: Node.js LTS (https://nodejs.org/) — then either:
#   npm install -g pnpm
#   or: corepack enable && corepack prepare pnpm@latest --activate

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js was not found in PATH." -ForegroundColor Red
    Write-Host "Install LTS from https://nodejs.org/ then open a new terminal and run this script again." -ForegroundColor Yellow
    Write-Host "Or try: winget install OpenJS.NodeJS.LTS" -ForegroundColor Yellow
    exit 1
}

if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "pnpm not found. Installing globally with npm..." -ForegroundColor Cyan
    npm install -g pnpm
    if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
        Write-Host "Could not install pnpm. Run: npm install -g pnpm" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Installing workspace dependencies..." -ForegroundColor Cyan
pnpm install

Write-Host "Starting dev server..." -ForegroundColor Cyan
pnpm --filter @workspace/cloudflare-clone run dev
