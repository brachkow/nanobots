import { Bot } from 'grammy';

export interface Env {
	BOT_TOKEN: string;
	CHAT_ID: string;
}

export default {
	async scheduled(_controller: ScheduledController, env: Env, _ctx: ExecutionContext): Promise<void> {
		const bot = new Bot(env.BOT_TOKEN);

		await bot.api.sendMessage(env.CHAT_ID, 'Hello World!');
	},
};
