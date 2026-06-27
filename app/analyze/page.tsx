import type { Metadata } from 'next'
import { Lightbulb, ImageIcon, ListChecks } from 'lucide-react'
import { UploadCard } from '@/components/upload-card'

export const metadata: Metadata = {
  title: 'Analyze — ChromoAI',
  description:
    'Upload a karyotype microscope image and run AI-powered chromosome detection and disease prediction.',
}

const tips = [
  {
    icon: ImageIcon,
    title: 'Use a clear image',
    desc: 'Sharp, well-lit microscope karyotype images produce the most accurate detections.',
  },
  {
    icon: ListChecks,
    title: 'Full karyotype spread',
    desc: 'Include all chromosomes in frame so the detector can count every pair.',
  },
  {
    icon: Lightbulb,
    title: 'Supported formats',
    desc: 'PNG, JPG and WEBP up to 12 MB are accepted by the analyzer.',
  },
]

export default function AnalyzePage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 grid-pattern opacity-40 [mask-image:linear-gradient(black,transparent)]" />
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="size-2 rounded-full bg-primary" />
            Chromosome analyzer
          </span>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Analyze a karyotype image
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Upload your microscope image below. ChromoAI will detect chromosomes
            and predict associated conditions, then take you to a detailed
            report.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[1.4fr_1fr]">
          <UploadCard className="h-fit" />

          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Tips for best results
            </h2>
            {tips.map((tip) => (
              <div
                key={tip.title}
                className="flex gap-4 rounded-2xl border border-border/70 bg-card p-5"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <tip.icon className="size-5" />
                </span>
                <div className="space-y-1">
                  <h3 className="font-medium">{tip.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {tip.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
