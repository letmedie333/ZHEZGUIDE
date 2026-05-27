import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Utensils, TreePine, Compass, Dumbbell, MapPin, Star, ArrowRight } from 'lucide-react';
import { PLACES_DATA } from '../data/places';

const CATEGORIES = [
  { id: 'all', name: 'Все места', icon: Compass },
  { id: 'eat', name: 'Где поесть', icon: Utensils },
  { id: 'relax', name: 'Отдых', icon: TreePine },
  { id: 'fun', name: 'Развлечения', icon: Compass },
  { id: 'sport', name: 'Спорт', icon: Dumbbell },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPlaces = PLACES_DATA.filter(place => {
    const matchesCategory = activeCategory === 'all' || place.category === activeCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          place.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#F9F9F9] min-h-screen">
      
      {/* Hero-блок в журнальном стиле */}
      <section className="relative w-full h-[60vh] md:h-[70vh] min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <img 
            src="https://jezkazgan.vision.kz/wp-content/uploads/2025/12/jezkazgan.jpg" 
            alt="Жезказган" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="relative z-10 w-full px-5 sm:px-6 md:px-12 lg:px-20 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 mt-10 md:mt-0">
          <div className="max-w-2xl w-full">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight mb-4 md:mb-6 leading-[1.1] md:leading-[1.1]"
            >
              Жезказган.<br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500"> В ритме города.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-200 mb-6 md:mb-8 font-light max-w-md mx-auto md:mx-0"
            >
              Умный гид по знаковым местам. Ищи, выбирай, вдохновляйся.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
            className="w-full max-w-lg bg-white/10 backdrop-blur-md p-1.5 md:p-2 rounded-3xl md:rounded-[2rem] border border-white/10 shadow-2xl"
          >
            <div className="bg-white rounded-2xl md:rounded-[1.5rem] flex items-center p-1.5 md:p-2">
              <Search className="text-slate-400 w-5 h-5 md:w-6 md:h-6 ml-3 md:ml-4 mr-1 md:mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Куда пойдем сегодня?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 px-1 md:py-4 md:px-2 bg-transparent focus:outline-none text-slate-900 text-base md:text-lg font-medium"
              />
              <button className="bg-slate-900 hover:bg-orange-600 text-white px-5 sm:px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold transition-all text-sm md:text-base">
                Найти
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full px-5 sm:px-6 md:px-12 lg:px-20 py-10 md:py-16">
        
        {/* Категории (Скроллятся на мобилках) */}
        <div className="flex overflow-x-auto hide-scrollbar pb-6 mb-6 md:pb-8 md:mb-8 gap-3 md:gap-4 justify-start border-b border-slate-200/60 -mx-5 px-5 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 md:gap-3 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-xl md:rounded-2xl font-bold whitespace-nowrap transition-all duration-300 text-sm md:text-base ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-200 hover:bg-orange-50'
                }`}
              >
                <Icon className={`w-4 h-4 md:w-5 md:h-5 ${isActive ? 'text-white' : 'text-orange-500'}`} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Сетка мест */}
        {filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredPlaces.map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-500 flex flex-col"
              >
                <div className="h-48 sm:h-56 overflow-hidden relative m-2 rounded-2xl md:rounded-[1.5rem]">
                  <img src={place.img} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg md:rounded-xl flex items-center gap-1.5 text-xs md:text-sm font-black text-slate-900 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {place.rating}
                  </div>
                </div>
                
                <div className="p-5 md:p-6 pt-3 md:pt-4 flex flex-col flex-grow">
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-1.5 md:mb-2 group-hover:text-orange-600 transition-colors line-clamp-1">
                    {place.name}
                  </h3>
                  <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed mb-4 md:mb-6 flex-grow line-clamp-3">
                    {place.desc}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 md:pt-5 mt-auto">
                    <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-bold text-slate-400">
                      <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-500 flex-shrink-0" />
                      <span className="truncate max-w-[120px] md:max-w-[140px]">{place.address}</span>
                    </div>
                    
                    <Link to={`/place/${place.id}`} className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-50 text-slate-900 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 md:py-32">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Ничего не найдено</h3>
            <p className="text-sm md:text-base text-slate-500">Попробуйте изменить запрос</p>
          </div>
        )}
      </section>
    </div>
  );
}