import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ScanLine,
  Brain,
  ServerCog,
  Code2,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'About — ChromoAI',
  description:
    'About the ChromoAI project: an AI platform for human chromosome disease detection combining YOLO detection and deep learning classification.',
}

const pipeline = [
  {
    icon: ScanLine,
    title: 'YOLO chromosome detection',
    desc: 'A YOLO object-detection model localizes each chromosome in the karyotype image and produces labeled bounding boxes.',
  },
  {
    icon: Brain,
    title: 'Disease prediction model',
    desc: 'A deep learning classifier analyzes the detected chromosome layout to predict associated genetic conditions with a confidence score.',
  },
  {
    icon: ServerCog,
    title: 'Python inference backend',
    desc: 'Models are served from a FastAPI / Flask backend exposing POST /api/predict, which returns the annotated image and structured results.',
  },
]

const stack = ['Next.js', 'React', 'TailwindCSS', 'shadcn/ui', 'Framer Motion']

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="mx-auto w-full max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="size-2 rounded-full bg-primary" />
            About the project
          </span>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Human chromosome disease detection, powered by AI
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            ChromoAI is a research platform that brings automated karyotype
            analysis to the browser. It pairs computer vision with deep learning
            to detect chromosomes and surface potential genetic conditions from a
            single microscope image.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            How the pipeline works
          </h2>
          <p className="mt-3 text-muted-foreground">
            Two AI models run in sequence behind a single request.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pipeline.map((p) => (
            <Card key={p.title} className="rounded-2xl border-border/70">
              <CardContent className="space-y-3 p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <p.icon className="size-5" />
                </span>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <Card className="rounded-3xl border-border/70">
            <CardHeader className="flex-row items-center gap-2 space-y-0">
              <Code2 className="size-5 text-primary" />
              <CardTitle className="text-base">API contract</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The frontend sends the image as{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                  multipart/form-data
                </code>{' '}
                to{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                  POST /api/predict
                </code>
                . The backend responds with:
              </p>
              <pre className="overflow-x-auto rounded-xl border border-border bg-muted/60 p-4 font-mono text-xs leading-relaxed">
                <code>{`{
  "annotated_image": "...",
  "predicted_disease": "Down Syndrome",
  "confidence": 0.98,
  "chromosomes_detected": 46,
  "status": "Abnormal"
}`}</code>
              </pre>
              <p className="text-xs text-muted-foreground">
                Set the{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono">
                  CHROMO_BACKEND_URL
                </code>{' '}
                environment variable to proxy requests to your Python backend.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-3xl border-border/70">
              <CardHeader>
                <CardTitle className="text-base">Built with</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-destructive/30">
              <CardHeader className="flex-row items-center gap-2 space-y-0">
                <ShieldAlert className="size-5 text-destructive" />
                <CardTitle className="text-base">Medical disclaimer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  ChromoAI is developed for research and educational purposes. It
                  is not a medical device and must not be used as a substitute
                  for diagnosis by a qualified genetic specialist.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-border/70 bg-primary px-6 py-12 text-center text-primary-foreground">
          <h2 className="text-balance text-2xl font-semibold sm:text-3xl">
            Try the analyzer
          </h2>
          <p className="max-w-md text-primary-foreground/80">
            Upload a karyotype image and see the full ChromoAI workflow in
            action.
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
      </section>
    </div>
  )
}
