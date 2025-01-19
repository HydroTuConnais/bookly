import React, { useRef, useEffect } from 'react';
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

  return (
    <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto py-12 px-6 gap-12">
      {/* Section gauche : Titre et bouton */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <p className="text-3xl font-bold tracking-tight sm:text-5xl mb-6">
          Vos Idées, Documents, et Projets, en un seul endroit.
        </p>
        <Button
          size="sm"
          className="mx-auto md:mx-0"
          onClick={() => openPopup('login')}
        >
          Commencer Bookly
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Section droite : Vidéo */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
        <div
          className="absolute w-full h-[878px] rounded-2xl border-[1vh] z-20 border-[#f7f7f7] dark:border-[#2a2a2a]"
          style={{
            boxShadow:
              'rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px',
          }}
        />
        <div className="relative w-full z-10 h-auto rounded-3xl overflow-hidden">
          {/* Vidéo claire */}
          <video
            ref={lightVideoRef}
            src="/demo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-auto p-[10px] object-cover ${
              resolvedTheme === 'dark' ? 'hidden' : 'block'
            }`}
            style={{ clipPath: 'inset(0 0 0 2px)' }}
          />
          {/* Vidéo sombre */}
          <video
            ref={darkVideoRef}
            src="/demo-black.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-auto p-[10px] object-cover ${
              resolvedTheme === 'light' ? 'hidden' : 'block'
            }`}
            style={{ clipPath: 'inset(0 0 17px 0)' }}
          />
        </div>
      </div>
    </div>
  );
};
