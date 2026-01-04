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
        // --- 1. Stub the worker route ---
        const workerPath = path.resolve(process.cwd(), routeFile);
        if (fs.existsSync(workerPath)) {
            console.log(`[Cloudflare Prepare] Stubbing worker route: ${routeFile}`);
            fs.writeFileSync(workerPath, stubContent);
            console.log('[Cloudflare Prepare] Successfully replaced with Edge-compatible stub.');
        }

        // --- 2. Flip Sanity Studio to Edge ---
        const studioFile = 'app/(system)/studio/[[...index]]/page.tsx';
        const studioPath = path.resolve(process.cwd(), studioFile);
        if (fs.existsSync(studioPath)) {
            console.log(`[Cloudflare Prepare] Switching Sanity Studio to Edge: ${studioFile}`);
            let content = fs.readFileSync(studioPath, 'utf8');
            content = content.replace('runtime = "nodejs"', 'runtime = "edge"');
            fs.writeFileSync(studioPath, content);
            console.log('[Cloudflare Prepare] Sanity Studio flipped to Edge.');
        }

    } catch (error) {
        console.error('[Cloudflare Prepare] Error during preparation:', error);
        process.exit(1);
    }
}

prepare();
