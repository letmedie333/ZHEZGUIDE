import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

// Данные для таймлайна (чтобы код был чище)
const HISTORY_DATA = [
  {
    year: '1928',
    title: 'Медное сердце Степи',
    desc: 'Начинается масштабная разведка полезных ископаемых. Выдающийся геолог Каныш Сатпаев доказывает, что в недрах Жезказгана скрываются одни из крупнейших в мире запасов меди. Эта дата становится точкой отсчета для будущего промышленного гиганта.',
    img: 'https://iapn.kz/upload/medialibrary/3cb/3cb8ac342fa5cee681d03a35f4fcc6d1.jpg',
  },
  {
    year: '1954',
    title: 'Рождение города',
    desc: 'Рабочий поселок Большой Джезказган официально получает статус города. Начинается бурное строительство инфраструктуры, возводятся первые капитальные дома, школы и больницы. Город становится центром притяжения для специалистов со всего Союза.',
    img: 'https://informburo.kz/storage/photos/139/6582b956ab3da.jpg',
  },
  {
    year: '1952',
    title: 'Кенгирское водохранилище',
    desc: 'Для обеспечения водой растущего промышленного региона было построено Кенгирское водохранилище. Сегодня это не только стратегический объект, но и любимое место отдыха горожан, где провожают самые красивые закаты.',
    img: 'https://liter.kz/cache/imagine/1200/uploads/news/2025/02/21/67b80fa7c640b662459964.jpg',
  },
  {
    year: 'С 1960-х',
    title: 'Космическая гавань',
    desc: 'Степи вокруг Жезказгана становятся главной посадочной площадкой для спускаемых аппаратов с космонавтами на борту. Именно наш город часто первым встречает героев Земли после их возвращения с орбиты.',
    img: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1000&q=80',
  },
  {
    year: '2022',
    title: 'Центр Улытауской области',
    desc: 'Жезказган получает новый импульс к развитию, став административным центром новообразованной Улытауской области. Город обретает второе дыхание, обновляется инфраструктура и открываются новые перспективы.',
    img: 'https://tengrinews.kz/userdata/u395/2022-07/resize/42aa42481f6935bba8be0e27dbd713c1.jpeg',
  }
];

export default function History() {
  // Сброс скролла при входе на страницу
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F9F9F9] min-h-screen pb-32">
      
      {/* Заголовок страницы */}
      <section className="w-full px-6 md:px-12 lg:px-20 pt-32 pb-16 max-w-5xl mx-auto text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-orange-500 font-bold tracking-[0.3em] uppercase text-sm mb-6"
        >
          Сквозь время
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight"
        >
          История <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">Жезказгана</span>
        </motion.h1>
      </section>

      {/* Анимированный таймлайн */}
      <section className="w-full px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        <div className="space-y-32">
          {HISTORY_DATA.map((block, index) => {
            // Чередуем расположение текста и картинки (слева-справа)
            const isEven = index % 2 === 0;

            return (
              <div 
                key={index} 
                className={`flex flex-col gap-10 md:gap-20 items-center ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Текстовая часть (Выплывает снизу при скролле) */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }} // Анимация сработает, когда блок появится на экране
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full md:w-1/2"
                >
                  <p className="text-6xl md:text-8xl font-black text-slate-200 mb-4 tracking-tighter">
                    {block.year}
                  </p>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">{block.title}</h2>
                  <p className="text-lg text-slate-600 leading-relaxed font-light">
                    {block.desc}
                  </p>
                </motion.div>

                {/* Фотография (Плавно проявляется и увеличивается) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="w-full md:w-1/2 aspect-[4/3] overflow-hidden bg-slate-200 rounded-[2rem] shadow-2xl shadow-slate-200/50"
                >
                  <img 
                    src={block.img} 
                    alt={block.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}