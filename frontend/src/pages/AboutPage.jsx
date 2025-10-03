import { Shield, Target, Users, Award, Phone, Mail } from 'lucide-react';

const AboutPage = () => {
  const values = [
    { icon: Shield, title: 'Безопасность', description: 'Приоритет безопасности всех участников дорожного движения' },
    { icon: Target, title: 'Эффективность', description: 'Оптимизация дорожного движения для максимальной пропускной способности' },
    { icon: Users, title: 'Забота о людях', description: 'Фокус на комфорте и удобстве жителей Смоленской области' },
    { icon: Award, title: 'Профессионализм', description: 'Высокий уровень экспертизы и постоянное развитие' },
  ];

  const goals = [
    'Снижение аварийности на дорогах области',
    'Повышение пропускной способности дорожной сети',
    'Внедрение современных технологий управления движением',
    'Улучшение экологической обстановки',
    'Повышение качества жизни жителей региона',
  ];

  const tasks = [
    'Организация и регулирование дорожного движения',
    'Разработка проектов дорожной инфраструктуры',
    'Мониторинг и анализ дорожной ситуации',
    'Координация работы светофорных объектов',
    'Проведение экспертиз дорожных проектов',
    'Консультации по вопросам дорожного движения',
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-[#62a744] to-[#4a8a3a] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">О ЦОДД Смоленской области</h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Центр организации дорожного движения — современная организация, 
              работающая для обеспечения безопасности и комфорта на дорогах региона.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Кто мы такие</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                ЦОДД Смоленской области — государственное учреждение, созданное для координации 
                и управления дорожным движением в регионе. Наша команда использует современные 
                технологии и лучшие практики.
              </p>
              <p className="text-gray-600 leading-relaxed">
                В составе ЦОДД работают инженеры, проектировщики, аналитики и операторы, 
                обеспечивающие круглосуточную работу инфраструктуры.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#62a744] to-[#4a8a3a] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Наша миссия</h3>
              <p className="text-green-100 leading-relaxed">
                Обеспечить безопасное, комфортное и эффективное дорожное движение для всех жителей.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Наши ценности</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Принципы работы нашей команды</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-[#62a744] rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Наши цели</h2>
              <div className="space-y-4">
                {goals.map((goal, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#62a744] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700 leading-relaxed">{goal}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Основные задачи</h2>
              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#62a744] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700 leading-relaxed">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Наши достижения</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Цифры, которые говорят о нашей эффективности</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#62a744] mb-2">15%</div>
              <div className="text-gray-600">Снижение аварийности</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#62a744] mb-2">50+</div>
              <div className="text-gray-600">Модернизированных объектов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#62a744] mb-2">200+</div>
              <div className="text-gray-600">Новых дорожных знаков</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#62a744] mb-2">25%</div>
              <div className="text-gray-600">Улучшение пропускной способности</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#62a744] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Хотите узнать больше?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами для получения дополнительной информации о нашей работе
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+74812380000" className="bg-white text-[#62a744] px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 flex items-center justify-center space-x-2">
              <Phone size={20} />
              <span>+7 (4812) 38-00-00</span>
            </a>
            <a href="mailto:info@codd-smolensk.ru" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#62a744] transition-colors duration-200 flex items-center justify-center space-x-2">
              <Mail size={20} />
              <span>info@codd-smolensk.ru</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
