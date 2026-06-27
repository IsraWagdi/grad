'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Dna,
  Microscope,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ConfidenceRing } from '@/components/results/confidence-ring'
import { ResultsSkeleton } from '@/components/results/results-skeleton'
import { loadAnalysis, clearAnalysis, type StoredAnalysis } from '@/lib/analysis'

export function ResultsView() {
  const [data, setData] = useState<StoredAnalysis | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setData(loadAnalysis())
    setReady(true)
  }, [])

  if (!ready) return <ResultsSkeleton />

  if (!data) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-5 rounded-3xl border border-border/70 bg-card px-6 py-16 text-center">
        <span className="grid size-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
          <Microscope className="size-7" />
        </span>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">No analysis found</h2>
          <p className="text-sm text-muted-foreground">
            Upload a karyotype image to generate a chromosome analysis report.
          </p>
        </div>
        <Button render={<Link href="/analyze" />} className="rounded-full">
          <Sparkles className="size-4" />
          Start an analysis
        </Button>
      </div>
    )
  }

  const isAbnormal = data.status.toLowerCase() === 'abnormal'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button
            render={<Link href="/analyze" />}
            variant="ghost"
            size="sm"
            className="mb-2 -ml-2 rounded-full text-muted-foreground"
          >
            <ArrowLeft className="size-4" />
            New analysis
          </Button>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Analysis report
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {data.fileName} ·{' '}
            {new Date(data.analyzedAt).toLocaleString(undefined, {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
        </div>
        <Badge
          variant="outline"
          className="w-fit gap-2 rounded-full border-primary/30 bg-accent px-3 py-1.5 text-accent-foreground"
        >
          <span className="size-2 rounded-full bg-primary" />
          Analysis complete
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card className="overflow-hidden rounded-3xl border-border/70">
          <CardHeader className="flex-row items-center gap-2 space-y-0">
            <Microscope className="size-5 text-primary" />
            <CardTitle className="text-base">Annotated image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-2xl border border-border bg-muted">
              <Image
                src={data.annotated_image || '/placeholder.svg'}
                alt="Annotated karyotype with detected chromosomes and bounding boxes"
                width={1000}
                height={700}
                unoptimized
                className="h-auto w-full object-contain"
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Bounding boxes mark detected chromosomes with their predicted
              labels.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card
            className={`rounded-3xl ${isAbnormal ? 'border-destructive/40' : 'border-primary/40'}`}
          >
            <CardHeader className="flex-row items-center gap-2 space-y-0">
              <Dna className="size-5 text-primary" />
              <CardTitle className="text-base">Prediction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Predicted condition
                  </p>
                  <p className="text-xl font-semibold leading-tight">
                    {data.predicted_disease}
                  </p>
                  <StatusBadge isAbnormal={isAbnormal} status={data.status} />
                </div>
                <ConfidenceRing value={data.confidence} />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border/70">
            <CardHeader>
              <CardTitle className="text-base">Detected chromosomes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-4xl font-semibold tabular-nums">
                    {data.chromosomes_detected}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    chromosomes detected
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="rounded-full px-3 py-1 font-mono"
                >
                  expected 46
                </Badge>
              </div>
              <Separator />
              <Stat
                label="Detection status"
                value={
                  data.chromosomes_detected === 46
                    ? 'Typical count'
                    : 'Atypical count'
                }
              />
              <Stat
                label="Classification status"
                value={data.status}
                emphasis={isAbnormal ? 'danger' : 'ok'}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="rounded-3xl border-border/70">
        <CardHeader>
          <CardTitle className="text-base">Analysis summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-pretty leading-relaxed text-muted-foreground">
            ChromoAI detected{' '}
            <span className="font-medium text-foreground">
              {data.chromosomes_detected} chromosomes
            </span>{' '}
            in the uploaded karyotype image and classified the sample as{' '}
            <span className="font-medium text-foreground">{data.status}</span>{' '}
            with a predicted condition of{' '}
            <span className="font-medium text-foreground">
              {data.predicted_disease}
            </span>{' '}
            at{' '}
            <span className="font-medium text-foreground">
              {Math.round(data.confidence * 100)}%
            </span>{' '}
            confidence.{' '}
            {isAbnormal
              ? 'An atypical pattern was identified — clinical confirmation by a qualified geneticist is recommended.'
              : 'The pattern appears typical, though clinical review is always advised.'}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              render={<Link href="/analyze" onClick={() => clearAnalysis()} />}
              className="rounded-full"
            >
              <RotateCcw className="size-4" />
              Analyze another image
            </Button>
            <Button
              render={<Link href="/about" />}
              variant="outline"
              className="rounded-full"
            >
              About this project
            </Button>
          </div>
          <p className="rounded-xl bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
            Disclaimer: ChromoAI is a research tool and not a substitute for a
            professional medical diagnosis.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function StatusBadge({
  isAbnormal,
  status,
}: {
  isAbnormal: boolean
  status: string
}) {
  return (
    <span
      className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        isAbnormal
          ? 'bg-destructive/10 text-destructive'
          : 'bg-primary/10 text-primary'
      }`}
    >
      {isAbnormal ? (
        <AlertTriangle className="size-3.5" />
      ) : (
        <CheckCircle2 className="size-3.5" />
      )}
      {status}
    </span>
  )
}

function Stat({
  label,
  value,
  emphasis,
}: {
  label: string
  value: string
  emphasis?: 'ok' | 'danger'
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={`font-medium ${
          emphasis === 'danger'
            ? 'text-destructive'
            : emphasis === 'ok'
              ? 'text-primary'
              : 'text-foreground'
        }`}
      >
        {value}
      </span>
    </div>
  )
}
