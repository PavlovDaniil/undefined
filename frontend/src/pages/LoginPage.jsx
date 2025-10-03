import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginRequest, checkAuthStatus } from '../api/auth'

const LoginPage = () => {
  const navigate = useNavigate()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
  }, [login, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Вызов реального backend API: /auth/login
      await loginRequest(login.trim(), password)
      navigate('/editor', { replace: true })
    } catch (err) {
      setError(err?.message || 'Неверный логин или пароль')
    }
  }

  useEffect(() => {
    // Проверяем статус аутентификации при загрузке страницы
    const checkAuth = async () => {
      const { isAuthenticated } = await checkAuthStatus()
      if (isAuthenticated) {
        navigate('/editor', { replace: true })
      }
    }
    checkAuth()
  }, [navigate])

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #62a744, #4a8a3a)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 440, background: '#fff', borderRadius: 16, boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}>
        <div style={{ padding: '28px 28px 8px 28px' }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#213547' }}>Вход для редактора</h1>
          <p style={{ marginTop: 8, color: '#6b7280' }}>Войдите под своей учётной записью редактора</p>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: 28, paddingTop: 8 }}>
          <div className="mb-3">
            <label className="form-label">Логин</label>
            <input value={login} onChange={(e) => setLogin(e.target.value)} type="text" className="form-control" placeholder="editor" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Пароль</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="••••••••" required />
          </div>
          {error && (
            <div className="alert alert-danger" role="alert">{error}</div>
          )}
          <div className="d-grid">
            <button type="submit" className="btn btn-success">Войти</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage


