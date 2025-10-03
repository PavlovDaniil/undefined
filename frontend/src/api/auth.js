// Простая авторизация через JWT токены в cookies
import { httpJson } from './http'

// Утилиты для работы с cookie
function setCookie(name, value, days = 7) {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `; expires=${date.toUTCString()}`
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value || '')}${expires}; path=/; SameSite=Lax`
}

function eraseCookie(name) {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`
}

function getCookie(name) {
  const nameEQ = encodeURIComponent(name) + '='
  const parts = document.cookie.split(';')
  for (let i = 0; i < parts.length; i++) {
    let c = parts[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) {
      try { return decodeURIComponent(c.substring(nameEQ.length, c.length)) } catch { return c.substring(nameEQ.length, c.length) }
    }
  }
  return null
}

// Логин пользователя
export async function loginRequest(login, password) {
  try {
    const data = await httpJson('/auth/login', {
      method: 'POST',
      body: { login, password },
    })
    // Токен автоматически сохраняется в cookie сервером
    return data
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

// Проверка аутентификации по наличию JWT токена в cookie
export function isAuthenticated() {
  const token = getCookie('access_token')
  return !!token
}

// Проверка статуса аутентификации
export async function checkAuthStatus() {
  if (!isAuthenticated()) {
    return { isAuthenticated: false, user: null }
  }
  
  try {
    // Проверяем валидность токена через API
    const user = await httpJson('/user/auth/me', { method: 'GET' })
    return { isAuthenticated: true, user }
  } catch (error) {
    console.log('Auth check failed:', error.message)
    // Очищаем невалидный токен
    logout()
    return { isAuthenticated: false, user: null }
  }
}

// Выход из системы
export function logout() {
  eraseCookie('access_token')
}


