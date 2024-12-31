import { NextRequest, NextResponse } from 'next/server';
import { getCalendarData } from '@/lib/calendar';

export async function GET(req: NextRequest, { params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const data = getCalendarData(year);
  return NextResponse.json(data);
}
