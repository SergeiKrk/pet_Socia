import { useState, useEffect } from "react";
import { fetchAlbums } from "../services/api";
import type { Album } from "../types/types";

export const Albums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    fetchAlbums().then((data) => setAlbums(data));
  }, []);

  return (
    <div>
      {albums.map((alb) => (
        <div key={alb.id}>
          <h3>{alb.title} - user #{alb.userId}</h3>
        </div>
      ))}
    </div>
  );
};