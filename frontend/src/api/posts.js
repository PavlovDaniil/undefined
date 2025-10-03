// CRUD для постов через backend API
// Важно: backend должен проксироваться по префиксу /api (vite proxy или nginx)

import { httpJson } from './http'

/** Список постов с фильтрами и пагинацией */
export function getPosts(params = {}) {
  const qs = new URLSearchParams(params).toString()
  return httpJson(`/posts${qs ? `?${qs}` : ''}`, { method: 'GET' })
}

/** Получение одного поста */
export function getPost(id) {
  return httpJson(`/posts/${id}`, { method: 'GET' })
}

/** Создание поста */
export function createPost(payload) {
  // payload: { title, content, status: 'draft'|'published' }
  return httpJson('/posts', { method: 'POST', body: payload })
}

/** Обновление поста */
export function updatePost(id, payload) {
  return httpJson(`/posts/${id}`, { method: 'PUT', body: payload })
}

/** Удаление поста */
export function deletePost(id) {
  return httpJson(`/posts/${id}`, { method: 'DELETE' })
}


