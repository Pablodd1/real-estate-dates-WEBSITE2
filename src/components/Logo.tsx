export function LogoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* House outline */}
      <path
        d="M24 4L4 20H10V42H20V30H28V42H38V20H44L24 4Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Heart inside */}
      <path
        d="M24 36C24 36 16 30 16 24C16 20.5 18.5 18 21 18C22.5 18 23.5 18.8 24 19.5C24.5 18.8 25.5 18 27 18C29.5 18 32 20.5 32 24C32 30 24 36 24 36Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon className="w-8 h-8 text-gold" />
      <div className="flex flex-col">
        <span className="font-script text-gold text-xl leading-none italic">
          Real Estate Dates
        </span>
        <span className="text-[8px] uppercase tracking-[0.1em] text-white/30 font-medium mt-1">
          realestatedates.net
        </span>
      </div>
    </div>
  );
}
