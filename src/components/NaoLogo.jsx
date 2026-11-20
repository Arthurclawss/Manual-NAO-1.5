export default function NaoLogo({ size = "md" }) {
  const dimensions =
    size === "sm" ? "w-8 h-8 rounded-xl" : "w-10 h-10 rounded-2xl";

  return (
    <div
      className={`${dimensions} relative overflow-hidden bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/25 ring-1 ring-white/25 shrink-0`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 40 40"
        className="w-[78%] h-[78%] drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Orelhas / sensores laterais */}
        <rect x="4" y="16" width="4" height="9" rx="2" fill="#e0f2fe" />
        <rect x="32" y="16" width="4" height="9" rx="2" fill="#e0f2fe" />

        {/* Cabeça estilizada do NAO */}
        <rect x="7" y="8" width="26" height="24" rx="10" fill="#ffffff" />

        {/* Topo azul-marinho característico */}
        <path
          d="M9.5 15C10.8 10.5 14.8 8 20 8C25.2 8 29.2 10.5 30.5 15C27.2 13.4 23.7 12.7 20 12.7C16.3 12.7 12.8 13.4 9.5 15Z"
          fill="#0f172a"
        />

        {/* Arco sensor superior */}
        <path
          d="M15.5 10.7C17 10.1 18.5 9.8 20 9.8C21.5 9.8 23 10.1 24.5 10.7"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Olhos LED */}
        <circle cx="15" cy="21" r="3.1" fill="#0284c7" />
        <circle cx="15" cy="21" r="1.4" fill="#e0f2fe" />
        <circle cx="25" cy="21" r="3.1" fill="#0284c7" />
        <circle cx="25" cy="21" r="1.4" fill="#e0f2fe" />

        {/* Sensor inferior / detalhe laranja NAO */}
        <circle cx="20" cy="27.2" r="1.4" fill="#f97316" />
      </svg>
    </div>
  );
}

