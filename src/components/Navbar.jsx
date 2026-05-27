import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, User, Menu, X, ArrowRight, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; 

export default function Navbar() {
  const location = useLocation();
  const { currentUser, login, logout } = useAuth(); 
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const isHome = location.pathname === '/';
  const isActive = (path) => location.pathname === path;

  // ОПТИМИЗАЦИЯ: Закрываем меню при переходе на новую страницу
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // ОПТИМИЗАЦИЯ: Блокируем скролл фона, если открыто меню или модалка
  useEffect(() => {
    if (isMobileMenuOpen || isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen, isModalOpen]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    setFormData({ name: '', email: '', password: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalName = authMode === 'register' 
      ? formData.name 
      : formData.email.split('@')[0];

    login(finalName, formData.email); 
    setIsModalOpen(false);
    setFormData({ name: '', email: '', password: '' });
  };

  // Логика прозрачности: если мы на главной И меню закрыто - шапка прозрачная
  const isTransparent = isHome && !isMobileMenuOpen;

  const navLinks = [
    { path: '/', label: 'Главная' },
    { path: '/about', label: 'О городе' },
    { path: '/history', label: 'История' }
  ];

  return (
    <>
      <nav className={`w-full z-40 transition-all duration-300 ${isTransparent ? 'absolute top-0 bg-transparent border-b border-white/10 text-white' : 'sticky top-0 bg-white border-b border-slate-200/60 text-slate-900 shadow-sm'}`}>
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="flex justify-between items-center h-24">
            
            <Link to="/" className="flex items-center gap-2 group z-50 relative">
              <Compass className={`w-7 h-7 transition-colors ${isTransparent ? 'text-white' : 'text-slate-900'}`} strokeWidth={2.5} />
              <span className={`text-2xl font-bold tracking-widest uppercase transition-colors ${isTransparent ? 'text-white' : 'text-slate-900'}`}>ZhezGuide</span>
            </Link>

            {/* Десктопные ссылки */}
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className={`text-sm font-semibold tracking-wide uppercase transition-all relative pb-2 ${isActive(link.path) ? (isTransparent ? 'text-white font-bold' : 'text-orange-600 font-bold') : (isTransparent ? 'text-white/70 hover:text-white' : 'text-slate-500 hover:text-slate-900')}`}>
                  {link.label} {isActive(link.path) && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>}
                </Link>
              ))}
            </div>

            {/* Десктопный профиль + Мобильный бургер */}
            <div className="flex items-center gap-6 z-50 relative">
              {currentUser ? (
                <div className="hidden md:flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <span className={`font-semibold text-sm tracking-wide ${isTransparent ? 'text-white' : 'text-slate-900'}`}>
                      {currentUser.name}
                    </span>
                  </div>
                  <button onClick={logout} className={`p-2 rounded-full transition-colors ${isTransparent ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-slate-400 hover:text-red-500 hover:bg-red-50'}`}>
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button onClick={() => setIsModalOpen(true)} className={`hidden md:flex items-center gap-2 transition-colors font-semibold text-sm tracking-wide uppercase ${isTransparent ? 'text-white hover:text-orange-400' : 'text-slate-700 hover:text-orange-600'}`}>
                  <User className="w-4 h-4" /> Войти
                </button>
              )}
              
              {/* Бургер меню */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`md:hidden p-2 transition-colors ${isTransparent ? 'text-white' : 'text-slate-900'}`}>
                {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ВЫПАДАЮЩЕЕ МОБИЛЬНОЕ МЕНЮ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            className="fixed inset-0 z-30 bg-white pt-28 px-6 pb-6 flex flex-col md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-6 flex-grow">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className={`text-2xl font-black uppercase tracking-wide ${isActive(link.path) ? 'text-orange-500' : 'text-slate-900'}`}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-slate-100">
              {currentUser ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-xl text-slate-900 tracking-wide">{currentUser.name}</span>
                  </div>
                  <button onClick={logout} className="w-full flex items-center justify-center gap-2 p-4 rounded-xl text-red-500 bg-red-50 hover:bg-red-100 font-bold transition-colors">
                    <LogOut className="w-5 h-5" /> Выйти
                  </button>
                </div>
              ) : (
                <button onClick={() => { setIsMobileMenuOpen(false); setIsModalOpen(true); }} className="w-full bg-slate-900 text-white p-4 rounded-xl font-bold tracking-wide uppercase flex items-center justify-center gap-2 active:scale-95 transition-transform">
                  <User className="w-5 h-5" /> Войти в профиль
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ТВОЯ ОРИГИНАЛЬНАЯ МОДАЛКА (Без изменений) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-10">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors"><X className="w-6 h-6" /></button>
              <p className="text-orange-500 font-medium tracking-[0.2em] uppercase text-xs mb-2">{authMode === 'login' ? 'Авторизация' : 'Новый akкаунт'}</p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-8">{authMode === 'login' ? 'С возвращением.' : 'Присоединяйтесь.'}</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                {authMode === 'register' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ваше имя</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Алихан" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 focus:outline-none focus:border-orange-500 text-slate-900 font-medium text-sm" />
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="hello@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 focus:outline-none focus:border-orange-500 text-slate-900 font-medium text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Пароль</label>
                  <input type="password" name="password" required value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 focus:outline-none focus:border-orange-500 text-slate-900 font-medium text-sm" />
                </div>
                <button type="submit" className="w-full bg-slate-900 text-white font-bold tracking-wide uppercase text-sm py-5 rounded-2xl hover:bg-orange-600 transition-colors flex justify-center items-center gap-2 group mt-6">
                  {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
              <div className="mt-8 text-center text-sm font-medium text-slate-500">
                {authMode === 'login' ? 'Ещё нет аккаунта?' : 'Уже есть аккаунт?'}
                <button type="button" onClick={toggleAuthMode} className="text-orange-500 hover:text-orange-600 font-bold ml-1">{authMode === 'login' ? 'Создать' : 'Войти'}</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}