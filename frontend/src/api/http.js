// Базовый HTTP-клиент поверх fetch для обращения к backend API
// Использует cookies для авторизации (JWT токены автоматически отправляются браузером)

/** Базовая функция запроса с JSON */
export async function httpJson(path, { method = 'GET', headers = {}, body } = {}) {
  const res = await fetch(`/api${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include', // Важно: включаем cookies в запросы
  })

  // 204 No Content
  if (res.status === 204) return null

  let data
  const text = await res.text()
  try { data = text ? JSON.parse(text) : null } catch { data = text }

  if (!res.ok) {
    const message = (data && (data.error || data.message)) || `HTTP ${res.status}`
    const error = new Error(message)
    error.status = res.status
    error.payload = data
    throw error
  }

  return data
}

/** Пример использования:
 *  const list = await httpJson('/posts', { method: 'GET' })
 *  const created = await httpJson('/posts', { method: 'POST', body: { title, content } })
 */


