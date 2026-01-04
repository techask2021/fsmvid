import fs from 'fs';
import path from 'path';

// Define the route file to be stubbed
const routeFile = 'app/api/workers/process-bulk/route.ts';

const stubContent = `import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

/**
 * STUB: This route handler is disabled on Cloudflare Pages 
 * as it requires Node.js modules (archiver/streams) not available on Edge.
 * This worker runs exclusively on Vercel.
 */
export async function POST(request: NextRequest) {
    return NextResponse.json(
        { 
            error: "This worker endpoint is not supported on the Cloudflare Edge Runtime. It is active on the Vercel worker deployment.",
            platform: "cloudflare-edge-stub"
        }, 
        { status: 501 }
    );
}
`;

function prepare() {
    try {
        const fullPath = path.resolve(process.cwd(), routeFile);

        if (fs.existsSync(fullPath)) {
            console.log(`[Cloudflare Prepare] Stubbing worker route: ${routeFile}`);
            fs.writeFileSync(fullPath, stubContent);
            console.log('[Cloudflare Prepare] Successfully replaced with Edge-compatible stub.');
        } else {
            console.warn(`[Cloudflare Prepare] Warning: Could not find ${routeFile}`);
        }
    } catch (error) {
        console.error('[Cloudflare Prepare] Error during preparation:', error);
        process.exit(1);
    }
}

prepare();
