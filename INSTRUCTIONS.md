# Инструкция по созданию репозитория и деплою DripTok

## Что я сделал:

1. **Создал полное Next.js приложение** с:
   - Регистрацией/входом по email и паролю
   - Профилем пользователя с возможностью редактирования
   - Загрузкой видео (интеграция с Vercel Blob)
   - Лентой видео
   - Просмотром видео с лайками и комментариями
   - Telegram ботом (токен: `8654553119:AAHPziXg8AJ8wCz5C56ucKrnusoIs2XHfpM`)

2. **Настроил базу данных** с Prisma ORM (SQLite для разработки, PostgreSQL для продакшена)

3. **Создал middleware** для защиты API маршрутов

4. **Добавил TypeScript типы** и исправил ошибки

5. **Создал документацию**:
   - `README.md` - основная документация
   - `DEPLOY.md` - подробное руководство по деплою
   - `TELEGRAM_BOT_SETUP.md` - настройка Telegram бота

6. **Добавил скрипты**:
   - `setup.sh` / `setup.ps1` - для локальной настройки
   - `deploy.sh` - для деплоя на Vercel

7. **Настроил Git репозиторий** и сделал все коммиты

## Что нужно сделать вам:

### Шаг 1: Создайте репозиторий на GitHub

1. Перейдите на https://github.com/new
2. Назовите репозиторий: `driptok`
3. Выберите "Public"
4. Нажмите "Create repository"

### Шаг 2: Подключите ваш локальный репозиторий

В терминале выполните (замените `ваш-логин` на ваш логин GitHub):

```bash
# Перейдите в папку проекта
cd C:\Users\kakas\OneDrive\Desktop\driptok

# Добавьте удаленный репозиторий
git remote add origin https://github.com/ваш-логин/driptok.git

# Переименуйте ветку
git branch -M main

# Загрузите код
git push -u origin main
```

### Шаг 3: Деплой на Vercel

1. Перейдите на https://vercel.com/new
2. Нажмите "Import" → "Import Git Repository"
3. Выберите репозиторий `driptok`
4. Нажмите "Deploy"

### Шаг 4: Настройка переменных окружения

В настройках проекта Vercel (Settings → Environment Variables) добавьте:

1. `DATABASE_URL` - строка подключения к PostgreSQL (создайте базу в разделе Storage)
2. `JWT_SECRET` - любой секретный ключ
3. `TELEGRAM_BOT_TOKEN` = `8654553119:AAHPziXg8AJ8wCz5C56ucKrnusoIs2XHfpM`
4. `TELEGRAM_WEBHOOK_URL` = `https://ваш-проект.vercel.app/api/telegram`
5. `BLOB_READ_WRITE_TOKEN` - токен Vercel Blob (создайте в разделе Storage)

### Шаг 5: Миграция базы данных

После первого деплоя выполните миграцию:

```bash
# Установите Vercel CLI
npm i -g vercel

# Войдите
vercel login

# Выполните миграцию
vercel env pull .env.production
npx prisma migrate deploy
```

## Тестирование

1. Откройте ваше приложение: `https://ваш-проект.vercel.app`
2. Зарегистрируйтесь
3. Загрузите тестовое видео
4. Проверьте лайки и комментарии
5. Проверьте Telegram бота: перейдите на `https://ваш-проект.vercel.app/api/telegram`

## Контакты

Если возникнут проблемы, проверьте:
- `DEPLOY.md` - подробное руководство
- `TELEGRAM_BOT_SETUP.md` - настройка бота
- Логи Vercel: `vercel logs`

Готово! У вас есть полноценный TikTok для модников.