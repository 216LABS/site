# 216labs.dev

Next.js 16 + Tailwind 4, deployed to Vercel from `main`.

## Where things live

- `src/content/site.ts`: all copy (services, FAQ, process, team, case studies, booking link). The page, JSON-LD, `/llms.txt` and the chatbot's knowledge base are generated from it, so edit copy here only.
- `src/content/posts.ts`: the writing section. Append a post object to publish.
- `src/app/globals.css`: design tokens (light and dark) and all component styles.
- `src/app/api/chat`: the "Ask this site" demo (Claude, streaming, grounded in `site.ts`).
- `src/app/api/contact`: the contact form (Gmail SMTP).

## Environment variables (Vercel > Settings > Environment Variables)

| Name | Needed for |
| --- | --- |
| `ANTHROPIC_API_KEY` | Live chatbot. Set a monthly spend limit in the Anthropic Console; that is the hard cost ceiling. |
| `CHAT_MODEL` | Optional. Defaults to `claude-opus-5-5`. |
| `GMAIL_USER`, `GMAIL_APP_PASSWORD` | Contact form email |
| `XAI_API_KEY` | Browser voice demo in the `#voice` card (mints short-lived tokens; the key never reaches the browser). Set a monthly spend limit in the xAI console. |
| `XAI_VOICE_AGENT_ID` | Optional. Run the voice demo on an agent saved in the xAI console (`agent_...`). Without it, the demo uses the prompt in `src/content/demos.ts`. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel. Fires `PageView`, `Lead` (form sent) and `Contact` (booking click or phone tap). Every event is also pushed to `window.dataLayer`. |

## Service demos

- `#voice`: browser call with an xAI voice agent (`src/components/VoiceDemo.tsx`, `src/app/api/voice-session`). Script, sample business, session cap and optional demo phone number live in `src/content/demos.ts`.
- `#chatbot`: links to the "Ask this site" console.

## Reviewing chatbot answers

Every question and answer is logged as one JSON line. In Vercel > Logs, search `chat_log`.

## Deep links for ads and outreach

`/#voice`, `/#chatbot`, `/#visibility`, `/#mcp`, `/#custom` jump to the offer and preselect it in the form. `?service=voice` also preselects it, and UTM parameters plus `fbclid` are included in the lead email.

## AI crawler checks after deploying

```bash
curl -sL -A "GPTBot/1.2" -o /dev/null -w "%{http_code}\n" https://www.216labs.dev/
curl -s https://www.216labs.dev/robots.txt
curl -s https://www.216labs.dev/llms.txt | head
```

Also confirm Vercel > Firewall has no rule or managed bot ruleset blocking AI crawlers.
