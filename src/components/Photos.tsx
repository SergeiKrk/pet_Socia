import { useState, useEffect } from "react";
import { fetchPhotos } from "../services/api";
import type { Photo } from "../types/types";

export const Photos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    fetchPhotos().then((data) => setPhotos(data));
  }, []);

  return (
    <div>
      {photos.map((pht) => (
        <div key={pht.id}>
          <h3>{pht.title} - album #{pht.albumId}</h3>
          <img src={pht.url} alt={`${pht.title}-img-standart`}/>
          <img src={pht.thumbnailUrl} alt={`${pht.title}-img-mini`}/>
        </div>
      ))}
    </div>
  );
};