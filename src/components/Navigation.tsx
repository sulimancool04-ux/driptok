"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@/types";

export default function Navigation() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          DripTok
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link
                href="/upload"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Загрузить
              </Link>
              <Link href="/profile" className="text-gray-700 hover:text-gray-900">
                Профиль
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-gray-900"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 hover:text-gray-900">
                Войти
              </Link>
              <Link href="/register" className="text-gray-700 hover:text-gray-900">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}