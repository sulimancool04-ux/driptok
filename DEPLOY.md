# Руководство по деплою DripTok

## Шаг 1: Подготовка

1. Убедитесь, что у вас есть:
   - Аккаунт на GitHub
   - Аккаунт на Vercel
   - Telegram бот (токен)

## Шаг 2: Создание репозитория на GitHub

1. Перейдите на https://github.com/new
2. Назовите репозиторий `driptok`
3. Выберите "Public" (для бесплатного хостинга Vercel)
4. Нажмите "Create repository"

## Шаг 3: Загрузка кода

1. В терминале выполните:
```bash
# Добавьте удаленный репозиторий
git remote add origin https://github.com/ваш-логин/driptok.git

# Переименуйте ветку в main
git branch -M main

# Загрузите код
git push -u origin main
```

## Шаг 4: Настройка Vercel

1. Перейдите на https://vercel.com/new
2. Нажмите "Import" → "Import Git Repository"
3. Выберите ваш репозиторий `driptok`
4. Нажмите "Deploy"

## Шаг 5: Настройка базы данных

1. В панели Vercel перейдите в раздел "Storage"
2. Нажмите "Create Database" → "Postgres"
3. Создайте базу данных
4. Скопируйте `DATABASE_URL`
5. В настройках проекта Vercel (Settings → Environment Variables) добавьте:
   - `DATABASE_URL` = ваша строка подключения

## Шаг 6: Настройка переменных окружения

В настройках проекта Vercel (Settings → Environment Variables) добавьте:

1. `JWT_SECRET` - любой секретный ключ (например, `my-super-secret-key-123`)
2. `TELEGRAM_BOT_TOKEN` - токен вашего Telegram бота
3. `TELEGRAM_WEBHOOK_URL` = `https://ваш-проект.vercel.app/api/telegram`
4. `BLOB_READ_WRITE_TOKEN` - токен Vercel Blob (см. ниже)

## Шаг 7: Настройка Vercel Blob

1. В панели Vercel перейдите в раздел "Storage"
2. Нажмите "Create Database" → "Blob"
3. Создайте Blob store
4. Скопируйте `BLOB_READ_WRITE_TOKEN`
5. Добавьте его в переменные окружения

## Шаг 8: Миграция базы данных

После первого деплоя нужно выполнить миграцию базы данных.

### Вариант 1: Через Vercel CLI

1. Установите Vercel CLI:
```bash
npm i -g vercel
```

2. Войдите:
```bash
vercel login
```

3. Выполните миграцию:
```bash
vercel env pull .env.production
npx prisma migrate deploy
```

### Вариант 2: Через временный endpoint

Создайте API route для миграции (временно):

1. Создайте файл `src/app/api/migrate/route.ts`:
```typescript
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  try {
    const prisma = new PrismaClient();
    // Простой запрос для проверки подключения
    await prisma.$queryRaw`SELECT 1`;
    await prisma.$disconnect();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
```

2. Задепloite и перейдите на `/api/migrate`

## Шаг 9: Настройка Telegram бота

1. После деплоя откройте:
```
https://ваш-проект.vercel.app/api/telegram
```

2. Вы должны увидеть `{"success":true}`

## Шаг 10: Проверка

1. Откройте ваше приложение: `https://ваш-проект.vercel.app`
2. Зарегистрируйтесь
3. Загрузите тестовое видео
4. Проверьте все функции

## Проблемы и решения

### Ошибка "Database connection failed"
- Проверьте `DATABASE_URL` в переменных окружения
- Убедитесь, что база данных создана и доступна

### Ошибка "Vercel Blob token missing"
- Проверьте `BLOB_READ_WRITE_TOKEN`
- Создайте Blob store в разделе Storage

### Видео не загружаются
- Проверьте размер файла (максимум 50MB для Vercel Blob)
- Проверьте формат видео (поддерживаются MP4, MOV, AVI)

## Полезные команды

```bash
# Просмотр логов
vercel logs

# Проверка переменных окружения
vercel env ls

# Обновление переменной
vercel env rm VARIABLE_NAME
vercel env add VARIABLE_NAME
```

## Контакты

Если возникнут проблемы, создайте issue в GitHub репозитории.