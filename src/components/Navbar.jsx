// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, User, Menu, X, ArrowRight, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; // Импортируем наш хук

export default function Navbar() {
  const location = useLocation();
  const { currentUser, login, logout } = useAuth(); // Забираем глобальные функции
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const isHome = location.pathname === '/';
  const isActive = (path) => location.pathname === path;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    setFormData({ name: '', email: '', password: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Определяем имя: либо из инпута регистрации, либо вырезаем из почты
    const finalName = authMode === 'register' 
      ? formData.name 
      : formData.email.split('@')[0];

    login(finalName, formData.email); // Вызываем глобальный вход!
    setIsModalOpen(false);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <>
      <nav className={`w-full z-40 transition-all duration-300 ${isHome ? 'absolute top-0 bg-transparent border-b border-white/10 text-white' : 'sticky top-0 bg-white border-b border-slate-200/60 text-slate-900 shadow-sm'}`}>
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="flex justify-between items-center h-24">
            
            <Link to="/" className="flex items-center gap-2 group">
              <Compass className={`w-7 h-7 transition-colors ${isHome ? 'text-white' : 'text-slate-900'}`} strokeWidth={2.5} />
              <span className={`text-2xl font-bold tracking-widest uppercase transition-colors ${isHome ? 'text-white' : 'text-slate-900'}`}>ZhezGuide</span>
            </Link>

            <div className="hidden md:flex items-center gap-12">
              <Link to="/" className={`text-sm font-semibold tracking-wide uppercase transition-all relative pb-2 ${isActive('/') ? (isHome ? 'text-white font-bold' : 'text-orange-600 font-bold') : (isHome ? 'text-white/70 hover:text-white' : 'text-slate-500 hover:text-slate-900')}`}>
                Главная {isActive('/') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>}
              </Link>
              <Link to="/about" className={`text-sm font-semibold tracking-wide uppercase transition-all relative pb-2 ${isActive('/about') ? (isHome ? 'text-white font-bold' : 'text-orange-600 font-bold') : (isHome ? 'text-white/70 hover:text-white' : 'text-slate-500 hover:text-slate-900')}`}>
                О городе {isActive('/about') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>}
              </Link>
              <Link to="/history" className={`text-sm font-semibold tracking-wide uppercase transition-all relative pb-2 ${isActive('/history') ? (isHome ? 'text-white font-bold' : 'text-orange-600 font-bold') : (isHome ? 'text-white/70 hover:text-white' : 'text-slate-500 hover:text-slate-900')}`}>
                История {isActive('/history') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>}
              </Link>
            </div>

            <div className="flex items-center gap-6">
              {currentUser ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <span className={`font-semibold text-sm tracking-wide ${isHome ? 'text-white' : 'text-slate-900'}`}>
                      {currentUser.name}
                    </span>
                  </div>
                  <button onClick={logout} className={`p-2 rounded-full transition-colors ${isHome ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-slate-400 hover:text-red-500 hover:bg-red-50'}`}>
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button onClick={() => setIsModalOpen(true)} className={`hidden md:flex items-center gap-2 transition-colors font-semibold text-sm tracking-wide uppercase ${isHome ? 'text-white hover:text-orange-400' : 'text-slate-700 hover:text-orange-600'}`}>
                  <User className="w-4 h-4" /> Войти
                </button>
              )}
              <button className={`md:hidden p-2 ${isHome ? 'text-white' : 'text-slate-900'}`}><Menu className="w-7 h-7" /></button>
            </div>

          </div>
        </div>
      </nav>

      {/* Модалка остается прежней */}
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