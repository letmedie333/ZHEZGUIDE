import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Импорт компонентов и контекста
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

// ОПТИМИЗАЦИЯ: Ленивая загрузка страниц (Lazy Loading).
// Код страницы загружается только тогда, когда пользователь на нее переходит.
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const PlaceDetail = lazy(() => import('./pages/PlaceDetail'));
const Admin = lazy(() => import('./pages/Admin'));
const History = lazy(() => import('./pages/History'));

// Компонент-заглушка на время подгрузки (красивый спиннер)
const PageLoader = () => (
  <div className="flex-grow flex items-center justify-center min-h-[50vh]">
    <div className="w-10 h-10 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        
        {/* Главный контейнер с фирменным выделением текста (orange) */}
        <div className="min-h-screen bg-[#F9F9F9] text-slate-800 font-sans flex flex-col selection:bg-orange-200 selection:text-orange-900">
          
          <Navbar />

          {/* Динамический контент страниц */}
          <main className="flex-grow flex flex-col relative">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/place/:id" element={<PlaceDetail />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/history" element={<History />} />
              </Routes>
            </Suspense>
          </main>

          {/* Футер */}
          <footer className="bg-white border-t border-slate-200 py-8 text-center text-sm font-medium text-slate-400 mt-auto relative z-10">
            <p>&copy; {new Date().getFullYear()} ZhezGuide. Разработано с душой.</p>
            <p className="mt-1">Жезказган, Улытауская область.</p>
          </footer>

        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}