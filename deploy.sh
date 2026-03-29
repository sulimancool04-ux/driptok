#!/bin/bash

# DripTok Deployment Script
# Этот скрипт помогает настроить деплой на Vercel

echo -e "\033[36mDripTok Deployment Script\033[0m"
echo ""

# Проверка Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "\033[33mVercel CLI не установлен. Установите его:\033[0m"
    echo -e "  \033[37mnpm i -g vercel\033[0m"
    exit 1
fi

# Вход в Vercel
echo -e "\033[33mПроверка авторизации Vercel...\033[0m"
vercel whoami || {
    echo -e "\033[33mВойдите в Vercel:\033[0m"
    vercel login
}

# Пул переменных окружения
echo -e "\033[33mПолучение переменных окружения...\033[0m"
vercel env pull .env.production

# Проверка переменных
if [ ! -f .env.production ]; then
    echo -e "\033[31mНе удалось получить переменные окружения\033[0m"
    exit 1
fi

# Миграция базы данных
echo -e "\033[33mЗапуск миграции базы данных...\033[0m"
DATABASE_URL=$(grep DATABASE_URL .env.production | cut -d '=' -f2-)
if [ -z "$DATABASE_URL" ]; then
    echo -e "\033[31mDATABASE_URL не найден в переменных окружения\033[0m"
    exit 1
fi

export DATABASE_URL
npx prisma migrate deploy

# Генерация Prisma клиента
echo -e "\033[33mГенерация Prisma клиента...\033[0m"
npx prisma generate

# Сборка проекта
echo -e "\033[33mСборка проекта...\033[0m"
npm run build

# Деплой
echo -e "\033[33mДеплой на Vercel...\033[0m"
vercel --prod

echo ""
echo -e "\033[32mДеплой завершен!\033[0m"
echo ""
echo -e "\033[36mСледующие шаги:\033[0m"
echo -e "  1. \033[37mОткройте ваше приложение в браузере\033[0m"
echo -e "  2. \033[37mНастройте Telegram бота: GET /api/telegram\033[0m"
echo -e "  3. \033[37mПротестируйте все функции\033[0m"