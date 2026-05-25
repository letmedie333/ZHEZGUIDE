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
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <img 
            src="https://jezkazgan.vision.kz/wp-content/uploads/2025/12/jezkazgan.jpg" 
            alt="Жезказган" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.1]"
            >
              Жезказган.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">В ритме города.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-xl text-slate-200 mb-8 font-light"
            >
              Умный гид по знаковым местам. Ищи, выбирай, вдохновляйся.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
            className="w-full max-w-lg bg-white/10 backdrop-blur-md p-2 rounded-[2rem] border border-white/10 shadow-2xl"
          >
            <div className="bg-white rounded-[1.5rem] flex items-center p-2">
              <Search className="text-slate-400 w-6 h-6 ml-4 mr-2" />
              <input
                type="text"
                placeholder="Куда пойдем сегодня?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-4 px-2 bg-transparent focus:outline-none text-slate-900 text-lg font-medium"
              />
              <button className="bg-slate-900 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all">
                Найти
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full px-6 md:px-12 lg:px-20 py-16">
        
        {/* Категории */}
        <div className="flex overflow-x-auto hide-scrollbar pb-8 mb-8 gap-4 justify-start border-b border-slate-200/60">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-200 hover:bg-orange-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-orange-500'}`} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Сетка мест */}
        {filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPlaces.map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 flex flex-col"
              >
                <div className="h-60 overflow-hidden relative m-2 rounded-[1.5rem]">
                  <img src={place.img} alt={place.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-sm font-black text-slate-900 shadow-lg">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {place.rating}
                  </div>
                </div>
                
                <div className="p-6 pt-4 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {place.name}
                  </h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6 flex-grow">
                    {place.desc}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-auto">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span className="truncate max-w-[140px]">{place.address}</span>
                    </div>
                    
                    <Link to={`/place/${place.id}`} className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 text-slate-900 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Ничего не найдено</h3>
            <p className="text-slate-500">Попробуйте изменить запрос</p>
          </div>
        )}
      </section>
    </div>
  );
}
