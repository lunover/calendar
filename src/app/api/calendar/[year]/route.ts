import { NextRequest, NextResponse } from 'next/server';
import { getFullYearData } from '@/lib/nepali-date';

export async function GET(req: NextRequest, { params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const data = getFullYearData(parseInt(year));
  return NextResponse.json(data);
}
