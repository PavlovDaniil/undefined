import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '../api/posts'
import { logout } from '../api/auth'

const readPosts = () => {
  try {
    const raw = localStorage.getItem('posts')
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch { return [] }
}

const savePosts = (list) => {
  localStorage.setItem('posts', JSON.stringify(list))
}

const EditorPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getPosts({ page: 1, pageSize: 50 })
      .then(({ items }) => { if (mounted) setPosts(items || []) })
      .catch((err) => { if (mounted) setError(err?.message || 'Не удалось загрузить посты') })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#f6f9f6' }}>
      <div style={{ background: '#62A744', borderRadius: 0 }}>
        <div className="container" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src={new URL('../assets/icons/Icon-LogoCodd.svg', import.meta.url).href} alt="ЦОДД" style={{ width: 40, height: 40 }} />
          <h1 className="h4 m-0 text-white">Редактор новостей</h1>
          <div className="ms-auto d-flex align-items-center" style={{ gap: 8 }}>
            <Link to="/" className="btn btn-outline-light btn-sm">На сайт</Link>
            <button className="btn btn-outline-light btn-sm" onClick={() => { logout(); window.location.assign('/') }}>Выйти</button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '24px 16px', maxWidth: 1080 }}>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="h5 m-0">Посты</h2>
          <Link to="/editor/new" className="btn btn-success">Написать пост</Link>
        </div>

        {loading ? (
          <div className="alert alert-secondary">Загрузка…</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : posts.length === 0 ? (
          <div className="alert alert-info">Постов пока нет. Нажмите «Написать пост», чтобы создать первый.</div>
        ) : (
          <div className="list-group">
            {posts.map((p) => (
              <Link key={p.id} to={`/editor/${p.id}`} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-semibold">{p.title || 'Без заголовка'}</div>
                  <div className="text-muted small">{new Date(p.publishedAt || p.updatedAt || p.createdAt || Date.now()).toLocaleString('ru-RU')} · {p.status || 'черновик'}</div>
                </div>
                <span className="badge text-bg-light">Редактировать</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default EditorPage


