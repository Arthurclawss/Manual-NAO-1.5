"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import {
  Check,
  Move,
  Pencil,
  RotateCcw,
  Trash2,
  Upload,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  AVATAR_CHANGE_EVENT,
  AVATAR_STORAGE_KEY,
  DEFAULT_AVATAR_RAW,
  PRESET_AVATARS,
  parseAvatarValue,
  saveAvatarValue,
} from "@/data/profileAvatars";

const PREVIEW_SIZE = 224;
const OUTPUT_SIZE = 256;

function subscribeAvatar(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(AVATAR_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AVATAR_CHANGE_EVENT, callback);
  };
}

function getAvatarSnapshot() {
  try {
    return window.localStorage.getItem(AVATAR_STORAGE_KEY) || DEFAULT_AVATAR_RAW;
  } catch {
    return DEFAULT_AVATAR_RAW;
  }
}

function getServerSnapshot() {
  return DEFAULT_AVATAR_RAW;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function clampOffset(value, dispSize) {
  const max = Math.max(0, (dispSize - PREVIEW_SIZE) / 2);
  return Math.max(-max, Math.min(max, value));
}

export default function UserAvatar({ size = "lg", editable = false }) {
  const rawAvatar = useSyncExternalStore(
    subscribeAvatar,
    getAvatarSnapshot,
    getServerSnapshot
  );
  const avatar = parseAvatarValue(rawAvatar);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);

  // Estado do enquadramento da foto
  const [cropDraft, setCropDraft] = useState(null); // { src, natW, natH }
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragStateRef = useRef(null);
  const cropImgRef = useRef(null);

  const preset =
    PRESET_AVATARS.find((item) => item.id === avatar.id) || PRESET_AVATARS[0];
  const PresetIcon = preset.icon;

  const sizes = {
    sm: { boxClass: "size-10 rounded-xl", iconSize: 20 },
    md: { boxClass: "size-14 rounded-2xl", iconSize: 28 },
    lg: { boxClass: "size-20 rounded-2xl", iconSize: 34 },
  };
  const { boxClass, iconSize } = sizes[size] ?? sizes.lg;

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Escolha um arquivo de imagem válido.");
      return;
    }

    try {
      setUploadError("");
      const src = await readFileAsDataUrl(file);
      const img = new window.Image();
      img.onload = () => {
        setCropDraft({ src, natW: img.naturalWidth, natH: img.naturalHeight });
        setZoom(1);
        setOffset({ x: 0, y: 0 });
      };
      img.onerror = () => setUploadError("Não foi possível carregar essa imagem.");
      img.src = src;
    } catch {
      setUploadError("Não foi possível carregar essa imagem.");
    }
  }

  const baseScale = cropDraft
    ? Math.max(PREVIEW_SIZE / cropDraft.natW, PREVIEW_SIZE / cropDraft.natH)
    : 1;
  const dispW = cropDraft ? cropDraft.natW * baseScale * zoom : PREVIEW_SIZE;
  const dispH = cropDraft ? cropDraft.natH * baseScale * zoom : PREVIEW_SIZE;

  function handleZoomChange(nextZoom) {
    const clampedZoom = Math.max(1, Math.min(3, nextZoom));
    if (!cropDraft) return;
    const nextW = cropDraft.natW * baseScale * clampedZoom;
    const nextH = cropDraft.natH * baseScale * clampedZoom;
    setZoom(clampedZoom);
    setOffset((prev) => ({
      x: clampOffset(prev.x, nextW),
      y: clampOffset(prev.y, nextH),
    }));
  }

  function handlePointerDown(event) {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStateRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
    };
  }

  function handlePointerMove(event) {
    if (!dragStateRef.current) return;
    const dx = event.clientX - dragStateRef.current.startX;
    const dy = event.clientY - dragStateRef.current.startY;
    setOffset({
      x: clampOffset(dragStateRef.current.originX + dx, dispW),
      y: clampOffset(dragStateRef.current.originY + dy, dispH),
    });
  }

  function handlePointerUp() {
    dragStateRef.current = null;
  }

  function applyCroppedPhoto() {
    const imgEl = cropImgRef.current;
    if (!imgEl || !cropDraft) return;

    const canvas = document.createElement("canvas");
    canvas.width = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ratio = OUTPUT_SIZE / PREVIEW_SIZE;
    const drawW = dispW * ratio;
    const drawH = dispH * ratio;
    const drawX = (OUTPUT_SIZE - drawW) / 2 + offset.x * ratio;
    const drawY = (OUTPUT_SIZE - drawH) / 2 + offset.y * ratio;

    ctx.drawImage(imgEl, drawX, drawY, drawW, drawH);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
    saveAvatarValue({ type: "photo", dataUrl });
    setCropDraft(null);
    setPickerOpen(false);
  }

  return (
    <div className="relative inline-block shrink-0">
      <div
        className={`${boxClass} overflow-hidden flex items-center justify-center text-white shadow-md ${
          avatar.type === "photo"
            ? "bg-neutral-200 dark:bg-neutral-700"
            : `bg-gradient-to-br ${preset.gradient}`
        }`}
      >
        {avatar.type === "photo" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatar.dataUrl}
            alt="Foto do usuário"
            className="w-full h-full object-cover"
          />
        ) : (
          <PresetIcon size={iconSize} />
        )}
      </div>

      {editable && (
        <>
          <button
            type="button"
            onClick={() => {
              setUploadError("");
              setPickerOpen((prev) => !prev);
            }}
            aria-label="Editar ícone do perfil"
            aria-expanded={pickerOpen}
            title="Alterar ícone ou foto"
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:text-sky-600 dark:hover:text-sky-400 shadow-md flex items-center justify-center transition-transform hover:scale-110"
          >
            <Pencil size={13} />
          </button>

          {pickerOpen && (
            <div
              role="dialog"
              aria-label="Escolher ícone ou foto do perfil"
              className="absolute left-0 top-full mt-3 z-50 w-72 max-w-[calc(100vw-3.25rem)] p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <strong className="text-sm font-extrabold text-neutral-900 dark:text-white">
                  Escolha seu avatar
                </strong>
                <button
                  type="button"
                  aria-label="Fechar seletor de avatar"
                  onClick={() => setPickerOpen(false)}
                  className="p-1 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {PRESET_AVATARS.map((item) => {
                  const Icon = item.icon;
                  const isSelected = avatar.type === "preset" && avatar.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      title={item.label}
                      aria-label={`Ícone ${item.label}`}
                      onClick={() => {
                        saveAvatarValue({ type: "preset", id: item.id });
                        setPickerOpen(false);
                      }}
                      className={`h-11 rounded-xl bg-gradient-to-br ${item.gradient} text-white flex items-center justify-center transition-transform hover:scale-105 ${
                        isSelected
                          ? "ring-2 ring-offset-2 ring-sky-500 dark:ring-offset-neutral-900"
                          : "opacity-85 hover:opacity-100"
                      }`}
                    >
                      <Icon size={20} />
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Upload size={14} />
                  Enviar minha foto
                </button>

                {avatar.type === "photo" && (
                  <button
                    type="button"
                    onClick={() => {
                      saveAvatarValue({ type: "preset", id: "robot" });
                      setPickerOpen(false);
                    }}
                    className="w-full py-2 px-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Trash2 size={13} />
                    Remover foto
                  </button>
                )}

                {uploadError && (
                  <p className="text-xs text-rose-500 font-medium">{uploadError}</p>
                )}
              </div>
            </div>
          )}

          {/* Modal de enquadramento da foto */}
          {cropDraft && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Enquadrar foto do perfil"
              className="fixed inset-0 z-[950] bg-black/65 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-2xl p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white">
                      Enquadrar foto
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1 mt-0.5">
                      <Move size={12} />
                      Arraste a imagem e ajuste o zoom
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Cancelar enquadramento"
                    onClick={() => setCropDraft(null)}
                    className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Área de corte 224x224 */}
                <div
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  style={{ width: PREVIEW_SIZE, height: PREVIEW_SIZE }}
                  className="relative mx-auto rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border-2 border-sky-500 cursor-grab active:cursor-grabbing touch-none select-none shadow-inner"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={cropImgRef}
                    src={cropDraft.src}
                    alt="Prévia do enquadramento"
                    draggable={false}
                    style={{
                      width: dispW,
                      height: dispH,
                      maxWidth: "none",
                      maxHeight: "none",
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
                    }}
                  />
                  {/* Grade sutil de guia */}
                  <div
                    className="pointer-events-none absolute inset-0 border border-white/25"
                    aria-hidden="true"
                  />
                </div>

                {/* Controle de Zoom */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Diminuir zoom"
                      onClick={() => handleZoomChange(zoom - 0.15)}
                      className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    >
                      <ZoomOut size={16} />
                    </button>
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.05}
                      value={zoom}
                      aria-label="Zoom da foto"
                      onChange={(e) => handleZoomChange(Number(e.target.value))}
                      className="flex-1 accent-sky-500 cursor-pointer"
                    />
                    <button
                      type="button"
                      aria-label="Aumentar zoom"
                      onClick={() => handleZoomChange(zoom + 0.15)}
                      className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    >
                      <ZoomIn size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <span>Zoom: {zoom.toFixed(2)}x</span>
                    <button
                      type="button"
                      onClick={() => {
                        setZoom(1);
                        setOffset({ x: 0, y: 0 });
                      }}
                      className="inline-flex items-center gap-1 font-bold text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      <RotateCcw size={12} />
                      Centralizar
                    </button>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setCropDraft(null)}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={applyCroppedPhoto}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm inline-flex items-center justify-center gap-1.5 shadow-md transition-colors"
                  >
                    <Check size={16} />
                    Aplicar foto
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
