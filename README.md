# nanobots

Collection of single-purpose Telegram bots that can be helpful in a wide range of tasks. Feel free to copy-paste them and repurpose them for your needs.

I made them because usually my automation scenario looks like this:

1. I get an amazing automation idea.
2. I remember the horrors of visual programming in n8n and the labor of managing self-hosted stuff on Hetzner.
3. I remember a joke about «real Linux users who can, in 2 hours, automate a task to be completed in 5 minutes, instead of completing it in 1 hour by hand.»
4. I decide not to procrastinate on that.

But what if I already had all the needed code on hand and was able to run it somewhere without payment/administration fees? So I made it.

## Bots

- [ ] RSS notification — get notified each time an RSS feed is updated.
- [x] [Scheduled notification](https://github.com/brachkow/nanobots/tree/main/bots/scheduled-message) — get notifications based on cron jobs.
  - Build a Google Sheet habit tracker by sending yourself a Google Form every day before sleep.
- [x] [Webhook notification](https://github.com/brachkow/nanobots/tree/main/bots/webhook-notification) — get notifications on webhook requests.
  - Log important events from your backned to a telegram chat
- [ ] HTML notification
  - Get notified when a Shopify store opens.
- [x] [GPT transformer](https://github.com/brachkow/nanobots/tree/main/bots/gpt-transformer) — transforms your text message with OpenAI API using a predefined prompt. For example, you can:
  - Fix spelling without changing writing style.
  - Rewrite the coldest Slavic email into the most best regarding English email.

## How to host a bot

I personally host, and recommend you to host bot's as cloudflare workers.

But if you want to host bot in other way, you may do them — code is wrapped as hono app so it is envrioment agnostic and can run in any serverless enviroment or on an actual server.

Some of the bot's may depend on cloudflare resources like KV or SQLite DB. In such cases you need to tweak the code to make it work.

### Here is the guide for cloudflare workers:

1. You need to have an account on Cloudflare.
2. Then you will be able to run `pnpm run deploy` inside the bot folder.
3. Then go to Cloudflare dashboard → Workers and Pages → {your worker} → settings → variables and secrets and add needed secrets. For all bots, you will need `BOT_TOKEN` obtainable from [@botfather](https://t.me/BotFather). Depending on the bot, you may need to add other keys — you can check which key names you need by visiting the `index.ts` of your bot and inspecting the `Env` type interface.
4. Then you need to [set a webhook for your bot](https://grammy.dev/hosting/cloudflare-workers-nodejs#setting-your-webhook) — enter this URL into your browser `https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://<YOUR_CLOUDFLARE_WORKER_URL>/`

That's all. Next time you can just push updates via `pnpm run deploy`. If something doesn't work, you can read [this huge guide on hosting Telegram bots on Cloudflare Workers](https://grammy.dev/hosting/cloudflare-workers-nodejs#setting-your-webhook).

## What is CHAT_ID?

Sending messages from bot to user without user intent may be tricky. To simplify this, a combination of bot + chat is used.

So, if you see the `CHAT_ID` variable in your `Env` interface, you need to:

- Create an empty chat for notifications (you can use one chat for all your bots).
- Copy the bot handle to add the bot as a chat admin.
- Send the chat URL to [@username_to_id_bot](https://t.me/username_to_id_bot) to receive CHAT_ID.
- Add it as the `CHAT_ID` variable in the Cloudflare dashboard.
