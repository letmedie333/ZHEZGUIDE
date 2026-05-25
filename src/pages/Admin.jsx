import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Image, MapPin, Clock, Phone, AtSign, Eye } from 'lucide-react';

export default function Admin() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'eat',
    type: '',
    desc: '',
    full_desc: '',
    address: '',
    hours: '',
    phone: '',
    instagram: '',
    img: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Данные для отправки в базу:', formData);
    alert('Локация успешно подготовлена! (Здесь будет отправка в Firebase)');
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen pt-12 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto">
        
        {/* Заголовок */}
        <div className="mb-12 border-b border-slate-200 pb-6">
          <p className="text-orange-500 font-medium tracking-[0.2em] uppercase text-xs mb-2">Панель управления</p>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Новое место на карте</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* Главное инфо */}
          <section className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-4 border-b border-slate-100 pb-3">Основные данные</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Название локации</label>
                <input 
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  placeholder="Например: Coffee Room"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 text-slate-900 font-medium transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Категория</label>
                <select 
                  name="category" value={formData.category} onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 text-slate-900 font-medium transition-colors"
                >
                  <option value="eat">Гастрономия</option>
                  <option value="relax">Места для души</option>
                  <option value="fun">Шумные вечера</option>
                  <option value="sport">Активный отдых</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Точный тип (тег)</label>
                <input 
                  type="text" name="type" required value={formData.type} onChange={handleChange}
                  placeholder="Например: Спешелти кофейня, Коворкинг"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 text-slate-900 font-medium transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ссылка на обложку (URL)</label>
                <div className="relative">
                  <Image className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="url" name="img" required value={formData.img} onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-orange-500 text-slate-900 text-sm transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Краткое описание (для карточки)</label>
              <input 
                type="text" name="desc" required value={formData.desc} onChange={handleChange}
                placeholder="Одно предложение, отражающее суть места..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 text-slate-900 font-medium transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Полное журнальное описание (лонгрид)</label>
              <textarea 
                name="full_desc" required rows="4" value={formData.full_desc} onChange={handleChange}
                placeholder="Подробный рассказ о атмосфере, меню, особенностях локации..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 text-slate-900 font-medium transition-colors resize-none"
              ></textarea>
            </div>
          </section>

          {/* Практическая инфо */}
          <section className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-4 border-b border-slate-100 pb-3">Контакты и график</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Адрес</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="text" name="address" required value={formData.address} onChange={handleChange}
                    placeholder="ул. Сейфуллина, 15"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-orange-500 text-slate-900 font-medium transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Режим работы</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="text" name="hours" required value={formData.hours} onChange={handleChange}
                    placeholder="09:00 – 23:00"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-orange-500 text-slate-900 font-medium transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Телефон для связи</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="text" name="phone" value={formData.phone} onChange={handleChange}
                    placeholder="+7 (707) 123-4567"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-orange-500 text-slate-900 font-medium transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Социальные сети (Никнейм)</label>
                <div className="relative">
                  <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="text" name="instagram" value={formData.instagram} onChange={handleChange}
                    placeholder="@zhez_location"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-orange-500 text-slate-900 font-medium transition-colors"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Кнопка отправки */}
          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              className="bg-slate-900 text-white font-bold tracking-wide uppercase text-sm px-10 py-5 rounded-2xl hover:bg-orange-600 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Добавить на сайт
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}