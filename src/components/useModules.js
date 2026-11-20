"use client";

import { useSyncExternalStore } from "react";
import { getInitialModules, loadModules, MODULE_STORAGE_EVENT, MODULE_STORAGE_KEY } from "@/data/moduleContent";

function subscribe(update) {
  function handleStorage(event) {
    if (event.key === null || event.key === MODULE_STORAGE_KEY) update();
  }
  window.addEventListener("storage", handleStorage);
  window.addEventListener(MODULE_STORAGE_EVENT, update);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(MODULE_STORAGE_EVENT, update);
  };
}

export function useModules() {
  return useSyncExternalStore(subscribe, loadModules, getInitialModules);
}
