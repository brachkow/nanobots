import { Bot, webhookCallback } from 'grammy';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

export interface Env {
	BOT_TOKEN: string;
	OPENAI_API_KEY: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const bot = new Bot(env.BOT_TOKEN);

		bot.on('message', async (ctx) => {
			const message = ctx.message;

			console.log('Request!', JSON.stringify(request));

			const openAI = createOpenAI({
				apiKey: env.OPENAI_API_KEY,
			});

			const { text } = await generateText({
				model: openAI('gpt-4-turbo'),
				prompt: `
        Translate this message into Polish language:
        
        ${message.text}
        `,
			});

			await ctx.reply(text);
		});

		return webhookCallback(bot, 'cloudflare-mod')(request);
	},
};
