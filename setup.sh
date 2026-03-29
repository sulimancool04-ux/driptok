#!/bin/bash

# DripTok Setup Script for Linux/Mac

echo -e "\033[36mSetting up DripTok...\033[0m"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "\033[31mNode.js is not installed. Please install Node.js from https://nodejs.org/\033[0m"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "\033[31mnpm is not installed.\033[0m"
    exit 1
fi

# Install dependencies
echo -e "\033[33mInstalling dependencies...\033[0m"
npm install

# Create .env file if not exists
if [ ! -f .env ]; then
    echo -e "\033[33mCreating .env file...\033[0m"
    cp .env.example .env
    echo -e "\033[32mPlease edit .env file with your configuration\033[0m"
fi

# Generate Prisma client
echo -e "\033[33mGenerating Prisma client...\033[0m"
npx prisma generate

# Run database migrations
echo -e "\033[33mRunning database migrations...\033[0m"
npx prisma migrate dev --name init

echo -e "\033[32mSetup complete!\033[0m"
echo ""
echo -e "\033[36mTo start the development server:\033[0m"
echo -e "  \033[37mnpm run dev\033[0m"
echo ""
echo -e "\033[36mTo deploy to Vercel:\033[0m"
echo -e "  1. \033[37mCreate a GitHub repository\033[0m"
echo -e "  2. \033[37mPush your code: git push -u origin main\033[0m"
echo -e "  3. \033[37mImport to Vercel and set environment variables\033[0m"