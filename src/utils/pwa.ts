import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Check if running in standalone mode (already installed on phone)
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(isStandaloneMode);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for Service Worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) {
          setSwRegistration(reg);
          if (reg.waiting) {
            setHasUpdate(true);
          }
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setHasUpdate(true);
                }
              });
            }
          });
        }
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const checkForUpdates = async (): Promise<boolean> => {
    setIsCheckingUpdate(true);
    try {
      if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg) {
          setSwRegistration(reg);
          await reg.update();
          if (reg.waiting) {
            setHasUpdate(true);
            setIsCheckingUpdate(false);
            return true;
          }
        }
      }
    } catch {
      // offline or network error
    }
    await new Promise((r) => setTimeout(r, 1000));
    setIsCheckingUpdate(false);
    return false;
  };

  const updateApp = () => {
    if (swRegistration?.waiting) {
      swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
  };

  const promptInstall = async () => {
    if (!deferredPrompt) return false;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
      setDeferredPrompt(null);
      return true;
    }
    return false;
  };

  return {
    isInstallable,
    isStandalone,
    hasUpdate,
    isCheckingUpdate,
    checkForUpdates,
    updateApp,
    promptInstall
  };
};
