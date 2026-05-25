// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // При запуске сайта проверяем, есть ли сохранённый юзер в памяти браузера
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('zhez_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Функция входа / регистрации
  const login = (name, email) => {
    const user = { name, email };
    setCurrentUser(user);
    localStorage.setItem('zhez_user', JSON.stringify(user)); // Сохраняем в браузер
  };

  // Функция выхода
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('zhez_user'); // Стираем из памяти браузера
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Кастомный хук для быстрого доступа к авторизации в любом файле
export const useAuth = () => useContext(AuthContext);