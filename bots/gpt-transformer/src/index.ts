import { Bot, webhookCallback } from 'grammy';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { Hono } from 'hono';

const app = new Hono<{
	Bindings: {
		BOT_TOKEN: string;
		OPENAI_API_KEY: string;
	};
}>();

app.all('*', (c) => {
	const bot = new Bot(c.env.BOT_TOKEN);

	bot.on('message', async (botContext) => {
		const message = botContext.message;

		console.log('Request!', JSON.stringify(c.req.raw));

		const openAI = createOpenAI({
			apiKey: c.env.OPENAI_API_KEY,
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
