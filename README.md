# nanobots

Collection of single-prupose telegram bots that can be helpful in a wide range of tasks. Feel free to copy-paste them and reprupose for your needs.

I made them because usually my automation scenario looks like that:

1. I get amazing automation idea
2. I remember horrors of visual programming in n8n and labour of managing selfhosted stuff on hetzner
3. I remember a joke about «real linux user who can in 2 hours automate task to be completed in 5 minutes, instead of completing it in 1 hour by hand»
4. I decide to not procrastinate on that

But what if I already had all needed code on hand, and was able to somwhere run on it payment/administration free? So I made it.

## Bots

- [ ] RSS notification — get notification each time RSS-feed got updated
- [x] Scheldued notification — get notifications based on cronjob
  - Build a google sheet habit tracker by sending yourself google form every day before sleep
- [ ] Webhook notification — get notifications on webhook request
- [ ] HTML notification
  - Get notification when Shopify store gets opened
- [x] GPT transformer — transforms your text message with OpenAI API with predefined prompt. For example you can:
  - Fix spelling without changing writing style
  - Rewrite the coldest slavic email, to the most best regarding english email

## How to host bot

1. You need to have account on cloudflare
2. Then you will be able to do `pnpm run deploy` inside bot folder
3. Then go cloudflare dashboard → workers and pages → {your worker} → settings → variables and secrets and add needed secrets. For all bots you will need `BOT_TOKEN` obtainable from [@botfather](https://t.me/BotFather). Depending on bot you may need to add other keys — you can check what key names you need by visiting index.ts of your bot and inspecting `Env` type interface.
4. Then you need to [set webhook for your bot](https://grammy.dev/hosting/cloudflare-workers-nodejs#setting-your-webhook) — enter this url into your browser `https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://<YOUR_CLOUDFLARE_WORKER_URL»/`

That's all. Next time you can just push updates via `pnpm run deploy`. If something doesn't work you can read [this huge guide on hosting telegram bots on Cloudflare Workers](https://grammy.dev/hosting/cloudflare-workers-nodejs#setting-your-webhook).

## What is CHAT_ID?

Sending messages from bot to user without user intent may be tricky. To simplify this combination of bot + chat is used.

So, if you see `CHAT_ID` variable in your `Env` interface you need to:

- Create empty chat for notifications (you can use one chat for all your bots)
- Copy bot handle to add bot as chat admin
- Send chat url to [@username_to_id_bot]('https://t.me/username_to_id_bot') to receive CHAT_ID
- Add it as `CHAT_ID` variable in cloudflare dashboard
