#!/usr/bin/env pwsh

# DripTok Setup Script for Windows

Write-Host "Setting up DripTok..." -ForegroundColor Cyan

# Check if Node.js is installed
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js is not installed. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "npm is not installed." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# Create .env file if not exists
if (!(Test-Path .env)) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "Please edit .env file with your configuration" -ForegroundColor Green
}

# Generate Prisma client
Write-Host "Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

# Run database migrations
Write-Host "Running database migrations..." -ForegroundColor Yellow
npx prisma migrate dev --name init

Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the development server:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "To deploy to Vercel:" -ForegroundColor Cyan
Write-Host "  1. Create a GitHub repository" -ForegroundColor White
Write-Host "  2. Push your code: git push -u origin main" -ForegroundColor White
Write-Host "  3. Import to Vercel and set environment variables" -ForegroundColor White