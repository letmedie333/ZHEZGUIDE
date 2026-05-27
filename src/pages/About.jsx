import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Bus, Heart, Phone } from 'lucide-react';

export default function About() {
  // Автоматическая прокрутка наверх при открытии страницы
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Настройки для плавной анимации элементов при загрузке
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen pb-16 md:pb-24">
      
      {/* Главный типографический блок */}
      <section className="w-full px-5 sm:px-6 md:px-12 lg:px-20 pt-24 pb-12 lg:pt-40 lg:pb-24 max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-orange-500 font-medium tracking-[0.3em] uppercase text-xs sm:text-sm mb-4 sm:mb-6 flex items-center gap-3">
            <span className="w-6 sm:w-8 h-[2px] bg-orange-500"></span>
            О проекте
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8 sm:mb-10">
            Больше, чем <br className="hidden sm:block" />
            просто <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">город.</span>
          </h1>
        </motion.div>
        
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 border-t border-slate-200 pt-8 md:pt-12"
        >
          <div className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-900 leading-snug">
            Жезказган — это медная столица, сердце Улытау и город с несгибаемым характером.
          </div>
          <div className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
            <p className="mb-4 sm:mb-6">
              Мы создали <strong>ZhezGuide</strong>, чтобы показать город с новой стороны. Это не просто сухой справочник, а живой кураторский проект. Мы собираем здесь эстетичные кофейни, уютные парки, современные спортзалы и места, где кипит жизнь.
            </p>
            <p>
              Наш гид помогает гостям ориентироваться, а местным жителям — заново влюбляться в родные улицы.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Фото-вставка на всю ширину (Анимация при скролле) */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-[40vh] min-h-[300px] sm:min-h-[400px] mb-16 md:mb-24 overflow-hidden relative"
      >
        <img 
          src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=2000&q=80" 
          alt="Городская архитектура" 
          className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-slate-900/10"></div>
      </motion.section>

      {/* Блок со справочной информацией */}
      <section className="w-full px-5 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Левая колонка (Выезжает слева) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:w-1/3"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3 md:mb-4">
              Городская справка
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mb-6 md:mb-8 font-light">
              Самые важные контакты, которые всегда должны быть под рукой.
            </p>
            <div className="bg-orange-50 p-6 sm:p-8 rounded-3xl border border-orange-100">
              <Heart className="w-8 h-8 text-orange-500 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Хотите добавить своё место?</h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">Напишите нам, и мы включим вашу локацию в следующий релиз гида.</p>
              <a 
                 href="https://wa.me/77772927382?text=Здравствуйте!%20Хочу%20добавить%20своё%20место%20в%20ZhezGuide." 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-block text-xs sm:text-sm font-black uppercase tracking-widest text-orange-600 border-b-2 border-orange-600 pb-1 hover:text-orange-700 transition-colors"
                  >
                 Связаться в WhatsApp
                </a>
            </div>
          </motion.div>

          {/* Правая колонка с карточками (Появляются по очереди) */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group cursor-default"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors text-slate-400">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">Служба спасения</h4>
              <p className="text-xl sm:text-2xl font-black text-slate-900">112</p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">Единый номер экстренных служб</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group cursor-default"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors text-slate-400">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">Полиция</h4>
              <p className="text-xl sm:text-2xl font-black text-slate-900">102</p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">Дежурная часть города</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group cursor-default"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors text-slate-400">
                <Bus className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">Автовокзал</h4>
              <p className="text-lg sm:text-xl font-bold text-slate-900">+7 (7102) 72-40-09</p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">Справочная служба и билеты</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group cursor-default"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors text-slate-400">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">Справочная 109</h4>
              <p className="text-lg sm:text-xl font-bold text-slate-900">iKomek</p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">Служба оперативного реагирования</p>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}