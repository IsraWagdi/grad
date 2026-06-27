import Link from 'next/link'
import { Upload, Cpu, FileCheck2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload image',
    desc: 'Drag and drop a microscope karyotype image into the uploader.',
  },
  {
    icon: Cpu,
    step: '02',
    title: 'AI analysis',
    desc: 'YOLO detection and the classification model process the image.',
  },
  {
    icon: FileCheck2,
    step: '03',
    title: 'Review results',
    desc: 'Get an annotated image, detected count, prediction and confidence.',
  },
]

export function HowItWorks() {
  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Three steps to an analysis
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            No setup required. The workflow is designed to feel effortless.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.step}
              className="relative rounded-2xl border border-border/70 bg-card p-6"
            >
              <span className="absolute right-5 top-5 font-mono text-sm text-muted-foreground/60">
                {s.step}
              </span>
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <s.icon className="size-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-border/70 bg-primary px-6 py-10 text-center text-primary-foreground sm:px-10">
          <h3 className="text-balance text-2xl font-semibold sm:text-3xl">
            Ready to analyze your karyotype?
          </h3>
          <p className="max-w-md text-pretty text-primary-foreground/80">
            Upload an image and get a complete AI-generated analysis in seconds.
          </p>
          <Button
            render={<Link href="/analyze" />}
            size="lg"
            variant="secondary"
            className="mt-2 rounded-full"
          >
            Start analysis
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
