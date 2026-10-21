import { llmsTxt } from '@/lib/llms';

// /llms.txt (llmstxt.org), generado desde el contenido de la web en cada compilación.
export const dynamic = 'force-static';

export function GET() {
  return new Response(llmsTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
