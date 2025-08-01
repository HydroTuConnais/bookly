import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { usePopup } from '@/components/context/popup-context';
import { useTheme } from '@/components/context/useTheme'; // Gestion du thème

export const Preview: React.FC = () => {
  const { openPopup } = usePopup();
  const { resolvedTheme } = useTheme(); // Récupère le thème actuel (light ou dark)

  // Références pour les vidéos
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const darkVideoRef = useRef<HTMLVideoElement>(null);

  // Code erreur
  const [lightVideoError, setLightVideoError] = useState(false);
  const [darkVideoError, setDarkVideoError] = useState(false);

  // Synchronisation des vidéos
  useEffect(() => {
    const lightVideo = lightVideoRef.current;
    const darkVideo = darkVideoRef.current;

    if (!lightVideo || !darkVideo) return;

    const syncVideos = () => {
      if (Math.abs(lightVideo.currentTime - darkVideo.currentTime) > 0.1) {
        darkVideo.currentTime = lightVideo.currentTime;
      }
    };

    const playHandler = () => {
      darkVideo.play();
    };

    const pauseHandler = () => {
      darkVideo.pause();
    };

    const timeUpdateHandler = () => {
      syncVideos();
    };

    // Ajout des événements à la vidéo claire
    lightVideo.addEventListener('play', playHandler);
    lightVideo.addEventListener('pause', pauseHandler);
    lightVideo.addEventListener('timeupdate', timeUpdateHandler);

    return () => {
      // Nettoyage des événements
      lightVideo.removeEventListener('play', playHandler);
      lightVideo.removeEventListener('pause', pauseHandler);
      lightVideo.removeEventListener('timeupdate', timeUpdateHandler);
    };
  }, []);

  // Relance la vidéo correcte lorsque le thème change
  useEffect(() => {
    const lightVideo = lightVideoRef.current;
    const darkVideo = darkVideoRef.current;

    if (resolvedTheme === 'light' && lightVideo) {
      lightVideo.play();
    } else if (resolvedTheme === 'dark' && darkVideo) {
      darkVideo.play();
    }
  }, [resolvedTheme]);

  const handleVideoError = (theme: string) => {
    if (theme === 'light') {
      setLightVideoError(true);
    } else {
      setDarkVideoError(true);
    }
    console.error(`Failed to load ${theme} theme video`);
  };

  return (
    <div className="flex flex-col items-center justify-between gap-12 px-6 py-12 mx-auto md:flex-row max-w-[63vw]">
      {/* Section gauche : Titre et bouton */}
      <div className="w-full text-center md:w-1/2 md:text-left">
        <p className="mb-6 text-3xl font-bold tracking-tight sm:text-5xl">
          Vos Idées, Documents, et Projets, en un seul endroit.
        </p>
        <Button
          size="sm"
          className="mx-auto md:mx-0"
          onClick={() => openPopup('login')}
        >
          Commencer Bookly
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Section droite : Vidéo */}
      <div className="relative flex justify-center w-full md:w-1/2 md:justify-end">
        <div
          className="absolute w-full h-[78vh] rounded-2xl border-[12px] z-20 border-[#f7f7f7] dark:border-[#2a2a2a]"
          style={{
            boxShadow:
              'rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px',
          }}
        />
        {lightVideoError && darkVideoError ? (
          <div className="w-full h-[80vh] flex items-center justify-center rounded-3xl animate-pulse bg-neutral-300 dark:bg-neutral-600">
          </div>
        ) : (
          <>
            <video
              ref={lightVideoRef}
              src="demo.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
              onError={() => handleVideoError('light')}
              className={`w-full h-[78vh] p-[10px] object-cover ${resolvedTheme === 'dark' ? 'hidden' : 'block'
                }`}
              style={{ clipPath: 'inset(0 0 0 2px)' }}
            />

            <video
              ref={darkVideoRef}
              src="demo-black.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
              onError={() => handleVideoError('dark')}
              className={`w-full h-[78vh] p-[10px] object-cover ${resolvedTheme === 'light' ? 'hidden' : 'block'
                }`}
              style={{ clipPath: 'inset(0 0 0 0)' }}
            />
          </>
        )}
      </div>
    </div>
  );
};
