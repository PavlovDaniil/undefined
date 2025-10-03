import { useState } from 'react';
// Using plain anchors to avoid react-router dependency
import LogoCodd from '../../assets/icons/Icon-LogoCodd.svg';

// Simple inline icons to avoid external deps
const IconPhone = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 01.98-.26c1.08.27 2.23.41 3.41.41a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 3a1 1 0 011-1h4.67a1 1 0 011 1c0 1.18.14 2.33.41 3.41a1 1 0 01-.26.98l-2.2 2.2z"/>
  </svg>
);
const IconMail = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);
const IconMapPin = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
  </svg>
);
const IconMenu = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
  </svg>
);
const IconClose = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.3 9.18 12 2.89 5.71 4.3 4.29 10.59 10.6l6.3-6.31z"/>
  </svg>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Главное', href: '/' },
    { name: 'Статистика', href: '/stats' },
    { name: 'Аналитика', href: '/analytics' },
    { name: 'Проекты', href: '/projects' },
  ];

  const isActive = (path) => {
    try {
      return window?.location?.pathname === path;
    } catch {
      return false;
    }
  };

  return (
      <header style={{ position: 'relative', zIndex: 1 }}>

    

      {/* Main navigation */}
        <div className="container-narrow">
          <div
            className="d-flex align-items-center"
            style={{
              background: '#62A744',
              borderRadius: 25,
              padding: '8px 16px',
              gap: 16,
              marginTop: 15,
              maxWidth: 1546,
              minHeight: 'clamp(56px, 8vh, 97px)',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
          {/* Логотип */}
            <a href="/" className="d-flex align-items-center gap-2 text-decoration-none me-2">
              <img src={LogoCodd} alt="ЦОДД" style={{ width: 'clamp(28px, 3.2vw, 48px)', height: 'clamp(28px, 3.2vw, 48px)' }} />
            </a>
            {/* левое пространство для дальнейшего размещения первой кнопки */}
            <div className="d-none d-lg-block" style={{ flexGrow: 1, maxWidth: 'clamp(60px, 10vw, 200px)' }} />

          {/* Десктопная навигация */}
            <nav className="d-none d-lg-flex justify-content-center" style={{ gap: 'clamp(12px, 2.6vw, 40px)' }}>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                  className="px-2 py-1 rounded-3 fw-semibold text-decoration-none"
                  style={{
                    color: isActive(item.href) ? '#fff' : '#ffffff',
                    background: 'transparent',
                    fontSize: 'clamp(14px, 1.1vw, 20px)'
                  }}
              >
                {item.name}
              </a>
            ))}
          </nav>
            {/* правое пространство для дальнейшего размещения последней кнопки */}
            <div className="d-none d-lg-block" style={{ flexGrow: 1 }} />

            {/* Десктопный поиск */}
            <div className="d-none d-lg-flex align-items-center ms-auto">
              <div className="d-flex align-items-center rounded-pill px-3 py-1" style={{ background: '#F9FFF6' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: '#6a6a6a', flex: '0 0 auto' }}>
                  <path d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Поиск"
                  className="form-control form-control-sm border-0 bg-transparent ms-2"
                  style={{ width: 'clamp(140px, 16vw, 300px)', color: '#2b2b2b', fontSize: 'clamp(13px, 1vw, 16px)' }}
                />
              </div>
              {/* Десктопный бургер-иконка (справа от поиска) */}
              <button
                type="button"
                aria-label="Меню"
                className="ms-3 p-2 border-0"
                style={{ background: 'transparent', color: '#fff' }}
              >
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden="true">
                  <path d="M2 2H26M2 10H26M2 18H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

          {/* Мобильная кнопка меню */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="d-lg-none p-2 rounded-2 ms-auto"
            style={{ color: '#fff', background: 'rgba(255,255,255,.15)' }}
          >
              {isMenuOpen ? <IconClose size={24} /> : <IconMenu size={24} />}
          </button>
        </div>

        {/* Мобильная навигация */}
          {isMenuOpen && (
          <div className="d-lg-none border-top border-white-50 py-3">
              <nav className="d-flex flex-column gap-2">
              {navigation.map((item) => (
                  <a
                  key={item.name}
                    href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2 rounded-3 fw-semibold text-decoration-none"
                    style={{
                      color: isActive(item.href) ? '#fff' : 'rgba(255,255,255,.9)',
                      background: isActive(item.href) ? 'rgba(255,255,255,.10)' : 'transparent'
                    }}
                >
                  {item.name}
                  </a>
              ))}
            </nav>
          </div>
        )}
      </div>
      </header>
  );
};

export default Header;
