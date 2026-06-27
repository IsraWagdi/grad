import {
  ScanLine,
  Brain,
  Gauge,
  Layers,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: ScanLine,
    title: 'Precise chromosome detection',
    desc: 'A YOLO object-detection model localizes every chromosome and draws labeled bounding boxes across the karyotype.',
  },
  {
    icon: Brain,
    title: 'Disease classification',
    desc: 'A deep learning classifier interprets the detected layout to predict associated genetic conditions.',
  },
  {
    icon: Gauge,
    title: 'Confidence scoring',
    desc: 'Every prediction ships with a calibrated confidence score so you can gauge reliability at a glance.',
  },
  {
    icon: Layers,
    title: 'Per-chromosome labels',
    desc: 'Chromosome names are rendered above each box, making the annotated output easy to review.',
  },
  {
    icon: Zap,
    title: 'Results in seconds',
    desc: 'Optimized inference returns an annotated image and a full report almost instantly.',
  },
  {
    icon: ShieldCheck,
    title: 'Built for research',
    desc: 'Designed as a clinical research aid with a clean, auditable, and transparent workflow.',
  },
]

export function Features() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          A complete chromosome analysis pipeline
        </h2>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          From raw microscope image to a fully annotated diagnostic summary, two
          AI models work together behind a simple interface.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Card
            key={f.title}
            className="rounded-2xl border-border/70 transition-shadow hover:shadow-lg hover:shadow-primary/5"
          >
            <CardContent className="space-y-3 p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                <f.icon className="size-5" />
              </span>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
