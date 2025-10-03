import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import carImage from '../assets/img/car.png';
import News4 from '../assets/img/News_photos_4.png'
import News1 from '../assets/img/News_photos_1.png'
import News2 from '../assets/img/News_photos_2.png'
import News3 from '../assets/img/News_photos_3.png'
import '../style/homePage.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  ChartTooltip,
  ChartLegend
);

// Данные для графика
const accidentData = {
  "Столкновение": [120, 135, 150, 160, 140, 155],
  "Наезд на пешехода": [80, 70, 90, 100, 95, 85],
  "Наезд на велосипедиста": [30, 40, 45, 50, 42, 48],
  "Наезд на препятствие": [60, 55, 70, 65, 68, 72],
  "Наезд на ТС": [25, 30, 28, 35, 40, 38],
};

const labels = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн"];

// Компонент Мониторинга аварийности
const AccidentMonitoring = () => {
  const [selectedType, setSelectedType] = useState("Столкновение");

  const data = {
    labels,
    datasets: [
      {
        label: selectedType,
        data: accidentData[selectedType],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.3)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
  <section className="accident-monitoring">
    <h2>Мониторинг аварийности</h2>
    <p>Это платформа сбора данных о ДТП с пострадавшими, которые произошли в Смоленске</p>

    <div className="type-buttons">
      {Object.keys(accidentData).map(type => (
        <button
          key={type}
          onClick={() => setSelectedType(type)}
          className={selectedType === type ? "active" : ""}
        >
          {type}
        </button>
      ))}
    </div>

    <div className="chart-container">
      <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  </section>
  );
};


const HomePage = () => {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Главная секция */}
      <section className="section">
        <div className="container-narrow">
          <div className="service-tile grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-surface-2 rounded-3xl p-8 sm:p-10 lg:p-12">

            {/* Левая часть — картинка с вырезанным углом */}
            <div className="trust-image-wrapper rounded-3xl overflow-hidden">
              <img src={carImage} alt="ЦОДД авто" className="trust-image-modern" />
            </div>

            {/* Правая часть — текст + список + кнопка */}
            <div>
              <h2 className="h2 text-muted mb-6 text-center lg:text-left">Главное</h2>

              <div className="trust-list-custom">
                {[
                  {
                    title: "Безопасность и технологии",
                    text: "ЦОДД внедряет современные технологии, включая системы фото- и видеофиксации, а также развивает интеллектуальные транспортные системы."
                  },
                  {
                    title: "Поддержание движения",
                    text: "Организация отвечает за бесперебойное движение транспорта в Смоленске и области."
                  },
                  {
                    title: "Комплексное развитие",
                    text: "Это не просто точечные улучшения, а комплексный подход к повышению безопасности, эффективности и комфорта."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="trust-item-custom mb-6 flex items-start gap-3">
                    <span className="trust-dot-custom"></span>
                    <div>
                      <h3 className="h3 font-bold text-text">{item.title}</h3>
                      <p className="text-muted mt-1 lead">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center lg:text-left">
                <button className="btn btn-primary btn-lg px-6 py-3 rounded-full text-base sm:text-lg font-medium w-full lg:w-auto">
                  Узнать больше о нас
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Секция новостей */}
      <section className="news-section">
        <div className="news-section__container">
          <h2 className="news-title">Актуально сейчас</h2>

          <div className="news-cards">
            <article className="news-card">
              <img src={News1} alt="Новость 1" className="news-card__image" />
              <div className="news-content">
                <h3>Изменение схемы движения на улице Николаева</h3>
                <span className="date">23 сентября 2025 16:00</span>
                <p>Ограничения движения и изменения в работе городского транспорта.</p>
              </div>
            </article>

            <article className="news-card">
              <img src={News2} alt="Новость 2" className="news-card__image" />
              <div className="news-content">
                <h3>Установка новых камер фиксации нарушений</h3>
                <span className="date">23 сентября 2025 16:00</span>
                <p>С начала года зафиксировано на 10% меньше ДТП, чем за аналогичный период 2024 года.</p>
              </div>
            </article>

            <article className="news-card">
              <img src={News3} alt="Новость 3" className="news-card__image" />
              <div className="news-content">
                <h3>Смена директора СОГБУ “ЦОДД”</h3>
                <span className="date">23 сентября 2025 16:00</span>
                <p>Директором СОГБУ «ЦОДД» стал Андрей Гильденков.</p>
              </div>
            </article>

            <article className="news-card">
              <img src={News4} alt="Новость 4" className="news-card__image" />
              <div className="news-content">
                <h3>Автомобильные потоки регулируются «умной системой»</h3>
                <span className="date">23 сентября 2025 16:00</span>
                <p>Светофор работает без чёткого временного интервала.</p>
              </div>
            </article>
          </div>

          <a href="/news" className="news-button">Все новости</a>
        </div>
      </section>

      <AccidentMonitoring />

      {/* Projects Section */}
      <section className="projects-section">
        <div className="projects-section__container">
          <h2 className="projects-title">Проекты</h2>

          <div className="projects-cards">
            {/* Карточка 1 */}
            <article className="project-card">
              <h3 className="project-card__title">Интеллектуальная транспортная система</h3>
              <p className="project-card__excerpt">
                С 2024 года ЦОДД реализует трёхлетний проект по созданию ИТС в Смоленске 
                в рамках национального проекта «Безопасные качественные дороги».
              </p>
              <a href="#" className="project-button">Подробнее</a>
            </article>

            {/* Карточка 2 */}
            <article className="project-card">
              <h3 className="project-card__title">Парковочное пространство</h3>
              <p className="project-card__excerpt">
                ЦОДД разработал новую схему парковок для центра Смоленска, 
                чтобы решить проблему с автомобилями, мешающими движению.
              </p>
              <a href="#" className="project-button">Подробнее</a>
            </article>

            {/* Карточка 3 */}
            <article className="project-card">
              <h3 className="project-card__title">Системы автоматического контроля и выявления нарушений ПДД</h3>
              <p className="project-card__excerpt">
                Она позволяет фиксировать достаточно широкий спектр нарушений, 
                что положительно сказывается на снижении уровня аварийности.
              </p>
              <a href="#" className="project-button">Подробнее</a>
            </article>

            {/* Карточка 4 */}
            <article className="project-card">
              <h3 className="project-card__title">Подсистема метеомониторинга</h3>
              <p className="project-card__excerpt">
                Будет позволять анализировать изменения погодных условий 
                и принимать решения о движении коммунальной техники.
              </p>
              <span className="project-badge">В разработке</span>
            </article>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section className="services-section">
        <div className="services-container">
          <h2 className="services-title">Услуги</h2>

          <div className="services-cards">
            {/* Карточка 1 */}
            <article className="service-card">
              <h3 className="service-card__title">Аренда автовышки</h3>
              <p className="service-card__excerpt">
                У нас вы можете арендовать автовышку и получить бесценный опыт работы
                с ЦОДД родного города!
              </p>
              <a href="#" className="service-arrow">→</a>
            </article>

            {/* Карточка 2 */}
            <article className="service-card">
              <h3 className="service-card__title">
                Разработка проектно-сметной документации для строительства светофорных объектов
              </h3>
              <p className="service-card__excerpt">
                У нас вы можете разработать документацию и получить бесценный опыт работы
                с ЦОДД родного города!
              </p>
              <a href="#" className="service-arrow">→</a>
            </article>

            {/* Карточка 3 */}
            <article className="service-card">
              <h3 className="service-card__title">Вызов эвакуатора</h3>
              <p className="service-card__excerpt">
                У нас вы можете вызвать эвакуатор и получить бесценный опыт работы
                с ЦОДД родного города!
              </p>
              <a href="#" className="service-arrow">→</a>
            </article>
          </div>

          <div className="services-footer">
            <p className="services-footer__text">
              Посмотрите весь каталог услуг на нашей странице <b>«Услуги»</b>. 
              Обязательно найдётся что-то по душе. Скорее кликай на кнопку!
            </p>
            <a href="#" className="services-button">Больше услуг →</a>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="section footer text-white text-center">
        <div className="container-narrow">
          <h2 className="h2 mb-4">Нужна помощь с дорожным движением?</h2>
          <p className="lead mb-6">
            Свяжитесь с нами прямо сейчас. Наши специалисты готовы помочь вам в любое время суток.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contacts" className="btn btn-light btn-lg">
              <Phone size={18} /> Связаться с нами
            </Link>
            <Link to="/services" className="btn btn-outline-secondary btn-lg">
              Заказать услугу <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>

  );
};

export default HomePage;
