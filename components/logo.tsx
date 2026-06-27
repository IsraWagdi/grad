import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2.5 font-semibold', className)}
      aria-label="ChromoAI home"
    >
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-5"
          aria-hidden="true"
        >
          <path
            d="M7 4c0 4 10 6 10 8s-10 4-10 8M17 4c0 4-10 6-10 8s10 4 10 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="text-lg tracking-tight">
        Chromo<span className="text-primary">AI</span>
      </span>
    </Link>
  )
}
