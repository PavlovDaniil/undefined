import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import './App.css'
// import carImage from './assets/img/car.png' // File doesn't exist
// import './style/homePage.css' // File doesn't exist
import Footer from './components/Layout/Footer'
import { ArrowRight, Phone } from 'lucide-react'
import bgMain from './assets/img/main-background-codd.png'

import NewsPage from './pages/NewsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import EditorPage from './pages/EditorPage.jsx'
import EditorPostForm from './pages/EditorPostForm.jsx'

// import HomePage from './pages/HomePage'


function App() {
  const [theme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') return saved
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])


  // Локальный список регистраций и уведомление об успехе
  const [, setRegisteredUsers] = useState([])
  const [showRegisterSuccess, setShowRegisterSuccess] = useState(false)
  const [lastRegisteredName, setLastRegisteredName] = useState('')

  // Боковое меню (бургер)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Иконки для меню
  const iconHome = new URL('./assets/icons/nav-menu-icon-home.svg', import.meta.url).href
  const iconVk = new URL('./assets/icons/Icon-Vkontakte-white.svg', import.meta.url).href
  const iconTg = new URL('./assets/icons/icon-Telegram-white.svg', import.meta.url).href

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')?.toString().trim()
    const email = formData.get('email')?.toString().trim()
    const password = formData.get('password')?.toString()
    const confirm = formData.get('confirm')?.toString()
    if (!name || !email || !password || !confirm) return
    if (password !== confirm) {
      alert('Пароли не совпадают')
      return
    }
    const normalizedEmail = email.toLowerCase()
    // Проверка уникальности email
    try {
      const dupRes = await fetch(`/api/users?email=${encodeURIComponent(normalizedEmail)}`)
      if (dupRes.ok) {
        const existing = await dupRes.json()
        if (Array.isArray(existing) && existing.length > 0) {
          alert('Пользователь с таким email уже существует')
          return
        }
      }
    } catch { /* empty */ }
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: normalizedEmail, password })
      })
      if (!res.ok) {
        let serverMsg = ''
        try { serverMsg = await res.text() } catch { /* empty */ }
        throw new Error(`Ошибка ${res.status}${serverMsg ? `: ${serverMsg}` : ''}`)
      }
      const saved = await res.json()
      setRegisteredUsers((prev) => [
        ...prev.filter((u) => (u?.email || '').toLowerCase() !== normalizedEmail),
        saved,
      ])
      setLastRegisteredName(saved?.name || name)
      setShowRegisterSuccess(true)
      setTimeout(() => setShowRegisterSuccess(false), 3000)
    } catch (err) {
      alert('Не удалось зарегистрировать: ' + (err?.message || 'неизвестная ошибка'))
      return
    }
    const modalEl = document.getElementById('registerModal')
    if (modalEl) {
      const modal = window.bootstrap?.Modal.getOrCreateInstance(modalEl)
      modal?.hide()
    }
    e.currentTarget.reset()
  }

  const HomePage = () => {
    const [servicesScale, setServicesScale] = useState(1)

    useEffect(() => {
      const updateScale = () => {
        const scale = Math.min(Math.max(window.innerWidth / 1920, 0.32), 1.5)
        setServicesScale(scale)
      }
      updateScale()
      window.addEventListener('resize', updateScale)
      return () => window.removeEventListener('resize', updateScale)
    }, [])

    return (
    <>
{/* Hero background + title */}
<section
  style={{
    backgroundImage: `url(${bgMain})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    paddingTop: 'clamp(16px, 3vh, 56px)'
  }}
>
  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.3)' }} />
  {/* Header inside background to avoid white gap */}
  <header style={{ position: 'relative', zIndex: 2 }}>
    <div className="container-narrow">
      <div
        className="d-flex align-items-center"
        style={{
          background: '#62A744',
          borderRadius: 25,
          padding: '8px 16px',
          gap: 16,
          marginTop: 0,
          maxWidth: 1546,
          minHeight: 'clamp(56px, 8vh, 97px)',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <a href="/" className="d-flex align-items-center gap-2 text-decoration-none me-2">
          <img src={new URL('./assets/icons/Icon-LogoCodd.svg', import.meta.url).href} alt="ЦОДД" style={{ width: 'clamp(28px, 3.2vw, 48px)', height: 'clamp(28px, 3.2vw, 48px)' }} />
        </a>
        <div className="d-none d-lg-block" style={{ flexGrow: 1, maxWidth: 'clamp(60px, 10vw, 200px)' }} />
        <nav className="d-none d-lg-flex justify-content-center" style={{ gap: 'clamp(12px, 2.6vw, 40px)' }}>
          {[{name:'Главное',href:'/'},{name:'Статистика',href:'/stats'},{name:'Аналитика',href:'/analytics'},{name:'Проекты',href:'/projects'}].map((item) => (
            <a key={item.name} href={item.href} className="px-2 py-1 rounded-3 fw-semibold text-decoration-none" style={{ color: '#fff', fontSize: 'clamp(14px, 1.1vw, 20px)' }}>
              {item.name}
            </a>
          ))}
        </nav>
        <div className="d-none d-lg-block" style={{ flexGrow: 1 }} />
        <div className="d-none d-lg-flex align-items-center ms-auto">
          <div className="d-flex align-items-center rounded-pill px-3 py-1" style={{ background: '#F9FFF6' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: '#6a6a6a', flex: '0 0 auto' }}>
              <path d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input type="text" placeholder="Поиск" className="form-control form-control-sm border-0 bg-transparent ms-2" style={{ width: 'clamp(140px, 16vw, 300px)', color: '#2b2b2b', fontSize: 'clamp(13px, 1vw, 16px)' }} />
          </div>
          <button type="button" aria-label="Меню" className="ms-3 p-2 border-0" style={{ background: 'transparent', color: '#fff' }} onClick={() => setIsMenuOpen(true)}>
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden="true">
              <path d="M2 2H26M2 10H26M2 18H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        {/* Кнопка бургера для мобильных устройств */}
        <div className="d-flex d-lg-none ms-auto">
          <button type="button" aria-label="Меню" className="ms-2 p-2 border-0" style={{ background: 'transparent', color: '#fff' }} onClick={() => setIsMenuOpen(true)}>
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden="true">
              <path d="M2 2H26M2 10H26M2 18H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
  <div className="container-narrow" style={{ position: 'relative', zIndex: 1, paddingTop: '180px', paddingBottom: '120px' }}>
    <div style={{ maxWidth: 1546, margin: '0 auto' }}>
      <h2 style={{ color: '#fff', fontSize: '56px', lineHeight: 1.1, fontWeight: 600, maxWidth: 800, margin: 0, fontFamily: 'Moscow Sans, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' }}>
        Центр организации дорожного движения
      </h2>
    </div>
  </div>
</section>

{/* Главная секция */}
<section className="section">
  <div className="container-narrow">
    <div style={{width: 1920, height: 926, position: 'relative', background: '#F5F5F6', overflow: 'hidden', borderRadius: 31, margin: '0 auto'}}>
      {/* Изображение автомобиля с прозрачным фоном WebP */}
      <div 
        className="transparent-image-container"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '50%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img 
          src={new URL('./assets/img/section-Main/Rectangle-83.webp', import.meta.url).href}
          alt="ЦОДД автомобиль"
          className="webp-transparent transparent-image"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto'
          }}
        />
      </div>
          
      <div data-svg-wrapper style={{left: 1113, top: 231, position: 'absolute'}}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11Z" fill="#62A744"/>
        </svg>
      </div>
      <div data-svg-wrapper style={{left: 1113, top: 433, position: 'absolute'}}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11Z" fill="#62A744"/>
        </svg>
      </div>
      <div data-svg-wrapper style={{left: 1113, top: 644, position: 'absolute'}}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11Z" fill="#62A744"/>
        </svg>
      </div>
      <div style={{left: 1154, top: 229.83, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Безопасность и технологии</div>
      <div style={{left: 906, top: 80, position: 'absolute', color: 'black', fontSize: 48, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>Главное</div>
      <div style={{width: 626, left: 1154, top: 269, position: 'absolute', color: '#656565', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>ЦОДД внедряет современные технологии, включая системы фото- и видеофиксации, а также развивает интеллектуальные транспортные системы. Это напрямую повышает безопасность на дорогах, предотвращая нарушения и аварии. </div>
      <div style={{width: 607, left: 1155, top: 479, position: 'absolute', color: '#656565', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Организация отвечает за бесперебойное движение транспорта в Смоленске и области. Обслуживание светофоров и дорожной инфаструктуры помогает избежать заторов и обеспечивает комфорт для водителей и пешеходов.</div>
      <div style={{width: 622, left: 1153, top: 687, position: 'absolute', color: '#656565', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Деятельность ЦОДД направлена на системное развитие дорожной сети. Это не просто точечные улучшения, а комплексный подход к повышению безопасности, эффективности и комфорта, что делает организацию надежным партнером для города.</div>
      <div style={{left: 1152, top: 432, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Поддержание движения</div>
      <div style={{left: 1154, top: 643, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Комплексное развитие</div>
      {/* Контейнер кнопки - все элементы кнопки в одном div */}
      <div style={{left: 400, top: 440, position: 'absolute'}}>
        {/* Фон кнопки */}
        <div data-svg-wrapper>
          <svg width="456" height="84" viewBox="0 0 456 84" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 42C0 18.804 18.804 0 42 0H414C437.196 0 456 18.804 456 42C456 65.196 437.196 84 414 84H42C18.804 84 0 65.196 0 42Z" fill="#F5F5F6"/>
          </svg>
        </div>
        {/* Обводка кнопки */}
        <div data-svg-wrapper style={{position: 'absolute', left: 0, top: 0}}>
          <svg width="456" height="84" viewBox="0 0 456 84" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M414 82V84H42V82H414ZM454 42C454 19.9086 436.091 2 414 2H42C19.9086 2 2 19.9086 2 42C2 64.0914 19.9086 82 42 82V84C18.804 84 0 65.196 0 42C0 18.804 18.804 0 42 0H414C437.196 0 456 18.804 456 42C456 65.196 437.196 84 414 84V82C436.091 82 454 64.0914 454 42Z" fill="black"/>
          </svg>
        </div>
        {/* Текст кнопки */}
        <div style={{left: 126, top: 29.92, position: 'absolute', color: 'black', fontSize: 20.02, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Узнать больше о нас</div>
      </div>
      <div style={{left: 350, top: 160, position: 'absolute', color: 'black', fontSize: 59.38, fontFamily: 'Inter', fontWeight: '900', wordWrap: 'break-word'}}>ПОЧЕМУ ВЫ<br/>МОЖЕТЕ<br/>ДОВЕРЯТЬ ЦОДД</div>
    </div>
  </div>
</section>

{/* Боковое меню (оверлей) — выезд справа налево */}
<div aria-modal={isMenuOpen ? 'true' : undefined} role="dialog"
  style={{ position: 'fixed', inset: 0, zIndex: 1050, pointerEvents: isMenuOpen ? 'auto' : 'none' }}>
  {/* Затемнение фона с плавной сменой прозрачности */}
  <div onClick={() => setIsMenuOpen(false)}
    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)',
             opacity: isMenuOpen ? 1 : 0, transition: 'opacity 260ms ease' }} />
  {/* Правая панель меню с анимацией transform */}
  <div style={{ position: 'absolute', right: 0, top: 0, width: 608, maxWidth: '92vw', height: '100vh',
                background: '#62A744', borderTopLeftRadius: 50, boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 280ms ease' }}>
    {/* Кнопка закрытия */}
    <button aria-label="Закрыть меню" onClick={() => setIsMenuOpen(false)}
      style={{ position: 'absolute', right: 70, top: 45, background: 'transparent', border: 0, padding: 8, cursor: 'pointer' }}>
      <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28 3L3 28M3 3L28 28" stroke="#E8EBEC" strokeWidth="5" strokeLinecap="round"/>
      </svg>
    </button>
    {/* Пункты меню */}
    <nav style={{ position: 'absolute', left: 48, top: 64, right: 48, bottom: 140, display: 'flex', flexDirection: 'column', gap: 40, overflowY: 'auto', WebkitOverflowScrolling: 'touch', paddingRight: 8 }}>
      {[
        { label: 'Главная', href: '/' , muted: true},
        { label: 'О ЦОДД', href: '/about' },
        { label: 'Награды', href: '/awards' },
        { label: 'Команда', href: '/team' },
        { label: 'Новости', href: '/news' },
        { label: 'Аналитика', href: '/analytics' },
        { label: 'Документы', href: '/docs' },
        { label: 'Дорожные знаки', href: '/signs' },
        { label: 'Вакансии', href: '/jobs' },
        { label: 'Контакты', href: '/contacts' },
        { label: 'Услуги', href: '/services' },
      ].map((item) => (
        <a key={item.label} href={item.href}
           onClick={() => setIsMenuOpen(false)}
           style={{
             color: item.muted ? 'rgba(255,255,255,0.5)' : '#ffffff',
             fontSize: 24,
             fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
             fontWeight: 600,
             textDecoration: 'none',
             marginTop: item.label === 'Главная' ? 0 : undefined,
             display: 'flex',
             alignItems: 'center',
             gap: 12
           }}
        >
          {/* Фиксированная зона под иконку для выравнивания всех пунктов в один столбец */}
          <span style={{ display: 'inline-flex', width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
            {item.label === 'Главная' ? (
              <img src={iconHome} alt="" aria-hidden="true" width={22} height={22} />
            ) : null}
          </span>
          {item.label}
        </a>
      ))}
    </nav>
    {/* Соцкнопки внизу */}
    <div style={{ position: 'absolute', left: 48, bottom: 48, display: 'flex', gap: 24 }}>
      <a href="https://vk.com" target="_blank" rel="noreferrer noopener" aria-label="Мы во ВКонтакте" style={{
        width: 72, height: 72, background: '#fff', borderRadius: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <img src={iconVk} alt="" aria-hidden="true" width={62} height={62} />
      </a>
      <a href="https://t.me" target="_blank" rel="noreferrer noopener" aria-label="Мы в Telegram" style={{
        width: 72, height: 72, background: '#fff', borderRadius: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <img src={iconTg} alt="" aria-hidden="true" width={62} height={62} />
      </a>
    </div>
  </div>
</div>


{/* Актуально сейчас */}
<div className="section-wrapper section--actual-wrap" style={{height: 830 * servicesScale, position: 'relative'}}>
<section className="section-canvas section--actual" style={{width: 1920, height: 830, position: 'absolute', left: '50%', background: '#F5F5F6', overflow: 'hidden', transform: `translateX(-50%) scale(${servicesScale})`, transformOrigin: 'top center'}}>
  <div style={{width: 500, height: 250, left: 156, top: 124, position: 'absolute', background: '#62A744'}} />
  <div style={{width: 250, height: 250, left: 0, top: 580, position: 'absolute', background: '#62A744'}} />
  <div style={{width: 250, height: 830, left: 1265, top: 0, position: 'absolute', background: '#62A744'}} />
  <div style={{width: 565, height: 70, left: 193, top: 89, position: 'absolute', color: 'black', fontSize: 48, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word', lineHeight: 1.1}}>Актуально сейчас</div>
  <div style={{width: 298, height: 449, left: 193, top: 223, position: 'absolute', background: '#F5F5F6', borderRadius: 30, border: '3px #62A744 solid'}} />
  <div style={{width: 298, height: 449, left: 505, top: 223, position: 'absolute', background: '#F5F5F6', borderRadius: 30, border: '3px #62A744 solid'}} />
  <div style={{width: 298, height: 449, left: 817, top: 223, position: 'absolute', background: '#F5F5F6', borderRadius: 30, border: '3px #62A744 solid'}} />
  <div style={{width: 298, height: 449, left: 1129, top: 223, position: 'absolute', background: 'white', borderRadius: 30, border: '3px #62A744 solid'}} />
  <div style={{width: 298, height: 98, left: 1441, top: 574, position: 'absolute', background: '#62A744', borderRadius: 54, border: '3px white solid'}} />
  <div style={{width: 237, height: 81, left: 212, top: 242, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word', lineHeight: 1.2}}>Изменение схемы движения на улице Николаева</div>
  <div style={{width: 266, height: 87, left: 524, top: 242, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word', lineHeight: 1.2}}>Установка новых камер фиксации нарушений</div>
  <div style={{width: 239, height: 29, left: 846, top: 251, position: 'absolute', color: 'black', fontSize: 26, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word', lineHeight: 1.1}}>Смена директора СОГБУ "ЦОДД"</div>
  <div style={{width: 196, height: 18, left: 836, top: 336, position: 'absolute', opacity: 0.50, color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>23 сентября 2025, 16:00</div>
  <div style={{width: 196, height: 18, left: 524, top: 336, position: 'absolute', opacity: 0.50, color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>23 сентября 2025, 16:00</div>
  <div style={{width: 196, height: 18, left: 212, top: 336, position: 'absolute', opacity: 0.50, color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>23 сентября 2025, 16:00</div>
  <div style={{width: 149, height: 29, left: 1515, top: 609, position: 'absolute', color: 'white', fontSize: 24, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>Все новости</div>
  <div style={{width: 242, height: 90, left: 220, top: 582, position: 'absolute', color: '#363636', fontSize: 16, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word', lineHeight: 1.3}}>Ограничения движения и изменения в работе городского транспорта.</div>
  <div style={{width: 254, height: 65, left: 536, top: 575, position: 'absolute', color: '#363636', fontSize: 16, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word', lineHeight: 1.3}}>С начала года зафиксировано на 10% меньше ДТП, чем за аналогичный период 2024 года.</div>
  <div style={{width: 238, height: 65, left: 843, top: 582, position: 'absolute', color: '#363636', fontSize: 16, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word', lineHeight: 1.3}}>Директором СОГБУ «ЦОДД» стал Андрей Гильденков.</div>
  <div style={{width: 196, height: 18, left: 1148, top: 336, position: 'absolute', opacity: 0.50, color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>23 сентября 2025, 16:00</div>
  <div style={{width: 260, height: 29, left: 1148, top: 242, position: 'absolute', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word', lineHeight: 1.2}}>Автомобильные потоки на части смоленских дорог регулируются „умной системой"</div>
  <div style={{width: 238, height: 65, left: 1154, top: 582, position: 'absolute', color: '#363636', fontSize: 16, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word', lineHeight: 1.3}}>Светофор работает без чёткого временного интервала. </div>
  <img style={{width: 260, height: 191, left: 1149, top: 373, position: 'absolute', borderRadius: 18}} src={new URL('./assets/img/section-Actual-now/фото новосте 1.png', import.meta.url).href} alt="Новость 1" />
  <img style={{width: 260, height: 191, left: 212, top: 373, position: 'absolute', borderRadius: 18}} src={new URL('./assets/img/section-Actual-now/фото новости 4.png', import.meta.url).href} alt="Новость 4" />
  <img style={{width: 260, height: 191, left: 836, top: 373, position: 'absolute', borderRadius: 18}} src={new URL('./assets/img/section-Actual-now/фото новости 2.png', import.meta.url).href} alt="Новость 2" />
  <img style={{width: 260, height: 191, left: 524, top: 373, position: 'absolute', borderRadius: 18}} src={new URL('./assets/img/section-Actual-now/фото новости 3.png', import.meta.url).href} alt="Новость 3" />
</section>
</div>

{/* Мониторинг аварийности */}
<div className="section-wrapper section--monitor-wrap" style={{height: 1080 * servicesScale, position: 'relative'}}>
<section className="section-canvas section--monitor" style={{width: 1920, height: 1080, position: 'absolute', left: '50%', background: '#D9D9D9', overflow: 'hidden', transform: `translateX(-50%) scale(${servicesScale})`, transformOrigin: 'top center'}}>
  <div style={{width: '100%', height: 1084, left: 0, top: -4, position: 'absolute', background: '#222222'}} />
  <div style={{width: 1000, height: 1000, left: 0, top: 2, position: 'absolute', background: 'rgba(98, 167, 68, 0.28)', boxShadow: '291.79998779296875px 291.79998779296875px 291.79998779296875px ', borderRadius: 9999, filter: 'blur(145.90px)'}} />
  <div style={{width: 500, height: 500, left: 1571, top: 748, position: 'absolute', background: '#62A744', boxShadow: '291.79998779296875px 291.79998779296875px 291.79998779296875px ', borderRadius: 9999, filter: 'blur(145.90px)'}} />
  <div style={{width: 362.47, height: 364.57, left: 1517.60, top: -26, position: 'absolute', transform: 'rotate(41deg)', transformOrigin: 'top left', background: 'rgba(98, 167, 68, 0.75)', boxShadow: '291.79998779296875px 291.79998779296875px 291.79998779296875px ', borderRadius: 9999, filter: 'blur(145.90px)'}} />
  <div style={{width: 724, height: 70, left: 416, top: 174, position: 'absolute', color: 'white', fontSize: 48, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>Мониторинг аварийности</div>
  <div style={{width: 1260, height: 631, left: 360, top: 302, position: 'absolute', background: '#2E2E36', borderRadius: 25}} />
  <div style={{width: 333, height: 81, left: 400, top: 376, position: 'absolute', background: '#EBEBEB', borderRadius: 10}} />
  <div style={{width: 333, height: 81, left: 740, top: 376, position: 'absolute', background: '#42424A', borderRadius: 10}} />
  <div style={{width: 333, height: 81, left: 1080, top: 376, position: 'absolute', background: '#42424A', borderRadius: 10}} />
  <div style={{left: 400, top: 480, position: 'absolute'}}>
    <svg width="1113" height="9" viewBox="0 0 1113 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M556.5 7.5L549.719 1.24394L562.5 1.25025L556.5 7.5Z" fill="#939393"/>
      <path d="M0 1L549.719 1.24394M1113 1.5L562.5 1.25025M549.719 1.24394L556.5 7.5L562.5 1.25025M549.719 1.24394L562.5 1.25025" stroke="#939393" strokeWidth="2"/>
    </svg>
  </div>
  <div style={{width: 194, height: 32, left: 870, top: 856, position: 'absolute', background: '#62A744', borderRadius: 20.50}} />
  <div style={{width: 220, height: 41, left: 400, top: 535, position: 'absolute', background: '#2B5176', borderRadius: 20.50, border: '1px #0081FF solid'}} />
  <div style={{width: 220, height: 41, left: 640, top: 535, position: 'absolute', background: '#8C5628', borderRadius: 20.50, border: '1px #FF7500 solid'}} />
  <div style={{width: 220, height: 41, left: 880, top: 535, position: 'absolute', background: '#317A3B', borderRadius: 20.50, border: '1px #00FF23 solid'}} />
  <div style={{width: 220, height: 41, left: 1120, top: 535, position: 'absolute', background: '#846B2B', borderRadius: 20.50, border: '1px #FFB700 solid'}} />
  <div style={{width: 220, height: 41, left: 1360, top: 535, position: 'absolute', background: '#8C357C', borderRadius: 20.50, border: '1px #FF00D0 solid'}} />
  <div style={{width: 152, height: 201, left: 437, top: 597, position: 'absolute', background: '#33333B'}} />
  <div style={{width: 152, height: 201, left: 621, top: 597, position: 'absolute', background: '#33333B'}} />
  <div style={{width: 152, height: 201, left: 805, top: 597, position: 'absolute', background: '#33333B'}} />
  <div style={{width: 152, height: 201, left: 989, top: 597, position: 'absolute', background: '#33333B'}} />
  <div style={{width: 152, height: 201, left: 1173, top: 597, position: 'absolute', background: '#33333B'}} />
  <div style={{width: 152, height: 201, left: 1357, top: 597, position: 'absolute', background: '#33333B'}} />
  <div style={{left: 431, top: 648, position: 'absolute'}}>
    <svg width="1083" height="104" viewBox="0 0 1083 104" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 2H1083M0 52H1083M0 102H1083" stroke="white" strokeOpacity="0.01" strokeWidth="3"/>
    </svg>
  </div>
  <div style={{width: 983, height: 27, left: 421, top: 252, position: 'absolute', color: 'white', fontSize: 20, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>Это платформа сбора данных о ДТП с пострадавшими, которые произошли в Смоленске</div>
  <div style={{left: 426, top: 401, position: 'absolute', color: 'black', fontSize: 32, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>6 153</div>
  <div style={{left: 766, top: 401, position: 'absolute', color: 'white', fontSize: 32, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>6 586</div>
  <div style={{left: 1106, top: 401, position: 'absolute', color: 'white', fontSize: 32, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>179</div>
  <div style={{left: 426, top: 382, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>Кол-во ДТП с пострадавшими</div>
  <div style={{left: 766, top: 382, position: 'absolute', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>Ранено</div>
  <div style={{left: 1106, top: 382, position: 'absolute', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>Погибло</div>
  <div style={{width: 346, height: 12, left: 401, top: 496, position: 'absolute', color: 'white', fontSize: 18, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>Распределение ДТП по типам</div>
  <div style={{left: 400, top: 535, position: 'absolute', width: '220px', height: '41px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 12px'}}>
    <div style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word', display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '100%', overflow: 'hidden'}}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="5" r="5" fill="#D9D9D9"/>
      </svg>
      <span style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>Столкновение</span>
    </div>
  </div>
  <div style={{left: 640, top: 535, position: 'absolute', width: '220px', height: '41px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 12px'}}>
    <div style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word', display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '100%', overflow: 'hidden'}}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="5" r="5" fill="#D9D9D9"/>
      </svg>
      <span style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>Наезд на пешехода</span>
    </div>
  </div>
  <div style={{left: 880, top: 535, position: 'absolute', width: '220px', height: '41px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 12px'}}>
    <div style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word', display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '100%', overflow: 'hidden'}}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="5" r="5" fill="#D9D9D9"/>
      </svg>
      <span style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>Наезд на велосепидиста</span>
    </div>
  </div>
  <div style={{left: 1120, top: 535, position: 'absolute', width: '220px', height: '41px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 12px'}}>
    <div style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word', display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '100%', overflow: 'hidden'}}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="5" r="5" fill="#D9D9D9"/>
      </svg>
      <span style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>Наезд на препятствие</span>
    </div>
  </div>
  <div style={{left: 1360, top: 535, position: 'absolute', width: '220px', height: '41px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 12px'}}>
    <div style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word', display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '100%', overflow: 'hidden'}}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="5" r="5" fill="#D9D9D9"/>
      </svg>
      <span style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>Наезд на ТС</span>
    </div>
  </div>
  <div style={{left: 437, top: 807, position: 'absolute', width: '152px', display: 'flex', justifyContent: 'center', color: '#9F9F9F', fontSize: 13, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>июнь 2025</div>
  <div style={{left: 621, top: 807, position: 'absolute', width: '152px', display: 'flex', justifyContent: 'center', color: '#9F9F9F', fontSize: 13, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>июль 2025</div>
  <div style={{left: 805, top: 807, position: 'absolute', width: '152px', display: 'flex', justifyContent: 'center', color: '#9F9F9F', fontSize: 13, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>август 2025</div>
  <div style={{left: 989, top: 807, position: 'absolute', width: '152px', display: 'flex', justifyContent: 'center', color: '#9F9F9F', fontSize: 13, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>сентябрь 2025</div>
  <div style={{left: 1173, top: 807, position: 'absolute', width: '152px', display: 'flex', justifyContent: 'center', color: '#9F9F9F', fontSize: 13, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>октябрь 2025</div>
  <div style={{left: 1357, top: 807, position: 'absolute', width: '152px', display: 'flex', justifyContent: 'center', color: '#9F9F9F', fontSize: 13, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>ноябрь 2025</div>
  <div style={{left: 437.50, top: 648, position: 'absolute'}}>
    <svg width="1052" height="130" viewBox="0 0 1052 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 80L57.5 40L95 90L139.5 20L189 100L236.5 50L311.5 95L359 15L389.5 85L429 25L453 70L542.5 10L619 80L690 35L723 65L800 5L862 45L905.5 90L950 20L1000 60L1050 5" stroke="#00FF22" strokeWidth="4" fill="none"/>
    </svg>
  </div>
  <div style={{width: 194, height: 32, left: 870, top: 856, position: 'absolute', background: '#62A744', borderRadius: 20.50, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Смотреть ДТП на карте</div>
</section>
</div>

{/* Проекты (под Мониторингом) */}
<div className="section-wrapper section--projects-wrap" style={{height: 900 * servicesScale, position: 'relative'}}>
<section className="section-canvas section--projects" style={{width: 1920, height: 900, position: 'absolute', left: '50%', overflow: 'hidden', transform: `translateX(-50%) scale(${servicesScale})`, transformOrigin: 'top center'}}>
  <div style={{width: 1920, height: 900, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(180deg, #62A744 0%, #F5F5F6 100%)'}} />

  {/* Заголовок */}
  <div style={{width: 233, height: 52, left: 161, top: 102, position: 'absolute', color: 'white', fontSize: 48, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word', textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>Проекты</div>

  {/* Карточки-рамки */}
  <div data-svg-wrapper style={{left: 162, top: 233, position: 'absolute'}}>
    <svg width="760" height="271" viewBox="0 0 760 271" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 35C0 15.67 15.67 0 35 0H725C744.33 0 760 15.67 760 35V236C760 255.33 744.33 271 725 271H35C15.67 271 0 255.33 0 236V35Z" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper style={{left: 938, top: 233, position: 'absolute'}}>
    <svg width="760" height="271" viewBox="0 0 760 271" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 35C0 15.67 15.67 0 35 0H725C744.33 0 760 15.67 760 35V236C760 255.33 744.33 271 725 271H35C15.67 271 0 255.33 0 236V35Z" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper style={{left: 162, top: 529, position: 'absolute'}}>
    <svg width="760" height="271" viewBox="0 0 760 271" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 35C0 15.67 15.67 0 35 0H725C744.33 0 760 15.67 760 35V236C760 255.33 744.33 271 725 271H35C15.67 271 0 255.33 0 236V35Z" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper style={{left: 938, top: 529, position: 'absolute'}}>
    <svg width="760" height="271" viewBox="0 0 760 271" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 35C0 15.67 15.67 0 35 0H725C744.33 0 760 15.67 760 35V236C760 255.33 744.33 271 725 271H35C15.67 271 0 255.33 0 236V35Z" fill="#D9D9D9"/>
    </svg>
  </div>

  {/* Контент карточек: заголовки, тексты, кнопки */}
  {/* 1 */}
  <div style={{width: 477, left: 188, top: 259, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Интеллектуальная транспортная система</div>
  <div style={{width: 439, left: 188, top: 328, position: 'absolute', color: '#4C4C4C', fontSize: 18, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>С 2024 года ЦОДД реализует трёхлетний проект по созданию ИТС в Смоленске в рамках национального проекта «Безопасные качественные дороги».</div>
  <div data-svg-wrapper style={{left: 189, top: 442, position: 'absolute'}}>
    <svg width="462" height="45" viewBox="0 0 462 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 22.5C0 10.0736 10.0736 0 22.5 0H439.5C451.926 0 462 10.0736 462 22.5C462 34.9264 451.926 45 439.5 45H22.5C10.0736 45 0 34.9264 0 22.5Z" fill="#62A744"/>
    </svg>
  </div>
  <div style={{left: 420, top: 464.5, position: 'absolute', transform: 'translate(-50%, -50%)', color: 'white', fontSize: 20, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Подробнее</div>

  {/* 2 */}
  <div style={{width: 477, left: 983, top: 258, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Парковочное пространство</div>
  <div style={{width: 439, left: 983, top: 327, position: 'absolute', color: '#4C4C4C', fontSize: 18, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>ЦОДД разработал новую схему парковок для центра Смоленска, чтобы решить проблему с автомобилями, мешающими движению.</div>
  <div data-svg-wrapper style={{left: 965, top: 441, position: 'absolute'}}>
    <svg width="462" height="45" viewBox="0 0 462 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 22.5C0 10.0736 10.0736 0 22.5 0H439.5C451.926 0 462 10.0736 462 22.5C462 34.9264 451.926 45 439.5 45H22.5C10.0736 45 0 34.9264 0 22.5Z" fill="#62A744"/>
    </svg>
  </div>
  <div style={{left: 1196, top: 463.5, position: 'absolute', transform: 'translate(-50%, -50%)', color: 'white', fontSize: 20, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Подробнее</div>

  {/* 3 */}
  <div style={{width: 477, left: 188, top: 551, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Системами автоматического контроля и выявления нарушений ПДД</div>
  <div style={{width: 439, left: 188, top: 620, position: 'absolute', color: '#4C4C4C', fontSize: 18, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Она позволяет фиксировать достаточно широкий спектр нарушений, что положительно сказывается на снижении уровня аварийности.</div>
  <div data-svg-wrapper style={{left: 189, top: 734, position: 'absolute'}}>
    <svg width="462" height="45" viewBox="0 0 462 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 22.5C0 10.0736 10.0736 0 22.5 0H439.5C451.926 0 462 10.0736 462 22.5C462 34.9264 451.926 45 439.5 45H22.5C10.0736 45 0 34.9264 0 22.5Z" fill="#62A744"/>
    </svg>
  </div>
  <div style={{left: 420, top: 756.5, position: 'absolute', transform: 'translate(-50%, -50%)', color: 'white', fontSize: 20, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Подробнее</div>

  {/* 4 */}
  <div style={{width: 477, left: 983, top: 550, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Подсистема метеомониторинга</div>
  <div style={{width: 439, left: 983, top: 619, position: 'absolute', color: '#4C4C4C', fontSize: 18, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Будет позволять анализировать изменения погодных условий и принимать решения о движении коммунальной техники</div>
  <div data-svg-wrapper style={{left: 965, top: 733, position: 'absolute'}}>
    <svg width="462" height="45" viewBox="0 0 462 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 22.5C0 10.0736 10.0736 0 22.5 0H439.5C451.926 0 462 10.0736 462 22.5C462 34.9264 451.926 45 439.5 45H22.5C10.0736 45 0 34.9264 0 22.5Z" fill="#B1B621"/>
    </svg>
  </div>
  <div style={{left: 1196, top: 755.5, position: 'absolute', transform: 'translate(-50%, -50%)', color: 'white', fontSize: 20, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>В разработке</div>

  {/* Изображения карточек */}
  <img style={{width: 233, height: 233, left: 664, top: 252, position: 'absolute', borderRadius: 22, objectFit: 'cover'}} src={new URL('./assets/img/section-Projects/photo-1.png', import.meta.url).href} alt="Проект 1" />
  <img style={{width: 233, height: 233, left: 1440, top: 252, position: 'absolute', borderRadius: 22, objectFit: 'cover'}} src={new URL('./assets/img/section-Projects/photo-2.png', import.meta.url).href} alt="Проект 2" />
  <img style={{width: 233, height: 233, left: 664, top: 548, position: 'absolute', borderRadius: 22, objectFit: 'cover'}} src={new URL('./assets/img/section-Projects/photo-3.png', import.meta.url).href} alt="Проект 3" />
  <img style={{width: 233, height: 233, left: 1440, top: 548, position: 'absolute', borderRadius: 22, objectFit: 'cover'}} src={new URL('./assets/img/section-Projects/photo-4.png', import.meta.url).href} alt="Проект 4" />
</section>
</div>

{/* Секция Услуги */}
<div className="section-wrapper section--services-wrap" style={{height: 836 * servicesScale, position: 'relative'}}>
<section className="section-canvas section--services" style={{width: 1920, height: 836, position: 'absolute', left: '50%', background: '#F5F5F6', overflow: 'hidden', transform: `translateX(-50%) scale(${servicesScale})`, transformOrigin: 'top center'}}>
  {/* Декор: зелёное размытие (центр-право) */}
  <div data-svg-wrapper style={{left: 620, top: 245, position: 'absolute'}}>
    <svg width="780" height="731" viewBox="0 0 780 731" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_f_201_2830)">
        <path d="M640 390C640 528.071 528.071 640 390 640C251.929 640 140 528.071 140 390C140 251.929 251.929 140 390 140C528.071 140 640 251.929 640 390Z" fill="#62A744" fillOpacity="0.85"/>
      </g>
      <defs>
        <filter id="filter0_f_201_2830" x="0.199997" y="0.199997" width="779.6" height="779.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="69.9" result="effect1_foregroundBlur_201_2830"/>
        </filter>
      </defs>
    </svg>
  </div>
  {/* Декор: зелёное размытие слева */}
  <div data-svg-wrapper style={{left: -160, top: 144, position: 'absolute'}}>
    <svg width="480" height="780" viewBox="0 0 480 780" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_f_201_2831)">
        <path d="M340 390C340 528.071 228.071 640 90 640C-48.0712 640 -160 528.071 -160 390C-160 251.929 -48.0712 140 90 140C228.071 140 340 251.929 340 390Z" fill="#62A744" fillOpacity="0.85"/>
      </g>
      <defs>
        <filter id="filter0_f_201_2831" x="-299.8" y="0.199997" width="779.6" height="779.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="69.9" result="effect1_foregroundBlur_201_2831"/>
        </filter>
      </defs>
    </svg>
  </div>
  {/* Декор: зелёное размытие справа сверху */}
  <div data-svg-wrapper style={{left: 1389, top: 124, position: 'absolute'}}>
    <svg width="671" height="764" viewBox="0 0 671 764" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_f_201_2832)">
        <path d="M640 374C640 512.071 528.071 624 390 624C251.929 624 140 512.071 140 374C140 235.929 251.929 124 390 124C528.071 124 640 235.929 640 374Z" fill="#62A744" fillOpacity="0.85"/>
      </g>
      <defs>
        <filter id="filter0_f_201_2832" x="0.199997" y="-15.8" width="779.6" height="779.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="69.9" result="effect1_foregroundBlur_201_2832"/>
        </filter>
      </defs>
    </svg>
  </div>
  {/* Подложка карточки 4 (белая) */}
  <div data-svg-wrapper style={{left: 1364, top: 232, position: 'absolute'}}>
    <svg width="372" height="545" viewBox="0 0 372 545" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 30C0 13.4314 13.4315 0 30 0H342C358.569 0 372 13.4315 372 30V515C372 531.569 358.569 545 342 545H30C13.4315 545 0 531.569 0 515V30Z" fill="white"/>
    </svg>
  </div>
  {/* Контур карточки 4 (зелёная рамка поверх белой подложки) */}
  <div data-svg-wrapper style={{left: 1364, top: 232, position: 'absolute'}}>
    <svg width="372" height="545" viewBox="0 0 372 545" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M342 542V545H30V542H342ZM369 515V30C369 15.0883 356.912 3 342 3H30C15.0883 3 3 15.0883 3 30V515C3 529.912 15.0883 542 30 542V545L29.2256 544.99C13.0149 544.579 0 531.31 0 515V30C0 13.4315 13.4315 0 30 0H342C358.569 0 372 13.4315 372 30V515C372 531.569 358.569 545 342 545V542C356.912 542 369 529.912 369 515Z" fill="#62A744"/>
    </svg>
  </div>
  {/* Подложка карточки 3 (белая) */}
  <div data-svg-wrapper style={{left: 976, top: 232, position: 'absolute'}}>
    <svg width="372" height="545" viewBox="0 0 372 545" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 30C0 13.4314 13.4315 0 30 0H342C358.569 0 372 13.4315 372 30V515C372 531.569 358.569 545 342 545H30C13.4315 545 0 531.569 0 515V30Z" fill="white"/>
    </svg>
  </div>
  {/* Контур карточки 3 (зелёная рамка поверх белой подложки) */}
  <div data-svg-wrapper style={{left: 976, top: 232, position: 'absolute'}}>
    <svg width="372" height="545" viewBox="0 0 372 545" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M342 542V545H30V542H342ZM369 515V30C369 15.0883 356.912 3 342 3H30C15.0883 3 3 15.0883 3 30V515C3 529.912 15.0883 542 30 542V545L29.2256 544.99C13.0149 544.579 0 531.31 0 515V30C0 13.4315 13.4315 0 30 0H342C358.569 0 372 13.4315 372 30V515C372 531.569 358.569 545 342 545V542C356.912 542 369 529.912 369 515Z" fill="#62A744"/>
    </svg>
  </div>
  {/* Подложка карточки 2 (белая) */}
  <div data-svg-wrapper style={{left: 588, top: 232, position: 'absolute'}}>
    <svg width="372" height="545" viewBox="0 0 372 545" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 30C0 13.4314 13.4315 0 30 0H342C358.569 0 372 13.4315 372 30V515C372 531.569 358.569 545 342 545H30C13.4315 545 0 531.569 0 515V30Z" fill="white"/>
    </svg>
  </div>
  {/* Контур карточки 2 (зелёная рамка поверх белой подложки) */}
  <div data-svg-wrapper style={{left: 588, top: 232, position: 'absolute'}}>
    <svg width="372" height="545" viewBox="0 0 372 545" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M342 542V545H30V542H342ZM369 515V30C369 15.0883 356.912 3 342 3H30C15.0883 3 3 15.0883 3 30V515C3 529.912 15.0883 542 30 542V545L29.2256 544.99C13.0149 544.579 0 531.31 0 515V30C0 13.4315 13.4315 0 30 0H342C358.569 0 372 13.4315 372 30V515C372 531.569 358.569 545 342 545V542C356.912 542 369 529.912 369 515Z" fill="#62A744"/>
    </svg>
  </div>
  {/* Подложка карточки 1 (белая) */}
  <div data-svg-wrapper style={{left: 200, top: 232, position: 'absolute'}}>
    <svg width="372" height="545" viewBox="0 0 372 545" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 30C0 13.4314 13.4315 0 30 0H342C358.569 0 372 13.4315 372 30V515C372 531.569 358.569 545 342 545H30C13.4315 545 0 531.569 0 515В30Z" fill="white"/>
    </svg>
  </div>
  {/* Контур карточки 1 (зелёная рамка поверх белой подложки) */}
  <div data-svg-wrapper style={{left: 200, top: 232, position: 'absolute'}}>
    <svg width="372" height="545" viewBox="0 0 372 545" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M342 542V545H30V542H342ZM369 515V30C369 15.0883 356.912 3 342 3H30C15.0883 3 3 15.0883 3 30V515C3 529.912 15.0883 542 30 542V545L29.2256 544.99C13.0149 544.579 0 531.31 0 515V30C0 13.4315 13.4315 0 30 0H342C358.569 0 372 13.4315 372 30V515C372 531.569 358.569 545 342 545V542C356.912 542 369 529.912 369 515Z" fill="#62A744"/>
    </svg>
  </div>
  {/* Контент карточек: заголовки, описания, мелкие иконки */}
  <div style={{width: 1483, height: 426.86, left: 227, top: 265, position: 'absolute'}}>
    <div data-svg-wrapper style={{left: 1373.73, top: 125.74, position: 'absolute'}}>
      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.99856 14.2558C5.72015 14.2558 4.61219 13.9746 3.67469 13.4121C2.73719 12.8496 2.00992 12.0626 1.49287 11.0513C0.98151 10.0399 0.72583 8.85809 0.72583 7.50582C0.72583 6.15354 0.98151 4.96888 1.49287 3.95184C2.00992 2.93479 2.73719 2.14502 3.67469 1.58252C4.61219 1.02002 5.72015 0.73877 6.99856 0.73877C8.27697 0.73877 9.38493 1.02002 10.3224 1.58252C11.2599 2.14502 11.9844 2.93479 12.4957 3.95184C13.0128 4.96888 13.2713 6.15354 13.2713 7.50582C13.2713 8.85809 13.0128 10.0399 12.4957 11.0513C11.9844 12.0626 11.2599 12.8496 10.2834 13.4121C9.34586 13.9746 8.27697 14.2558 6.99856 14.2558ZM7.0156 11.7842C7.70878 11.7842 8.28833 11.5939 8.75423 11.2132C9.22014 10.8268 9.56674 10.3098 9.79401 9.66207C10.027 9.01434 10.1434 8.29275 10.1434 7.49729C10.1434 6.69616 10.027 5.97172 9.79401 5.324C9.56674 4.67059 9.22014 4.1507 8.75423 3.76434C8.28833 3.37797 7.70878 3.18479 7.0156 3.18479C6.30538 3.18479 5.71447 3.37797 5.24287 3.76434C4.77697 4.1507 4.42753 4.67059 4.19458 5.324C3.96731 5.97172 3.85367 6.69616 3.85367 7.49729C3.85367 8.29275 3.96731 9.01434 4.19458 9.66207C4.42753 10.3098 4.77697 10.8268 5.24287 11.2132C5.71447 11.5939 6.30538 11.7842 7.0156 11.7842Z" fill="black"/>
      </svg>
    </div>
    <div data-svg-wrapper style={{left: 1360.92, top: 125.91, position: 'absolute'}}>
      <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.916016 3.44043V0.90918H12.3706V3.44043H8.13477V14.0001H5.15181V3.44043H0.916016Z" fill="black"/>
      </svg>
    </div>
    <div data-svg-wrapper style={{left: 1350.93, top: 130.46, position: 'absolute'}}>
      <svg width="9" height="3" viewBox="0 0 9 3" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.78569 0.460449V3.00022H0.927734V0.460449H8.78569Z" fill="black"/>
      </svg>
    </div>
    <div data-svg-wrapper style={{left: 1335.69, top: 125.74, position: 'absolute'}}>
      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.9595 14.2558C5.68109 14.2558 4.57313 13.9746 3.63563 13.4121C2.69813 12.8496 1.97086 12.0626 1.45381 11.0513C0.942448 10.0399 0.686768 8.85809 0.686768 7.50582C0.686768 6.15354 0.942448 4.96888 1.45381 3.95184C1.97086 2.93479 2.69813 2.14502 3.63563 1.58252C4.57313 1.02002 5.68109 0.73877 6.9595 0.73877C8.2379 0.73877 9.34586 1.02002 10.2834 1.58252C11.2209 2.14502 11.9453 2.93479 12.4566 3.95184C12.9737 4.96888 13.2322 6.15354 13.2322 7.50582C13.2322 8.85809 12.9737 10.0399 12.4566 11.0513C11.9453 12.0626 11.2209 12.8496 10.2834 13.4121C9.34586 13.9746 8.2379 14.2558 6.9595 14.2558ZM6.97654 11.7842C7.66972 11.7842 8.24927 11.5939 8.71518 11.2132C9.18109 10.8268 9.52768 10.3098 9.75495 9.66207C9.98791 9.01434 10.1044 8.29275 10.1044 7.49729C10.1044 6.69616 9.98791 5.97172 9.75495 5.324C9.52768 4.67059 9.18109 4.1507 8.71518 3.76434C8.24927 3.37797 7.66972 3.18479 6.97654 3.18479C6.26631 3.18479 5.6754 3.37797 5.20381 3.76434C4.7379 4.1507 4.38847 4.67059 4.15552 5.324C3.92824 5.97172 3.81461 6.69616 3.81461 7.49729C3.81461 8.29275 3.92824 9.01434 4.15552 9.66207C4.38847 10.3098 4.7379 10.8268 5.20381 11.2132C5.6754 11.5939 6.26631 11.7842 6.97654 11.7842Z" fill="black"/>
      </svg>
    </div>
    <div data-svg-wrapper style={{left: 1322.88, top: 125.91, position: 'absolute'}}>
      <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.876953 3.44043V0.90918H12.3315V3.44043H8.0957V14.0001H5.11275V3.44043H0.876953Z" fill="black"/>
      </svg>
    </div>
    <div data-svg-wrapper style={{left: 1310.30, top: 125.89, position: 'absolute'}}>
      <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.2386 0.909136V14H8.27271V0.909136H11.2386ZM9.84941 6.82391V9.34664C9.51418 9.49436 9.1335 9.62789 8.70737 9.74721C8.28691 9.86084 7.84088 9.95175 7.36929 10.0199C6.90338 10.0881 6.43748 10.1222 5.97157 10.1222C4.22157 10.1222 2.83804 9.73016 1.821 8.94607C0.809635 8.15629 0.303955 6.92618 0.303955 5.25573V0.89209H3.25282V5.25573C3.25282 5.81823 3.35225 6.26993 3.55111 6.61084C3.74998 6.95175 4.05111 7.20175 4.45452 7.36084C4.85793 7.51425 5.36361 7.59095 5.97157 7.59095C6.65339 7.59095 7.30111 7.52277 7.91475 7.38641C8.52839 7.25005 9.17327 7.06255 9.84941 6.82391Z" fill="black"/>
      </svg>
    </div>
    <div data-svg-wrapper style={{left: 1289.56, top: 120.77, position: 'absolute'}}>
      <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.91972 19.2558C5.60722 19.2558 4.4737 18.9831 3.51915 18.4376C2.57029 17.8865 1.84018 17.1081 1.32881 16.1024C0.817448 15.091 0.561768 13.9007 0.561768 12.5314C0.561768 11.1848 0.817448 10.003 1.32881 8.98593C1.84586 7.9632 2.56745 7.16775 3.49358 6.59956C4.41972 6.0257 5.50779 5.73877 6.75779 5.73877C7.56461 5.73877 8.32597 5.86945 9.04188 6.13081C9.76347 6.3865 10.3998 6.78422 10.951 7.324C11.5078 7.86377 11.9453 8.55127 12.2635 9.3865C12.5817 10.216 12.7407 11.2047 12.7407 12.3524V13.2984H2.01063V11.2189H9.78336C9.77768 10.628 9.64983 10.1024 9.39983 9.64218C9.14983 9.17627 8.8004 8.80979 8.35154 8.54275C7.90836 8.2757 7.39131 8.14218 6.8004 8.14218C6.16972 8.14218 5.61575 8.29559 5.13847 8.60241C4.6612 8.90354 4.28904 9.30127 4.022 9.79559C3.76063 10.2842 3.62711 10.8212 3.62143 11.4064V13.2217C3.62143 13.9831 3.76063 14.6365 4.03904 15.182C4.31745 15.7217 4.70665 16.1365 5.20665 16.4263C5.70665 16.7104 6.29188 16.8524 6.96233 16.8524C7.4112 16.8524 7.81745 16.7899 8.18108 16.6649C8.54472 16.5342 8.86006 16.3439 9.12711 16.0939C9.39416 15.8439 9.59586 15.5342 9.73222 15.1649L12.6129 15.4888C12.4311 16.2501 12.0845 16.9149 11.5731 17.4831C11.0674 18.0456 10.4197 18.4831 9.62995 18.7956C8.84017 19.1024 7.93677 19.2558 6.91972 19.2558ZM4.12427 3.98309C3.6754 3.98309 3.2862 3.824 2.95665 3.50581C2.63279 3.18763 2.47086 2.81263 2.47086 2.38081C2.47086 1.92627 2.63279 1.54559 2.95665 1.23877C3.2862 0.92627 3.6754 0.77002 4.12427 0.77002C4.58449 0.77002 4.97086 0.92627 5.28336 1.23877C5.60154 1.54559 5.76063 1.92627 5.76063 2.38081C5.76063 2.81263 5.60154 3.18763 5.28336 3.50581C4.97086 3.824 4.58449 3.98309 4.12427 3.98309ZM9.2379 3.98309C8.78904 3.98309 8.39984 3.824 8.07029 3.50581C7.74643 3.18763 7.5845 2.81263 7.5845 2.38081C7.5845 1.92627 7.74643 1.54559 8.07029 1.23877C8.39984 0.92627 8.78904 0.77002 9.2379 0.77002C9.69813 0.77002 10.0845 0.92627 10.397 1.23877C10.7152 1.54559 10.8743 1.92627 10.8743 2.38081C10.8743 2.81263 10.7152 3.18763 10.397 3.50581C10.0845 3.824 9.69813 3.98309 9.2379 3.98309Z" fill="black"/>
      </svg>
    </div>
    <div data-svg-wrapper style={{left: 1268.16, top: 125.91, position: 'absolute'}}>
      <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.8253 11.4688L19.5696 17.7501H16.6633V14.0001H15.1207V11.4688H19.8253ZM0.16333 0.90918H3.13776V11.4603H7.25424V0.90918H10.2287V11.4603H14.3451V0.90918H17.3196V14.0001H0.16333V0.90918Z" fill="black"/>
      </svg>
    </div>
    <div data-svg-wrapper style={{left: 1253.72, top: 121.55, position: 'absolute'}}>
      <svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.72168 18V0.54541H12.074V3.19598H3.88361V7.93462H11.4859V10.5852H3.88361V15.3494H12.1421V18H0.72168Z" fill="black"/>
      </svg>
    </div>
    <div style={{left: 0, top: 300, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Аренда автовышки</div>
    <div style={{width: 313, left: 1, top: 351, position: 'absolute', color: '#626262', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>У нас вы можете арендовать автовышку, и получить бесценный опыт работы с ЦОДД родного города! Присоединяйтесь!</div>
    <div style={{width: 314, left: 393, top: 300, position: 'absolute', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Разработка проектно-сметной документации для строительств светофорных объектов</div>
    <div style={{width: 313, left: 394, top: 366, position: 'absolute', color: '#626262', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>У нас вы можете разработать документацию, и получить бесценный опыт работы с ЦОДД родного города! Присоединяйтесь!</div>
    <div style={{left: 781, top: 302, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Вызов эвакуатора</div>
    <div style={{width: 313, left: 782, top: 353, position: 'absolute', color: '#626262', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>У нас вы можете вызвать эвакуатор, и получить бесценный опыт работы с ЦОДД родного города! Присоединяйтесь!</div>
    <div style={{left: 1169, top: 302, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Больше услуг</div>
    <div style={{width: 313, left: 1170, top: 353, position: 'absolute', color: '#626262', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Посмотрите весь каталог услуг на нашей странице "Услуги". Обязательно найдется что-то по душе, скорее кликай на кнопку!</div>
  </div>
  {/* Изображение карточки 1 */}
  <img style={{width: 314, height: 236, left: 229, top: 265, position: 'absolute', borderRadius: 18, objectFit: 'cover'}} src={new URL('./assets/img/section-Service/img-1.png', import.meta.url).href} alt="Аренда автовышки" />
  {/* Изображение карточки 2 */}
  <img style={{width: 314, height: 236, left: 617, top: 265, position: 'absolute', borderRadius: 18, objectFit: 'cover'}} src={new URL('./assets/img/section-Service/img-2.png', import.meta.url).href} alt="Проектно-сметная документация" />
  {/* Изображение карточки 3 */}
  <img style={{width: 314, height: 236, left: 1005, top: 265, position: 'absolute', borderRadius: 18, objectFit: 'cover'}} src={new URL('./assets/img/section-Service/img-3.png', import.meta.url).href} alt="Вызов эвакуатора" />
  {/* Плейсхолдер карточки 4 (нет изображения) */}
  <div style={{width: 314, height: 236, left: 1393, top: 265, position: 'absolute', borderRadius: 18, background: '#D9D9D9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2B2B2B', fontSize: 24, fontFamily: 'Inter', fontWeight: 700}}>Ещё что-то</div>
  {/* Кнопка карточки 1 (зелёная таблетка со стрелкой) */}
  <div style={{position:'absolute', left: 481, top: 713}}>
    <svg width="62" height="35" viewBox="0 0 62 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 12C0 5.37258 5.37258 0 12 0H50C56.6274 0 62 5.37258 62 12V23C62 29.6274 56.6274 35 50 35H12C5.37258 35 0 29.6274 0 23V12Z" fill="#62A744"/>
      <path d="M30.2727 25.6308L28.517 23.8921L33.7756 18.6336H21V16.0938H33.7756L28.517 10.8438L30.2727 9.09668L38.5398 17.3637L30.2727 25.6308Z" fill="white"/>
    </svg>
    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute', left:21, top:9.1}}>
      <path d="M9.27273 16.6308L7.51705 14.8921L12.7756 9.63361H0V7.09384H12.7756L7.51705 1.84384L9.27273 0.0966797L17.5398 8.36373L9.27273 16.6308Z" fill="white"/>
    </svg>
  </div>
  {/* Кнопка карточки 2 */}
  <div style={{position:'absolute', left: 869, top: 713}}>
    <svg width="62" height="35" viewBox="0 0 62 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 12C0 5.37258 5.37258 0 12 0H50C56.6274 0 62 5.37258 62 12V23C62 29.6274 56.6274 35 50 35H12C5.37258 35 0 29.6274 0 23V12Z" fill="#62A744"/>
    </svg>
    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute', left:21, top:9.1}}>
      <path d="M9.27273 16.6308L7.51705 14.8921L12.7756 9.63361H0V7.09384H12.7756L7.51705 1.84384L9.27273 0.0966797L17.5398 8.36373L9.27273 16.6308Z" fill="white"/>
    </svg>
  </div>
  {/* Кнопка карточки 3 */}
  <div style={{position:'absolute', left: 1257, top: 713}}>
    <svg width="62" height="35" viewBox="0 0 62 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 12C0 5.37258 5.37258 0 12 0H50C56.6274 0 62 5.37258 62 12V23C62 29.6274 56.6274 35 50 35H12C5.37258 35 0 29.6274 0 23V12Z" fill="#62A744"/>
    </svg>
    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute', left:21, top:9.1}}>
      <path d="M9.27273 16.6308L7.51705 14.8921L12.7756 9.63361H0V7.09384H12.7756L7.51705 1.84384L9.27273 0.0966797L17.5398 8.36373L9.27273 16.6308Z" fill="white"/>
    </svg>
  </div>
  {/* Кнопка карточки 4 (зелёная таблетка со стрелкой) */}
  <div style={{position:'absolute', left: 1645, top: 713}}>
    <svg width="62" height="35" viewBox="0 0 62 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 12C0 5.37258 5.37258 0 12 0H50C56.6274 0 62 5.37258 62 12V23C62 29.6274 56.6274 35 50 35H12C5.37258 35 0 29.6274 0 23V12Z" fill="#62A744"/>
      <path d="M30.2727 25.6308L28.517 23.8921L33.7756 18.6336H21V16.0938H33.7756L28.517 10.8438L30.2727 9.09668L38.5398 17.3637L30.2727 25.6308Z" fill="white"/>
    </svg>
    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute', left:21, top:9.1}}>
      <path d="M9.27273 16.6308L7.51705 14.8921L12.7756 9.63361H0V7.09384H12.7756L7.51705 1.84384L9.27273 0.0966797L17.5398 8.36373L9.27273 16.6308Z" fill="white"/>
    </svg>
  </div>
  <div style={{width: 226, height: 77, left: 199, top: 98, position: 'absolute', color: 'black', fontSize: 48, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Услуги</div>
</section>
</div>


{/* Удалён рекурсивный вызов <HomePage /> внутри самого HomePage */}




{showRegisterSuccess && (
  <div className="alert alert-success border-0 rounded-0 mb-0" role="alert">
    Пользователь «{lastRegisteredName}» успешно зарегистрирован.
  </div>
)}

{/* Footer */}
<Footer />

{/* Register Modal */}
<div className="modal fade" id="registerModal" tabIndex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="registerModalLabel">Регистрация</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form onSubmit={handleRegisterSubmit}>
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label">Имя</label>
            <input name="name" type="text" className="form-control" placeholder="Ваше имя" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-control" placeholder="you@example.com" required />
          </div>
          <div className="row g-2">
            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label className="form-label">Пароль</label>
                <input name="password" type="password" className="form-control" placeholder="••••••••" required minLength={6} />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label className="form-label">Подтверждение</label>
                <input name="confirm" type="password" className="form-control" placeholder="••••••••" required minLength={6} />
              </div>
            </div>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="1" id="agree" required />
            <label className="form-check-label" htmlFor="agree">
              Соглашаюсь с условиями обработки данных
            </label>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Отмена</button>
          <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
        </div>
      </form>
    </div>
  </div>
</div>
    </>
  )}

  const RequireEditor = ({ children }) => {
    const isEditor = typeof window !== 'undefined' && localStorage.getItem('authRole') === 'editor'
    if (!isEditor) return <Navigate to="/login" replace />
    return children
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/editor" element={<RequireEditor><EditorPage /></RequireEditor>} />
      <Route path="/editor/new" element={<RequireEditor><EditorPostForm /></RequireEditor>} />
      <Route path="/editor/:id" element={<RequireEditor><EditorPostForm /></RequireEditor>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
