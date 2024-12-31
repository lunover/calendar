import { NextRequest, NextResponse } from 'next/server';
import { getNepaliDate } from '@/lib/calendar';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string, year: string }> }) {
  const { slug, year } = await params;
  const convert = slug;
  let dateString = year;

  if (!convert || !Array.isArray(slug) || !['ad-bs', 'bs-ad'].includes(convert) || !dateString || typeof dateString !== 'string') {
    return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
  }

  if (dateString === 'today') {
    dateString = new Date().toISOString().split('T')[0];
  }

  const nepaliDate = getNepaliDate(dateString, convert);

  return NextResponse.json(nepaliDate);
}
