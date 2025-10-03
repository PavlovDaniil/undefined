import { Users, Award, GraduationCap, Clock, Mail, Phone } from 'lucide-react';

const TeamPage = () => {
  const teamMembers = [
    {
      name: 'Иванов Александр Петрович',
      position: 'Директор ЦОДД',
      experience: '15 лет',
      education: 'МГУ, факультет механики и математики',
      specialization: 'Управление дорожным движением',
      achievements: ['Кандидат технических наук', 'Автор 20+ научных работ'],
      email: 'director@codd-smolensk.ru',
      phone: '+7 (4812) 38-00-01'
    },
    {
      name: 'Петрова Елена Владимировна',
      position: 'Заместитель директора',
      experience: '12 лет',
      education: 'СмолГУ, инженерно-строительный факультет',
      specialization: 'Проектирование дорожной инфраструктуры',
      achievements: ['Сертифицированный проектировщик', 'Эксперт по безопасности дорожного движения'],
      email: 'deputy@codd-smolensk.ru',
      phone: '+7 (4812) 38-00-02'
    },
    {
      name: 'Сидоров Михаил Алексеевич',
      position: 'Главный инженер',
      experience: '10 лет',
      education: 'МАДИ, факультет дорожного строительства',
      specialization: 'Техническое обеспечение дорожного движения',
      achievements: ['Мастер спорта по автоспорту', 'Сертификат по ITS технологиям'],
      email: 'engineer@codd-smolensk.ru',
      phone: '+7 (4812) 38-00-03'
    },
    {
      name: 'Козлова Анна Сергеевна',
      position: 'Руководитель аналитического отдела',
      experience: '8 лет',
      education: 'МГУ, факультет вычислительной математики',
      specialization: 'Анализ дорожного движения и моделирование',
      achievements: ['PhD в области транспортной аналитики', 'Автор 15+ публикаций'],
      email: 'analytics@codd-smolensk.ru',
      phone: '+7 (4812) 38-00-04'
    },
    {
      name: 'Морозов Дмитрий Игоревич',
      position: 'Начальник оперативного отдела',
      experience: '7 лет',
      education: 'СмолГУ, факультет информационных технологий',
      specialization: 'Управление светофорными объектами',
      achievements: ['Сертификат по системам управления движением', 'Опыт работы с ITS'],
      email: 'operations@codd-smolensk.ru',
      phone: '+7 (4812) 38-00-05'
    },
    {
      name: 'Волкова Ольга Николаевна',
      position: 'Специалист по связям с общественностью',
      experience: '5 лет',
      education: 'СмолГУ, факультет журналистики',
      specialization: 'Коммуникации и информирование населения',
      achievements: ['Магистр коммуникаций', 'Опыт работы в государственных структурах'],
      email: 'pr@codd-smolensk.ru',
      phone: '+7 (4812) 38-00-06'
    }
  ];

  const departments = [
    {
      name: 'Отдел проектирования',
      description: 'Разработка проектов дорожной инфраструктуры и светофорных объектов',
      members: 8,
      icon: '📐'
    },
    {
      name: 'Оперативный отдел',
      description: 'Мониторинг дорожной ситуации и управление светофорными объектами',
      members: 12,
      icon: '🚦'
    },
    {
      name: 'Аналитический отдел',
      description: 'Анализ дорожного движения и разработка рекомендаций',
      members: 6,
      icon: '📊'
    },
    {
      name: 'Технический отдел',
      description: 'Обслуживание и ремонт технических средств организации движения',
      members: 10,
      icon: '🔧'
    },
    {
      name: 'Отдел по работе с населением',
      description: 'Консультации граждан и обработка обращений',
      members: 5,
      icon: '👥'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#62a744] to-[#4a8a3a] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Наша команда
            </h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Профессионалы, которые работают для обеспечения безопасности 
              и комфорта на дорогах Смоленской области
            </p>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#62a744] mb-2">41</div>
              <div className="text-gray-600">Специалистов в команде</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#62a744] mb-2">9.5</div>
              <div className="text-gray-600">Лет средний опыт работы</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#62a744] mb-2">100%</div>
              <div className="text-gray-600">Специалистов с высшим образованием</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#62a744] mb-2">24/7</div>
              <div className="text-gray-600">Круглосуточная работа</div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Руководство
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Опытные руководители с многолетним стажем работы в сфере дорожного движения
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.slice(0, 3).map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-[#62a744] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={40} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-[#62a744] font-medium">{member.position}</p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-gray-600">Опыт: {member.experience}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GraduationCap size={16} className="text-gray-400" />
                    <span className="text-gray-600">{member.education}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award size={16} className="text-gray-400" />
                    <span className="text-gray-600">{member.specialization}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex-1 bg-[#62a744] text-white px-3 py-2 rounded text-center text-sm hover:bg-[#4a8a3a] transition-colors duration-200 flex items-center justify-center space-x-1"
                    >
                      <Mail size={14} />
                      <span>Email</span>
                    </a>
                    <a
                      href={`tel:${member.phone}`}
                      className="flex-1 border border-[#62a744] text-[#62a744] px-3 py-2 rounded text-center text-sm hover:bg-[#62a744] hover:text-white transition-colors duration-200 flex items-center justify-center space-x-1"
                    >
                      <Phone size={14} />
                      <span>Звонок</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Team Members */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Все специалисты
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Полный состав нашей команды профессионалов
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-[#62a744] rounded-full flex items-center justify-center flex-shrink-0">
                    <Users size={20} className="text-white" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-[#62a744] text-sm font-medium mb-2">{member.position}</p>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>Опыт: {member.experience}</div>
                      <div className="truncate">{member.specialization}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Наши отделы
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Структура организации по функциональным направлениям
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                <div className="text-4xl mb-4">{dept.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{dept.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{dept.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#62a744] font-medium">{dept.members} специалистов</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 bg-[#62a744] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Хотите присоединиться к нашей команде?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Мы всегда ищем талантливых специалистов, готовых работать 
            на благо жителей Смоленской области
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/vacancies"
              className="bg-white text-[#62a744] px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200"
            >
              Посмотреть вакансии
            </a>
            <a
              href="mailto:hr@codd-smolensk.ru"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#62a744] transition-colors duration-200"
            >
              Отправить резюме
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
