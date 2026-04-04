"use client";

import { useEffect } from "react";

const CRISP_WEBSITE_ID = "85c201bc-1b3c-4a80-ac0f-195c05ef7c8b";

export function CrispChat() {
  useEffect(() => {
    (window as any).$crisp = [];
    (window as any).CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;

    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
