# DripTok

TikTok для модников и молодежи.

## Функционал

- Регистрация и вход по email/паролю
- Профиль с редактированием
- Загрузка видео
- Лента видео
- Просмотр видео с лайками и комментариями
- Telegram бот для уведомлений

## Технологии

- Next.js 16
- TypeScript
- Tailwind CSS
- Prisma ORM (SQLite/PostgreSQL)
- Vercel Blob для хранения видео
- JWT аутентификация
- Telegram Bot API

## Запуск локально

1. Установите зависимости:
```bash
npm install
```

2. Настройте переменные окружения:
```bash
cp .env.example .env
```
Отредактируйте `.env` файл.

3. Запустите миграцию базы данных:
```bash
npx prisma migrate dev
```

4. Запустите разработку:
```bash
npm run dev
```

Откройте http://localhost:3000

## Деплой на Vercel

### 1. Создайте репозиторий на GitHub

1. Перейдите на https://github.com/new
2. Назовите репозиторий `driptok`
3. Создайте пустой репозиторий

### 2. Подключите локальный репозиторий

```bash
git remote add origin https://github.com/ваш-логин/driptok.git
git branch -M main
git push -u origin main
```

### 3. Деплой на Vercel

1. Перейдите на https://vercel.com/new
2. Импортируйте ваш GitHub репозиторий
3. Настройте переменные окружения:
   - `DATABASE_URL` - строка подключения к базе данных (рекомендуется Vercel Postgres)
   - `JWT_SECRET` - секретный ключ для JWT
   - `TELEGRAM_BOT_TOKEN` - токен вашего Telegram бота
   - `TELEGRAM_WEBHOOK_URL` - URL вашего домена + `/api/telegram`
   - `BLOB_READ_WRITE_TOKEN` - токен Vercel Blob

4. Нажмите "Deploy"

### 4. Настройка базы данных

1. **Vercel Postgres** (рекомендуется):
   - Перейдите в раздел "Storage" в Vercel
   - Создайте новый Postgres database
   - Скопируйте `DATABASE_URL`
   
2. **Измените провайдер в `prisma/schema.prisma`**:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. **Выполните миграцию**:
```bash
npx prisma migrate deploy
```

### 5. Настройка Telegram бота

1. Создайте бота через [@BotFather](https://t.me/BotFather) в Telegram
2. Получите токен бота
3. Добавьте токен в переменные окружения Vercel как `TELEGRAM_BOT_TOKEN`
4. После деплоя установите webhook:
```
GET https://ваш-домен.vercel.app/api/telegram
```

### 6. Настройка Vercel Blob

1. Перейдите в панель управления Vercel
2. Перейдите в раздел "Storage"
3. Создайте новый Blob store
4. Скопируйте `BLOB_READ_WRITE_TOKEN`
5. Добавьте его в переменные окружения

## API Endpoints

- `POST /api/auth/register` - регистрация
- `POST /api/auth/login` - вход
- `GET /api/videos` - список видео
- `POST /api/videos/upload` - загрузка видео
- `GET /api/videos/[id]` - одно видео
- `POST /api/videos/[id]/like` - лайк
- `POST /api/videos/[id]/comments` - комментарий
- `PUT /api/user/profile` - обновление профиля

## Лицензия

MIT