"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Video, User } from "@/types";
import Link from "next/link";

export default function VideoPage() {
  const params = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [comment, setComment] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setUser(JSON.parse(userData));
    }

    // Fetch video
    fetch(`/api/videos/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setVideo(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching video:", error);
        setLoading(false);
      });

    // Fetch comments
    fetch(`/api/videos/${params.id}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  }, [params.id]);

  const handleLike = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/videos/${params.id}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        // Update video likes count
        setVideo((prev) =>
          prev ? { ...prev, likesCount: prev.likesCount + 1 } : null
        );
      }
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/videos/${params.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: comment }),
      });
      if (res.ok) {
        const newComment = await res.json();
        setComments([newComment, ...comments]);
        setComment("");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  }

  if (!video) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Видео не найдено</h1>
        <Link href="/" className="text-indigo-600 hover:text-indigo-800">
          Вернуться на главную
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/" className="text-indigo-600 hover:text-indigo-800 mb-6 inline-block">
          ← Назад к ленте
        </Link>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="aspect-video bg-black">
            <video
              src={video.url}
              className="w-full h-full"
              controls
              autoPlay
              playsInline
            />
          </div>

          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
            <p className="text-gray-600 mb-4">{video.description}</p>

            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    {video.author.avatarUrl ? (
                      <img
                        src={video.author.avatarUrl}
                        alt={video.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500">
                        {video.author.name?.[0] || video.author.username?.[0] || "U"}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{video.author.name}</p>
                    <p className="text-sm text-gray-500">@{video.author.username}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
                >
                  <span>❤️</span>
                  <span>{video.likesCount}</span>
                </button>
                <span className="text-gray-500">{video.views} просмотров</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comments section */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Комментарии ({comments.length})</h2>

          {user && (
            <form onSubmit={handleComment} className="mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Написать комментарий..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-2"
                rows={3}
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Отправить
              </button>
            </form>
          )}

          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    {c.user.avatarUrl ? (
                      <img
                        src={c.user.avatarUrl}
                        alt={c.user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">
                        {c.user.name?.[0] || c.user.username?.[0] || "U"}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{c.user.name}</p>
                    <p className="text-xs text-gray-500">@{c.user.username}</p>
                  </div>
                </div>
                <p className="text-gray-700">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}