import { Bot, webhookCallback } from 'grammy';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { Hono } from 'hono';
import { env } from 'hono/adapter';

const app = new Hono<{
	Bindings: {
		BOT_TOKEN: string;
		OPENAI_API_KEY: string;
	};
}>();

app.all('*', (c) => {
	const { BOT_TOKEN, OPENAI_API_KEY } = env(c);

	const bot = new Bot(BOT_TOKEN);

	bot.on('message', async (botContext) => {
		const message = botContext.message;

		console.log('Request!', JSON.stringify(c.req.raw));

		const openAI = createOpenAI({
			apiKey: OPENAI_API_KEY,
		});

		const { text } = await generateText({
			model: openAI('gpt-4-turbo'),
			prompt: `
        Translate this message into Polish language:
        
        ${message.text}
        `,
		});

		await botContext.reply(text);
	});

	return webhookCallback(bot, 'cloudflare-mod')(c.req.raw);
});

export default app;
