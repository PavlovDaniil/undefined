import { useState } from 'react';
import { MapPin, Calendar, Users, TrendingUp, CheckCircle, ArrowRight, Filter, Search } from 'lucide-react';

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Все проекты' },
    { id: 'safety', name: 'Безопасность' },
    { id: 'infrastructure', name: 'Инфраструктура' },
    { id: 'technology', name: 'Технологии' },
    { id: 'environment', name: 'Экология' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Модернизация светофорных объектов на центральных улицах',
      category: 'infrastructure',
      status: 'completed',
      startDate: '2023-01-15',
      endDate: '2023-06-30',
      location: 'Центр города, ул. Ленина, ул. Большая Советская',
      description: 'Установка современных светофорных объектов с адаптивным управлением для улучшения пропускной способности',
      impact: {
        accidents: -25,
        traffic: 30,
        satisfaction: 85
      },
      images: {
        before: '/api/placeholder/400/300',
        after: '/api/placeholder/400/300'
      },
      budget: '15,000,000',
      team: 12
    },
    {
      id: 2,
      title: 'Система мониторинга дорожного движения',
      category: 'technology',
      status: 'in-progress',
      startDate: '2023-09-01',
      endDate: '2024-03-31',
      location: 'Весь город',
      description: 'Внедрение интеллектуальной системы мониторинга с использованием камер и датчиков',
      impact: {
        accidents: -15,
        traffic: 20,
        satisfaction: 75
      },
      images: {
        before: '/api/placeholder/400/300',
        after: '/api/placeholder/400/300'
      },
      budget: '25,000,000',
      team: 18
    },
    {
      id: 3,
      title: 'Обустройство пешеходных переходов',
      category: 'safety',
      status: 'completed',
      startDate: '2023-03-01',
      endDate: '2023-08-15',
      location: 'Школьные зоны, больницы, торговые центры',
      description: 'Установка светофоров на пешеходных переходах и обустройство безопасных зон',
      impact: {
        accidents: -40,
        traffic: 10,
        satisfaction: 90
      },
      images: {
        before: '/api/placeholder/400/300',
        after: '/api/placeholder/400/300'
      },
      budget: '8,500,000',
      team: 8
    },
    {
      id: 4,
      title: 'Экологически чистые автобусные маршруты',
      category: 'environment',
      status: 'planning',
      startDate: '2024-06-01',
      endDate: '2024-12-31',
      location: 'Основные транспортные артерии',
      description: 'Оптимизация автобусных маршрутов для снижения выбросов и улучшения экологии',
      impact: {
        accidents: -10,
        traffic: 15,
        satisfaction: 80
      },
      images: {
        before: '/api/placeholder/400/300',
        after: '/api/placeholder/400/300'
      },
      budget: '12,000,000',
      team: 10
    },
    {
      id: 5,
      title: 'Умные парковки в центре города',
      category: 'technology',
      status: 'in-progress',
      startDate: '2023-11-01',
      endDate: '2024-05-31',
      location: 'Центральный район',
      description: 'Внедрение системы умных парковок с датчиками и мобильным приложением',
      impact: {
        accidents: -5,
        traffic: 25,
        satisfaction: 88
      },
      images: {
        before: '/api/placeholder/400/300',
        after: '/api/placeholder/400/300'
      },
      budget: '18,000,000',
      team: 15
    },
    {
      id: 6,
      title: 'Реконструкция кольцевой развязки',
      category: 'infrastructure',
      status: 'completed',
      startDate: '2022-09-01',
      endDate: '2023-04-30',
      location: 'Кольцевая развязка ул. Кирова',
      description: 'Полная реконструкция кольцевой развязки с улучшением пропускной способности',
      impact: {
        accidents: -35,
        traffic: 40,
        satisfaction: 92
      },
      images: {
        before: '/api/placeholder/400/300',
        after: '/api/placeholder/400/300'
      },
      budget: '35,000,000',
      team: 20
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Завершен';
      case 'in-progress': return 'В работе';
      case 'planning': return 'Планируется';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#62a744] to-[#4a8a3a] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Наши проекты
            </h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Реализованные и текущие проекты по улучшению дорожной инфраструктуры 
              и безопасности движения в Смоленской области
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#62a744] mb-2">15+</div>
              <div className="text-gray-600">Завершенных проектов</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#62a744] mb-2">113M</div>
              <div className="text-gray-600">Рублей инвестировано</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#62a744] mb-2">-25%</div>
              <div className="text-gray-600">Снижение аварийности</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#62a744] mb-2">+30%</div>
              <div className="text-gray-600">Улучшение пропускной способности</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск проектов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62a744] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-[#62a744] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-[#62a744] to-[#4a8a3a]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">🚦</div>
                      <div className="text-sm opacity-90">Проект {project.id}</div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{project.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{project.description}</p>

                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="text-gray-600 truncate">{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-600">{project.startDate} - {project.endDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users size={16} className="text-gray-400" />
                      <span className="text-gray-600">{project.team} специалистов</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp size={16} className="text-gray-400" />
                      <span className="text-gray-600">{project.budget} ₽</span>
                    </div>
                  </div>

                  {/* Impact Metrics */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Результаты проекта:</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-green-600">{project.impact.accidents}%</div>
                        <div className="text-xs text-gray-600">Аварийность</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-600">+{project.impact.traffic}%</div>
                        <div className="text-xs text-gray-600">Пропускная способность</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-600">{project.impact.satisfaction}%</div>
                        <div className="text-xs text-gray-600">Удовлетворенность</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-[#62a744] text-white py-2 px-4 rounded-lg hover:bg-[#4a8a3a] transition-colors duration-200 flex items-center justify-center space-x-2">
                    <span>Подробнее о проекте</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">Проекты не найдены</div>
              <p className="text-gray-600">Попробуйте изменить параметры поиска или фильтры</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#62a744] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Хотите предложить свой проект?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Мы всегда открыты для новых идей и предложений по улучшению 
            дорожной инфраструктуры региона
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contacts"
              className="bg-white text-[#62a744] px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200"
            >
              Связаться с нами
            </a>
            <a
              href="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#62a744] transition-colors duration-200"
            >
              Наши услуги
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
