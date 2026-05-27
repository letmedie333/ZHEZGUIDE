import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Phone, AtSign, Star, Info, MessageSquare, Send, Lock, Navigation, ExternalLink } from 'lucide-react';
import { PLACES_DATA } from '../data/places';
import { INITIAL_REVIEWS } from '../data/reviews';
import { useAuth } from '../context/AuthContext';

export default function PlaceDetail() {
  const { id } = useParams();
  const placeId = parseInt(id);
  const place = PLACES_DATA.find(p => p.id === placeId);
  
  const { currentUser } = useAuth(); 
  const isAuth = !!currentUser;

  // --- СОСТОЯНИЯ ---
  const [isMapMenuOpen, setIsMapMenuOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  // --- ЛОГИКА ОТЗЫВОВ (С ПАМЯТЬЮ) ---
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem(`zhez_reviews_${placeId}`);
    if (savedReviews) return JSON.parse(savedReviews);
    return INITIAL_REVIEWS[placeId] || [];
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [placeId]); 

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9]">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Локация не найдена</h2>
          <Link to="/" className="text-orange-500 font-bold hover:underline">Вернуться на главную</Link>
        </div>
      </div>
    );
  }

  // --- ОБРАБОТЧИКИ СОБЫТИЙ ---
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuth) return;

    const review = {
      id: Date.now(),
      author: currentUser.name, 
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
      rating: newRating,
      text: newComment.trim()
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`zhez_reviews_${placeId}`, JSON.stringify(updatedReviews));

    setNewComment('');
    setNewRating(5);
  };

  const handleOpenMap = (provider) => {
    const searchQuery = `${place.name}, ${place.address}, Жезказган`;
    const encodedQuery = encodeURIComponent(searchQuery);

    if (provider === '2gis') {
      window.open(`https://2gis.kz/zhezkazgan/search/${encodedQuery}`, '_blank');
    } else if (provider === 'google') {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedQuery}`, '_blank');
    }
    setIsMapMenuOpen(false);
  };

  // --- ВЫЧИСЛЕНИЯ ---
  const totalReviewsCount = (place.reviews || 0) + reviews.length - (INITIAL_REVIEWS[placeId] ? INITIAL_REVIEWS[placeId].length : 0);

  return (
    <div className="bg-[#F9F9F9] min-h-screen pb-16 md:pb-20">
      
      {/* КНОПКА НАЗАД */}
      <div className="fixed top-24 sm:top-28 left-4 sm:left-6 md:left-12 lg:left-20 z-30">
        <Link to="/" className="flex items-center gap-2 bg-white/90 backdrop-blur-md p-2.5 sm:p-3 rounded-full shadow-xl border border-slate-100 hover:bg-orange-500 hover:text-white transition-all group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* HERO СЕКЦИЯ */}
      <section className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] relative overflow-hidden">
        <img src={place.img} alt={place.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 w-full px-5 sm:px-6 md:px-12 lg:px-20 pb-10 sm:pb-12 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="bg-orange-500 text-white px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-sm">{place.type}</span>
            <div className="flex items-center gap-1 sm:gap-1.5 text-white bg-white/20 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400 border-none" />
              {place.rating} ({totalReviewsCount} отзывов)
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight sm:tracking-tighter leading-tight">
            {place.name}
          </motion.h1>
        </div>
      </section>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <main className="w-full px-5 sm:px-6 md:px-12 lg:px-20 pt-10 sm:pt-12 md:pt-16 flex flex-col lg:flex-row gap-10 lg:gap-20">
        
        {/* ЛЕВАЯ КОЛОНКА (Описание и Галерея) - На мобилках идет второй */}
        <div className="flex-grow max-w-4xl order-2 lg:order-1">
          <section className="mb-12 sm:mb-16">
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-orange-500 mb-6 sm:mb-8 flex items-center gap-2"><Info className="w-4 h-4" /> О локации</h2>
            <p className="text-xl sm:text-2xl md:text-3xl text-slate-900 font-medium leading-tight mb-6 sm:mb-8">{place.desc}</p>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-light">{place.full_desc}</p>
          </section>

          {place.gallery && place.gallery.length > 0 && (
            <section className="mb-16 sm:mb-20">
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-orange-500 mb-6 sm:mb-8">Галерея</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {place.gallery.map((img, i) => (
                  <div key={i} className="aspect-square overflow-hidden bg-slate-100 rounded-2xl sm:rounded-3xl">
                    <img src={img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Галерея" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* СЕКЦИЯ ОТЗЫВОВ */}
          <section className="border-t border-slate-200 pt-12 sm:pt-16">
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-orange-500 mb-8 sm:mb-10 flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Отзывы посетителей</h2>

            {/* Блок написания отзыва */}
            {isAuth ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-100 shadow-sm mb-10 sm:mb-12">
                <div className="flex items-center gap-3 sm:gap-4 mb-6">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 leading-none">{currentUser.name}</p>
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-1">Оставляете отзыв авторизованно</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmitReview}>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider mr-2 sm:mr-4">Оценка:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setNewRating(star)} className="focus:outline-none transition-transform hover:scale-110">
                        <Star className={`w-6 h-6 sm:w-8 sm:h-8 ${star <= newRating ? 'fill-orange-400 text-orange-400' : 'text-slate-200'}`} />
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <textarea 
                      rows="3" 
                      value={newComment} 
                      onChange={(e) => setNewComment(e.target.value)} 
                      placeholder="Расскажите о вашем визите..." 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 sm:py-4 sm:px-5 pr-14 sm:pr-16 focus:outline-none focus:border-orange-500 text-slate-900 font-medium text-sm transition-colors resize-none"
                    ></textarea>
                    <button type="submit" disabled={!newComment.trim()} className="absolute right-2 sm:right-3 bottom-2 sm:bottom-4 p-2.5 sm:p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 disabled:opacity-50">
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <div className="bg-slate-50 p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 border-dashed text-center mb-10 sm:mb-12 flex flex-col items-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-sm">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Только честные отзывы</h3>
                <p className="text-sm sm:text-base text-slate-500 mb-4 sm:mb-6 max-w-md">Чтобы исключить накрутку плохих оценок, оставлять отзывы могут только зарегистрированные пользователи.</p>
                <p className="text-[10px] sm:text-sm font-semibold text-orange-500 uppercase tracking-wider">Войдите в систему через верхнее меню сайта</p>
              </div>
            )}

            {/* Список отзывов */}
            <div className="space-y-4 sm:space-y-6">
              <AnimatePresence>
                {reviews.map((review) => (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} key={review.id} className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-full flex items-center justify-center text-base sm:text-lg font-bold text-slate-900">
                          {review.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-sm sm:text-base text-slate-900">{review.author}</div>
                          <div className="text-xs sm:text-sm text-slate-400 font-medium">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex gap-0.5 sm:gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < review.rating ? 'fill-orange-400 text-orange-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{review.text}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {reviews.length === 0 && (
                <p className="text-slate-400 text-sm sm:text-base text-center py-6 sm:py-8 font-medium bg-white rounded-2xl sm:rounded-3xl border border-slate-100 border-dashed">
                  Пока нет отзывов. Будьте первым!
                </p>
              )}
            </div>
          </section>
        </div>

        {/* ПРАВАЯ КОЛОНКА (Сайдбар) - На мобилках идет первой */}
        <aside className="w-full lg:w-[400px] flex-shrink-0 order-1 lg:order-2">
          <div className="sticky top-28 sm:top-32 space-y-8 sm:space-y-10">
            <div className="bg-slate-50 p-6 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-100 relative">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 sm:mb-8 tracking-tight">Информация</h3>
              
              <div className="space-y-6 sm:space-y-8">
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-orange-500 flex-shrink-0"><MapPin className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                  <div><p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Адрес</p><p className="text-sm sm:text-base text-slate-900 font-semibold">{place.address}</p></div>
                </div>
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-orange-500 flex-shrink-0"><Clock className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                  <div><p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Режим работы</p><p className="text-sm sm:text-base text-slate-900 font-semibold">{place.hours}</p></div>
                </div>
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-orange-500 flex-shrink-0"><Phone className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                  <div><p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Связь</p><p className="text-sm sm:text-base text-slate-900 font-semibold">{place.phone}</p></div>
                </div>
                {place.instagram && (
                  <div className="flex gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-orange-500 flex-shrink-0"><AtSign className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                    <div><p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Соц. сети</p><p className="text-sm sm:text-base text-slate-900 font-semibold">{place.instagram}</p></div>
                  </div>
                )}
              </div>

              {/* МЕНЮ ПОСТРОЕНИЯ МАРШРУТА */}
              <div className="mt-8 sm:mt-12 relative">
                <button 
                  onClick={() => setIsMapMenuOpen(!isMapMenuOpen)} 
                  className="w-full bg-slate-900 text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold hover:bg-orange-600 transition-all shadow-xl shadow-slate-900/10 flex justify-center items-center gap-2 group"
                >
                  <Navigation className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-1 transition-transform" /> Построить маршрут
                </button>

                <AnimatePresence>
                  {isMapMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                      animate={{ opacity: 1, y: 0, scale: 1 }} 
                      exit={{ opacity: 0, y: 10, scale: 0.95 }} 
                      className="absolute bottom-full left-0 w-full mb-3 bg-white border border-slate-100 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden z-20"
                    >
                      <button onClick={() => handleOpenMap('2gis')} className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 group">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-black text-[10px] sm:text-xs">2G</div>
                          <span className="font-bold text-slate-900 text-xs sm:text-sm">Открыть в 2GIS</span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300 group-hover:text-green-500 transition-colors" />
                      </button>

                      <button onClick={() => handleOpenMap('google')} className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-slate-50 transition-colors group">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-[10px] sm:text-xs">G</div>
                          <span className="font-bold text-slate-900 text-xs sm:text-sm">Google Карты</span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}