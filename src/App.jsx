import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Импорт компонентов
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

// Импорт страниц
import Home from './pages/Home';
import About from './pages/About';
import PlaceDetail from './pages/PlaceDetail';
import Admin from './pages/Admin';
import History from './pages/History';

export default function App() {
  return (
    <AuthProvider> {/* Обертка глобальной авторизации */}
      <BrowserRouter> {/* Оставляем только ОДИН роутер */}
        
        {/* Главный контейнер сайта */}
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-blue-200 selection:text-blue-900">
          
          {/* Наш новый вынесенный Навбар */}
          <Navbar />

          {/* Динамический контент страниц */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/place/:id" element={<PlaceDetail />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>

          {/* Футер */}
          <footer className="bg-white border-t border-slate-200 py-8 text-center text-sm font-medium text-slate-400 mt-auto">
            <p>&copy; {new Date().getFullYear()} ZhezGuide. Разработано с душой.</p>
            <p className="mt-1">Жезказган, Улытауская область.</p>
          </footer>

        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}