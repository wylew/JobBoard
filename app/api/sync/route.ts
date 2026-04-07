import { kv } from '@vercel/kv';
import * as cheerio from 'cheerio';

export async function GET() {
  const companies: any[] = await kv.smembers('company_list');
  for (const company of companies) {
    const res = await fetch(company.url);
    const $ = cheerio.load(await res.text());
    $(company.container).each(async (_, el) => {
      const title = $(el).find(company.titleSelector).text().trim();
      const id = Buffer.from(title + company.url).toString('base64');
      const isNew = await kv.sadd(`seen:${company.name}`, id);
      if (isNew) {
        await kv.lpush('inbox', { title, company: company.name, id, date: new Date() });
      }
    });
  }
  return Response.json({ success: true });
}