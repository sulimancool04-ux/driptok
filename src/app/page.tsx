"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, Video } from "@/types";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
       
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setUser(JSON.parse(userData));
    }

    // Fetch videos
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setLoading(false);
      });
  }, []);



  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">Загрузка...</div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Пока нет видео</h2>
            {user && (
              <Link
                href="/upload"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
              >
                Загрузить первое видео
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Link
                href={`/video/${video.id}`}
                key={video.id}
                className="bg-white rounded-lg shadow overflow-hidden block hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gray-200">
                  <video
                    src={video.url}
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>@{video.author.username}</span>
                    <span className="mx-2">•</span>
                    <span>{video.views} просмотров</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}