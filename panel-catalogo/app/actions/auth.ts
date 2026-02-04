'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(_prevState: unknown, formData: FormData) {
  const username = formData.get('userName')
  const password = formData.get('password')

  if (username === 'admin' && password === '123') {
    const cookieStore = await cookies();
    cookieStore.set('session', 'admin-session', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })
    redirect('/admin/products')
  }

  return { message: 'Credenciales inválidas' }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session')
  redirect('/login')
}
