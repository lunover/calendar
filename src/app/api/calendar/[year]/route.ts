import { type NextRequest, NextResponse } from 'next/server';
import { getFullYearData } from '@/lib/nepali-date';

export async function GET(req: NextRequest, { params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const data = getFullYearData(Number.parseInt(year, 10));
  return NextResponse.json(data);
}
