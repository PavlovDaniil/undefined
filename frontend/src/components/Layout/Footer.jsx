import React from 'react';
import vkIcon from '../../assets/icons/Icon-Vkontakte.svg';
import tgIcon from '../../assets/icons/icon-Telegram.svg';
import logoIcon from '../../assets/icons/Icon-LogoCodd.svg';
import '../../style/Footer.css';

// 🚨 ВАЖНО: Предполагается, что вы определите эти стили в файле CSS (например, Footer.css).

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      {/* Основной адаптивный контейнер */}
      <div className="footer-wrapper">

        {/* --- 1. Левая секция: Навигационные ссылки (Адаптивный Grid/Flex) --- */}
        <div className="footer-links-section">
          
          {/* Колонка 1: Информация */}
          <div className="footer-column">
            <h4 className="column-title">Информация</h4>
            <a href="#" className="column-link">О ЦОДД</a>
            <a href="#" className="column-link">Команда</a>
            <a href="#" className="column-link">Документы</a>
            <a href="#" className="column-link">Новости</a>
            <a href="#" className="column-link">Контакты</a>
          </div>

          {/* Колонка 2: Для граждан */}
          <div className="footer-column">
            <h4 className="column-title">Для граждан</h4>
            <a href="#" className="column-link">Проекты</a>
            <a href="#" className="column-link">Услуги</a>
            <a href="#" className="column-link">Сервисы</a>
            <a href="#" className="column-link">Вакансии</a>
          </div>

          {/* Колонка 3: Партнеры */}
          <div className="footer-column">
            <h4 className="column-title">Партнеры</h4>
            <a href="#" className="column-link">Правительство Смоленской области</a>
            <a href="#" className="column-link">Нацпроекты</a>
          </div>

        </div>

        {/* --- 2. Правая секция: Контакты, Соцсети и Карта (Может быть скрыта/перестроена на мобильных) --- */}
        <div className="footer-contacts-section">
          
          {/* Контакты и Соцсети (Верхний правый блок) */}
          <div className="contact-social-row">
             {/* Соцсети */}
            <div className="social-group">
              <div className="social-title">Социальные сети</div>
              <div className="social-icons">
                <a href="#"><img src={vkIcon} alt="VK" className="social-icon" /></a>
                <a href="#"><img src={tgIcon} alt="Telegram" className="social-icon" /></a>
              </div>
            </div>

            {/* Контакты */}
            <div className="contact-group">
              <div className="contact-org">СОГБУ "ЦОДД"</div>
              <div className="contact-details">
                почта smolensc@mail.ru<br />номер +79781781789
              </div>
            </div>
          </div>
          
          {/* Адрес и Карта */}
          <div className="address-map-group">
            <p className="address-text">
              <span className="address-label">Адрес </span>
              ул. Большая Краснофлотская, 70, Смоленск
            </p>
            {/* Блок для карты */}
            <div className="map-placeholder">
              <div className="map-text">Карта</div>
            </div>
          </div>

        </div>
        
        {/* Логотип (отдельный элемент для гибкого позиционирования) */}
        <img src={logoIcon} alt="Логотип ЦОДД" className="footer-logo" />

        {/* Копирайт */}
        <div className="footer-copyright">
          <span className="copyright-text">© {currentYear} </span>
          <span className="copyright-text">СОГБУ "ЦОДД"</span>
          <span className="copyright-text">. Все права защищены.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;