export function TaskHallSectionHeader() {
  return (
    <div className="flex items-end">
      <h3 className="flex items-center gap-1 text-[17px] font-bold leading-tight text-brand-blue-deep">
        <span className="relative inline-block">
          热门
          <svg
            className="pointer-events-none absolute -bottom-0.5 left-0 h-[7px] w-[2.1em] text-brand-blue"
            viewBox="0 0 48 8"
            fill="none"
            aria-hidden
          >
            <path
              d="M2 6C14 2 26 2 46 5"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.35"
            />
          </svg>
        </span>
        任务
      </h3>
    </div>
  )
}
