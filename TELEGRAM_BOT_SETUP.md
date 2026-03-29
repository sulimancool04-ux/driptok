# Настройка Telegram бота для DripTok

## Шаг 1: Создание бота

1. Откройте Telegram и найдите [@BotFather](https://t.me/BotFather)
2. Отправьте команду `/newbot`
3. Введите имя бота (например, "DripTok Bot")
4. Введите username бота (должен заканчиваться на `bot`, например `driptok_bot`)
5. Сохраните полученный токен

## Шаг 2: Настройка переменных окружения

Добавьте токен в переменные окружения Vercel:
```
TELEGRAM_BOT_TOKEN=ваш_токен_от_botfather
```

## Шаг 3: Настройка webhook

После деплоя приложения на Vercel:

1. Откройте браузер
2. Перейдите по адресу: `https://ваш-домен.vercel.app/api/telegram`
3. Вы должны увидеть: `{"success": true}`

## Шаг 4: Тестирование бота

1. Найдите вашего бота в Telegram
2. Отправьте команду `/start`
3. Бот должен ответить

## Доступные команды

В настоящее время бот поддерживает:
- `/start` - приветственное сообщение
- `/help` - справка

## Расширение функционала

Чтобы добавить больше команд бота, отредактируйте файл `src/app/api/telegram/route.ts`.

Пример добавления команды:
```typescript
bot.onText(/\/ping/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Pong!');
});
```

## Устранение проблем

### Бот не отвечает
- Проверьте токен бота в переменных окружения
- Проверьте логи Vercel: `vercel logs`
- Убедитесь, что webhook установлен (проверьте GET запрос к `/api/telegram`)

### Ошибка "Bot can't initiate conversations"
- Пользователь должен сначала найти бота и нажать "Start"
- Или используйте deep linking: `https://t.me/username_bot?start= параметр`

## Полезные ссылки

- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [BotFather](https://t.me/botfather)
- [node-telegram-bot-api Documentation](https://github.com/yagop/node-telegram-bot-api)