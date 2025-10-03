import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPost, createPost, updatePost, deletePost } from '../api/posts'

const readPosts = () => {
  try { const raw = localStorage.getItem('posts'); const parsed = raw ? JSON.parse(raw) : []; return Array.isArray(parsed) ? parsed : [] } catch { return [] }
}
const savePosts = (list) => { localStorage.setItem('posts', JSON.stringify(list)) }

const EditorPostForm = () => {
  const navigate = useNavigate()
  const params = useParams()
  const isNew = params.id === 'new' || !params.id
  const [current, setCurrent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState(current?.title || '')
  const [content, setContent] = useState(current?.content || '')
  const [status, setStatus] = useState(current?.status || 'черновик')

  useEffect(() => {
    if (!isNew && params.id) {
      let mounted = true
      setLoading(true)
      getPost(params.id)
        .then((p) => { if (mounted) { setCurrent(p); setTitle(p.title || ''); setContent(p.content || ''); setStatus(p.status || 'черновик') } })
        .catch((err) => { if (mounted) setError(err?.message || 'Не удалось загрузить пост') })
        .finally(() => { if (mounted) setLoading(false) })
      return () => { mounted = false }
    }
  }, [isNew, params.id])

  // Авторизация проверяется на уровне роутера (RequireEditor в App.jsx)

  const upsertPost = async () => {
    setError('')
    try {
      if (isNew) {
        const created = await createPost({ title, content, status })
        navigate(`/editor/${created.id}`)
      } else {
        await updatePost(current.id, { title, content, status })
      }
    } catch (err) {
      setError(err?.message || 'Не удалось сохранить пост')
    }
  }

  const removePost = async () => {
    if (!current) return
    if (!confirm('Удалить пост?')) return
    try {
      await deletePost(current.id)
      navigate('/editor')
    } catch (err) {
      setError(err?.message || 'Не удалось удалить пост')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f6f9f6' }}>
      <div style={{ background: '#62A744' }}>
        <div className="container" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <h1 className="h5 m-0 text-white">{isNew ? 'Новый пост' : 'Редактирование поста'}</h1>
          <div className="ms-auto d-flex align-items-center" style={{ gap: 8 }}>
            <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/editor')}>К списку</button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '24px 16px', maxWidth: 900 }}>
        {loading && (<div className="alert alert-secondary">Загрузка…</div>)}
        {error && (<div className="alert alert-danger">{error}</div>)}
        <div className="mb-3">
          <label className="form-label">Заголовок</label>
          <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Введите заголовок" />
        </div>
        <div className="mb-3">
          <label className="form-label">Содержание</label>
          <textarea className="form-control" rows={12} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Текст поста" />
        </div>
        <div className="mb-4 d-flex align-items-center" style={{ gap: 12 }}>
          <label className="form-label m-0">Статус</label>
          <select className="form-select" style={{ maxWidth: 220 }} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="черновик">черновик</option>
            <option value="опубликован">опубликован</option>
          </select>
        </div>
        <div className="d-flex" style={{ gap: 12 }}>
          <button className="btn btn-success" onClick={upsertPost}>{isNew ? 'Создать' : 'Сохранить'}</button>
          {!isNew && (
            <button className="btn btn-outline-danger" onClick={removePost}>Удалить</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditorPostForm


