import { useState } from 'react';
import { Phone, Clock, CheckCircle, ArrowRight, Calendar, User, MapPin, MessageSquare } from 'lucide-react';

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const services = [
    {
      id: 'evacuator',
      title: 'Эвакуатор',
      description: 'Быстрая эвакуация транспортных средств при ДТП, поломках или нарушениях правил парковки',
      icon: '🚛',
      price: 'от 2,500 ₽',
      duration: '30-60 мин',
      features: [
        'Круглосуточная работа',
        'Современная техника',
        'Опытные водители',
        'Страхование груза',
        'Доставка в любую точку города'
      ],
      requirements: [
        'Документы на автомобиль',
        'Удостоверение личности',
        'Справка о ДТП (при необходимости)'
      ]
    },
    {
      id: 'tower',
      title: 'Аренда автовышки',
      description: 'Аренда специальной техники для проведения высотных работ, обслуживания светофоров и дорожных знаков',
      icon: '🏗️',
      price: 'от 5,000 ₽/час',
      duration: 'от 2 часов',
      features: [
        'Высота подъема до 30 метров',
        'Профессиональные операторы',
        'Современное оборудование',
        'Страхование работ',
        'Доставка на объект'
      ],
      requirements: [
        'Техническое задание',
        'Разрешение на работы',
        'Страховка объекта'
      ]
    },
    {
      id: 'project',
      title: 'Проектная документация',
      description: 'Разработка проектов дорожной инфраструктуры, светофорных объектов и организации дорожного движения',
      icon: '📋',
      price: 'от 50,000 ₽',
      duration: '2-4 недели',
      features: [
        'Полный пакет документов',
        'Соответствие ГОСТам',
        'Экспертиза проекта',
        'Сопровождение согласований',
        'Гарантия качества'
      ],
      requirements: [
        'Техническое задание',
        'Топографическая съемка',
        'Справки о коммуникациях'
      ]
    },
    {
      id: 'consultation',
      title: 'Консультации',
      description: 'Экспертные консультации по вопросам организации дорожного движения и безопасности',
      icon: '💬',
      price: 'от 3,000 ₽/час',
      duration: '1-3 часа',
      features: [
        'Опытные эксперты',
        'Индивидуальный подход',
        'Письменные рекомендации',
        'Последующее сопровождение',
        'Конфиденциальность'
      ],
      requirements: [
        'Описание проблемы',
        'Документы по объекту',
        'Цели консультации'
      ]
    },
    {
      id: 'monitoring',
      title: 'Мониторинг дорожного движения',
      description: 'Анализ дорожной ситуации, подсчет интенсивности движения и разработка рекомендаций',
      icon: '📊',
      price: 'от 25,000 ₽',
      duration: '1-2 недели',
      features: [
        'Автоматический подсчет',
        'Анализ пиковых нагрузок',
        'Рекомендации по оптимизации',
        'Графики и диаграммы',
        'Экспертное заключение'
      ],
      requirements: [
        'Координаты участка',
        'Период наблюдения',
        'Цели исследования'
      ]
    },
    {
      id: 'signs',
      title: 'Установка дорожных знаков',
      description: 'Изготовление и установка дорожных знаков, информационных табличек и указателей',
      icon: '🛑',
      price: 'от 8,000 ₽',
      duration: '1-3 дня',
      features: [
        'Собственное производство',
        'Соответствие ГОСТам',
        'Современные материалы',
        'Гарантия 3 года',
        'Быстрая установка'
      ],
      requirements: [
        'Техническое задание',
        'Разрешение на установку',
        'Схема размещения'
      ]
    }
  ];

  const [orderForm, setOrderForm] = useState({
    service: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    date: '',
    time: '',
    message: ''
  });

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setOrderForm(prev => ({ ...prev, service: service.id }));
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки заказа
    alert('Заказ отправлен! Мы свяжемся с вами в ближайшее время.');
    setShowOrderForm(false);
    setOrderForm({
      service: '',
      name: '',
      phone: '',
      email: '',
      address: '',
      date: '',
      time: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#62a744] to-[#4a8a3a] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Наши услуги
            </h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Полный спектр услуг по организации дорожного движения, 
              обеспечению безопасности и техническому обслуживанию
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Стоимость:</span>
                    <span className="font-semibold text-[#62a744]">{service.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Время выполнения:</span>
                    <span className="font-semibold text-gray-800">{service.duration}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-800">Включено в услугу:</h4>
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle size={16} className="text-[#62a744] flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleServiceSelect(service)}
                  className="w-full bg-[#62a744] text-white py-3 px-4 rounded-lg hover:bg-[#4a8a3a] transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Заказать услугу</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-4xl mb-2">{selectedService.icon}</div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedService.title}</h2>
                  <p className="text-gray-600 mt-2">{selectedService.description}</p>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Включено в услугу:</h3>
                  <ul className="space-y-2">
                    {selectedService.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle size={16} className="text-[#62a744] flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Требования:</h3>
                  <ul className="space-y-2">
                    {selectedService.requirements.map((req, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle size={16} className="text-[#62a744] flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setShowOrderForm(true);
                    setSelectedService(null);
                  }}
                  className="flex-1 bg-[#62a744] text-white py-3 px-4 rounded-lg hover:bg-[#4a8a3a] transition-colors duration-200"
                >
                  Заказать услугу
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Заказ услуги</h2>
                <button
                  onClick={() => setShowOrderForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Выбранная услуга
                  </label>
                  <select
                    value={orderForm.service}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, service: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62a744] focus:border-transparent"
                    required
                  >
                    <option value="">Выберите услугу</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>{service.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя *
                    </label>
                    <input
                      type="text"
                      value={orderForm.name}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62a744] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62a744] focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={orderForm.email}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62a744] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Адрес
                  </label>
                  <input
                    type="text"
                    value={orderForm.address}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62a744] focus:border-transparent"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Предпочтительная дата
                    </label>
                    <input
                      type="date"
                      value={orderForm.date}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62a744] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Предпочтительное время
                    </label>
                    <input
                      type="time"
                      value={orderForm.time}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62a744] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дополнительная информация
                  </label>
                  <textarea
                    value={orderForm.message}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, message: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62a744] focus:border-transparent"
                    placeholder="Опишите детали заказа..."
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-[#62a744] text-white py-3 px-4 rounded-lg hover:bg-[#4a8a3a] transition-colors duration-200"
                  >
                    Отправить заказ
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowOrderForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Contact CTA */}
      <section className="py-20 bg-[#62a744] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Нужна консультация?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Наши специалисты готовы ответить на ваши вопросы и помочь выбрать 
            подходящую услугу
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+74812380000"
              className="bg-white text-[#62a744] px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Phone size={20} />
              <span>+7 (4812) 38-00-00</span>
            </a>
            <a
              href="mailto:info@codd-smolensk.ru"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#62a744] transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <MessageSquare size={20} />
              <span>Написать нам</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
