import { convertDate } from '@/lib/nepali-date';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  let dateString = year;

  if (dateString === 'today') {
    dateString = new Date().toISOString().split('T')[0];
  }

  return NextResponse.json(convertDate(dateString), { status: 200 });
}
