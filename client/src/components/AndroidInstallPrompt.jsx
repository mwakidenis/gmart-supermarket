import { useEffect, useMemo, useState } from "react";

function AndroidInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  const isAndroid = useMemo(() => /android/i.test(navigator.userAgent), []);

  useEffect(() => {
    if (!isAndroid) {
      return;
    }

    const dismissed = sessionStorage.getItem("androidInstallPromptDismissed") === "true";
    if (dismissed) {
      return;
    }

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setVisible(true);
    };

    const handleInstalled = () => {
      setVisible(false);
      setDeferredPrompt(null);
      sessionStorage.setItem("androidInstallPromptDismissed", "true");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, [isAndroid]);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setVisible(false);
      sessionStorage.setItem("androidInstallPromptDismissed", "true");
    }

    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem("androidInstallPromptDismissed", "true");
  };

  if (!visible || !isAndroid) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[99999] md:left-auto md:right-4 md:w-[360px] bg-white border border-gray-200 rounded-xl shadow-xl p-4">
      <p className="text-sm font-semibold text-gray-900">Install GMart App</p>
      <p className="text-xs text-gray-600 mt-1">Get a faster Android experience by installing GMart on your device.</p>
      <div className="mt-3 flex gap-2 justify-end">
        <button
          type="button"
          onClick={handleDismiss}
          className="px-3 py-2 text-sm rounded-lg border border-gray-300 text-gray-700"
        >
          Not now
        </button>
        <button
          type="button"
          onClick={handleInstall}
          className="px-3 py-2 text-sm rounded-lg bg-green-600 text-white"
        >
          Install
        </button>
      </div>
    </div>
  );
}

export default AndroidInstallPrompt;
