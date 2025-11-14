import { revalidatePath, revalidateTag } from 'next/cache';
nexport const runtime = "edge"
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: { current?: string };
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    // Validate the webhook signature
    if (!isValidSignature) {
      const message = 'Invalid signature';
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    }

    // If no body, return error
    if (!body?._type) {
      const message = 'Bad Request';
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    // Revalidate based on the document type
    switch (body._type) {
      case 'post':
        // Revalidate the specific blog post page
        if (body.slug?.current) {
          await revalidatePath(`/blog/${body.slug.current}`);
          console.log(`Revalidated: /blog/${body.slug.current}`);
        }
        
        // Also revalidate the blog listing page
        await revalidatePath('/blog');
        console.log('Revalidated: /blog');
        
        // Revalidate home page (shows featured posts)
        await revalidatePath('/');
        console.log('Revalidated: /');
        
        return NextResponse.json({
          status: 200,
          revalidated: true,
          now: Date.now(),
          message: `Revalidated blog post: ${body.slug?.current || 'unknown'}`,
        });

      case 'category':
        // Revalidate all blog pages when categories change
        await revalidatePath('/blog');
        console.log('Revalidated: /blog (category update)');
        
        return NextResponse.json({
          status: 200,
          revalidated: true,
          now: Date.now(),
          message: 'Revalidated blog categories',
        });

      case 'author':
        // Revalidate all blog pages when authors change
        await revalidatePath('/blog');
        console.log('Revalidated: /blog (author update)');
        
        return NextResponse.json({
          status: 200,
          revalidated: true,
          now: Date.now(),
          message: 'Revalidated blog authors',
        });

      default:
        return NextResponse.json({
          status: 400,
          revalidated: false,
          message: `Unhandled document type: ${body._type}`,
        });
    }
  } catch (err: any) {
    console.error('Error in revalidate endpoint:', err);
    return NextResponse.json({
      status: 500,
      revalidated: false,
      message: err.message,
    });
  }
}

