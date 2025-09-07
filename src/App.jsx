// App.jsx
import { useState } from "react";
import { Menu, X } from "lucide-react"; // hamburger & close icons
import videos from "./videos.json";

export default function App() {
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      {/* Mobile Navbar */}
      <div className="flex items-center justify-between p-4 bg-gray-800 md:hidden">
        <h1 className="text-lg font-bold"> PixelBoy Here</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 w-64 p-4 md:h-screen overflow-y-auto fixed md:static z-20 top-0 left-0 h-full transform transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-lg font-bold mb-4">📺 Other Videos</h2>
        <div className="space-y-3">
          {videos.map((video, i) => (
            <div
              key={i}
              onClick={() => {
                setCurrentVideo(video);
                setSidebarOpen(false); // close sidebar on mobile
              }}
              className={`cursor-pointer p-2 rounded-lg transition ${
                currentVideo.id === video.id
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              <p className="text-sm font-medium">{video.title}</p>
            </div>
          ))}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 mt-14 md:mt-0">
        {/* Video Embed */}
        <div className="aspect-video mb-4">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src={`https://www.youtube.com/embed/${currentVideo.youtubeId}`}
            title={currentVideo.title}
            allowFullScreen
          ></iframe>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-4">{currentVideo.title}</h1>

        {/* Notes / intro text */}
        {currentVideo.notes && (
          <p className="mb-4 text-gray-300 whitespace-pre-line">
            {currentVideo.notes}
          </p>
        )}

        {/* External Links */}
        <div className="flex flex-col gap-2 mb-6">
          {currentVideo.links.map((link, j) => (
            <a
              key={j}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-2 px-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Footer / ending message */}
        {currentVideo.footer && (
          <p className="text-center text-gray-400 mt-6">
            {currentVideo.footer}
          </p>
        )}
      </main>
    </div>
  );
}
