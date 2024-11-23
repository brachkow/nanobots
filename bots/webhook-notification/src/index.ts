/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Bot, Context, webhookCallback } from 'grammy';

export interface Env {
	BOT_TOKEN: string;
	CHAT_ID: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const bot = new Bot(env.BOT_TOKEN);

		if (request.method === 'POST' && request.headers.get('content-type')?.includes('application/json')) {
			try {
				const payload = await request.json();
				const formattedMessage = `*📥 New Notification:*\n\n\`\`\`json\n${JSON.stringify(payload, null, 2)}\n\`\`\``;

				await bot.api.sendMessage(env.CHAT_ID, formattedMessage, {
					parse_mode: 'Markdown',
				});
				return new Response('Notification sent', { status: 200 });
			} catch (error) {
				return new Response('Invalid JSON payload', { status: 400 });
			}
		}

		return webhookCallback(bot, 'cloudflare-mod')(request);
	},
};
