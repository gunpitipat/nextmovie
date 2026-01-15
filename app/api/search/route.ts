import { searchMedia } from '@/lib/tmdb';
import { type NextRequest, NextResponse } from 'next/server';
import type { APIError, APIResponse, PaginatedResponse, Media } from '@/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('q');
  const page = searchParams.get('page');

  if (!q) {
    return NextResponse.json<APIError>(
      { error: 'Missing query parameter: q' },
      { status: 400 }
    );
  }

  const pageNumber = page ? Number(page) : 1;

  if (
    !Number.isFinite(pageNumber) ||
    !Number.isInteger(pageNumber) ||
    pageNumber < 1
  ) {
    return NextResponse.json<APIError>(
      { error: 'Invalid page parameter' },
      { status: 400 }
    );
  }

  try {
    const data = await searchMedia(q, pageNumber);
    return NextResponse.json<APIResponse<PaginatedResponse<Media>>>(
      { data },
      {
        status: 200,
        headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60' },
      }
    );
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes('TMDB error 404')) {
        return NextResponse.json<APIError>(
          { error: 'No results found' },
          { status: 404 }
        );
      }
      if (err.message.includes('TMDB error 429')) {
        return NextResponse.json<APIError>(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json<APIError>(
      { error: 'Failed to fetch data from TMDB' },
      { status: 502 }
    );
  }
}
