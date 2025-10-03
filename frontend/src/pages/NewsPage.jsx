import { useEffect, useState } from 'react';
import { getPosts } from '../api/posts'

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Все новости' },
    { id: 'projects', name: 'Проекты' },
    { id: 'safety', name: 'Безопасность' },
    { id: 'technology', name: 'Технологии' },
    { id: 'events', name: 'События' }
  ];

  // Пустой массив: не используем демо-данные
  const news = [];

  // Грузим опубликованные посты с backend API
  const [allNews, setAllNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    let mounted = true
    setLoading(true)
    getPosts({ status: 'published', page: 1, pageSize: 20 })
      .then(({ items }) => { if (mounted) setAllNews((items || []).map(p => ({
        id: p.id,
        title: p.title,
        excerpt: (p.content || '').slice(0, 180) + ((p.content || '').length > 180 ? '…' : ''),
        content: p.content || '',
        category: 'events',
        author: p.authorName || 'Редакция',
        date: (p.updatedAt || p.createdAt || new Date().toISOString()).slice(0, 10),
        image: '/api/placeholder/600/400',
        tags: p.tags || ['редакция'],
        views: p.views || 0,
        featured: !!p.featured,
      }))) })
      .catch((err) => { if (mounted) setError(err?.message || 'Не удалось загрузить новости') })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  const filteredNews = allNews.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews = filteredNews.filter(article => article.featured);
  const regularNews = filteredNews.filter(article => !article.featured);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#62a744] to-[#4a8a3a] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Новости и события
            </h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Актуальная информация о работе ЦОДД, реализуемых проектах 
              и важных событиях в сфере дорожного движения
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              >
                <path d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                placeholder="Поиск новостей..."
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

      {/* Featured News */}
      {loading ? (
        <section className="py-12 bg-gray-50"><div className="container mx-auto px-4"><div className="text-gray-500">Загрузка…</div></div></section>
      ) : error ? (
        <section className="py-12 bg-gray-50"><div className="container mx-auto px-4"><div className="text-red-600">{error}</div></div></section>
      ) : featuredNews.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Главные новости</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredNews.map((article) => (
                <article key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
                  <div className="h-48 bg-gradient-to-br from-[#62a744] to-[#4a8a3a] flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">📰</div>
                      <div className="text-sm opacity-90">Новость {article.id}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <span aria-hidden>📅</span>
                      <span>{formatDate(article.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span aria-hidden>👤</span>
                      <span>{article.author}</span>
                    </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{article.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{article.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="flex items-center space-x-2 text-[#62a744] hover:text-[#4a8a3a] transition-colors duration-200">
                      <span className="font-medium">Читать полностью</span>
                      <span aria-hidden>→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular News */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Все новости</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="h-32 bg-gradient-to-br from-[#62a744] to-[#4a8a3a] flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-2xl mb-1">📰</div>
                    <div className="text-xs opacity-90">Новость {article.id}</div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                    <span aria-hidden>📅</span>
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="text-[#62a744] hover:text-[#4a8a3a] transition-colors duration-200" aria-label="Открыть">
                      <span aria-hidden>→</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">Новости не найдены</div>
              <p className="text-gray-600">Попробуйте изменить параметры поиска или фильтры</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-[#62a744] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Подпишитесь на новости</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Получайте актуальную информацию о работе ЦОДД и важных событиях 
            в сфере дорожного движения
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-[#62a744] px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200">
              Подписаться
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
