import { llmsFullTxt } from '@/lib/llms';

// /llms-full.txt: todo el contenido de la web en texto, para asistentes de IA (llmstxt.org).
export const dynamic = 'force-static';

export function GET() {
  return new Response(llmsFullTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
