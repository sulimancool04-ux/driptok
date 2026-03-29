import { NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";

const token = process.env.TELEGRAM_BOT_TOKEN || "8654553119:AAHPziXg8AJ8wCz5C56ucKrnusoIs2XHfpM";
const bot = new TelegramBot(token, { polling: false });

// This route will handle Telegram webhook updates
export async function POST(request: Request) {
  try {
    const update = await request.json();
    
    // Process update with bot
    bot.processUpdate(update);
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Set webhook (can be called manually)
export async function GET() {
  try {
    const webhookUrl = process.env.TELEGRAM_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { error: "TELEGRAM_WEBHOOK_URL not set" },
        { status: 400 }
      );
    }
    
    await bot.setWebHook(webhookUrl);
    return NextResponse.json({ success: true, webhookUrl });
  } catch (error) {
    console.error("Set webhook error:", error);
    return NextResponse.json(
      { error: "Failed to set webhook" },
      { status: 500 }
    );
  }
}