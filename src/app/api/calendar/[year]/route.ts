import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { CalendarData } from '@/types/calendar';

export async function GET(req: NextRequest, { params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const filePath = path.join(process.cwd(), "data", "years", `${year}.json`);

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data: CalendarData = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({error: error}, { status: 404 });
  }
}
