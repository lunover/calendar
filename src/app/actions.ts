'use server'

import { cookies } from 'next/headers'

export async function saveCookie(name: string, value: string) {
  const cookieStore = await cookies()

  cookieStore.set(name, value);
}
