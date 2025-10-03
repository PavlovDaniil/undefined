import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, User, Building } from 'lucide-react';

const ContactsPage = () => {
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = {
    address: 'г. Смоленск, ул. Примерная, 1',
    phone: '+7 (4812) 38-00-00',
    email: 'info@codd-smolensk.ru',
    workingHours: 'Пн-Пт: 8:00-17:00, Сб-Вс: выходной',
    emergencyPhone: '+7 (4812) 38-00-99'
  };

  const departments = [
    {
      name: 'Приемная',
      phone: '+7 (4812) 38-00-01',
      email: 'reception@codd-smolensk.ru',
      hours: 'Пн-Пт: 8:00-17:00'
    },
    {
      name: 'Отдел по работе с населением',
      phone: '+7 (4812) 38-00-02',
      email: 'citizens@codd-smolensk.ru',
      hours: 'Пн-Пт: 9:00-18:00'
    },
    {
      name: 'Техническая поддержка',
      phone: '+7 (4812) 38-00-03',
      email: 'support@codd-smolensk.ru',
      hours: 'Круглосуточно'
    },
    {
      name: 'Экстренная служба',
      phone: '+7 (4812) 38-00-99',
      email: 'emergency@codd-smolensk.ru',
      hours: 'Круглосуточно'
    }
  ];

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки формы
    setTimeout(() => {
      alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
      setFeedbackForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleInputChange = (e) => {
    setFeedbackForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#62a744] to-[#4a8a3a] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Контакты
            </h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Свяжитесь с нами любым удобным способом. Мы всегда готовы помочь 
              и ответить на ваши вопросы
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#62a744] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Адрес</h3>
              <p className="text-gray-600 text-sm">{contactInfo.address}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#62a744] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Телефон</h3>
              <p className="text-gray-600 text-sm">{contactInfo.phone}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#62a744] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600 text-sm">{contactInfo.email}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#62a744] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Часы работы</h3>
              <p className="text-gray-600 text-sm">{contactInfo.workingHours}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map and Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Как нас найти</h2>
              <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin size={48} className="mx-auto mb-4" />
                  <p>Интерактивная карта</p>
                  <p className="text-sm">г. Смоленск, ул. Примерная, 1</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin size={20} className="text-[#62a744] mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Адрес офиса</h3>
                    <p className="text-gray-600">{contactInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock size={20} className="text-[#62a744] mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Часы работы</h3>
                    <p className="text-gray-600">{contactInfo.workingHours}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone size={20} className="text-[#62a744] mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Экстренная служба</h3>
                    <p className="text-gray-600">{contactInfo.emergencyPhone}</p>
                    <p className="text-sm text-gray-500">Круглосуточно</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Обратная связь</h2>
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={feedbackForm.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62a744] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={feedbackForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62a744] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={feedbackForm.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62a744] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тема обращения
                  </label>
                  <select
                    name="subject"
                    value={feedbackForm.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62a744] focus:border-transparent"
                  >
                    <option value="">Выберите тему</option>
                    <option value="service">Заказ услуги</option>
                    <option value="complaint">Жалоба</option>
                    <option value="suggestion">Предложение</option>
                    <option value="question">Вопрос</option>
                    <option value="other">Другое</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Сообщение *
                  </label>
                  <textarea
                    name="message"
                    value={feedbackForm.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62a744] focus:border-transparent"
                    placeholder="Опишите ваш вопрос или предложение..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#62a744] text-white py-3 px-4 rounded-lg hover:bg-[#4a8a3a] transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Отправка...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Отправить сообщение</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Отделы и службы
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Контактная информация по отделам для решения различных вопросов
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-[#62a744] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{dept.name}</h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-gray-400" />
                    <a href={`tel:${dept.phone}`} className="text-[#62a744] hover:underline">
                      {dept.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-gray-400" />
                    <a href={`mailto:${dept.email}`} className="text-[#62a744] hover:underline">
                      {dept.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-gray-600">{dept.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Экстренная служба</h2>
          <p className="text-red-100 mb-6">
            В случае экстренных ситуаций на дорогах обращайтесь круглосуточно
          </p>
          <a
            href={`tel:${contactInfo.emergencyPhone}`}
            className="inline-flex items-center space-x-2 bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-200"
          >
            <Phone size={20} />
            <span>{contactInfo.emergencyPhone}</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactsPage;
