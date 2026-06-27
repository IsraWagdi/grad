'use client'

import { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import {
  UploadCloud,
  ImageIcon,
  X,
  Sparkles,
  Loader2,
  FlaskConical,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { saveAnalysis, type PredictionResult } from '@/lib/analysis'

const MAX_SIZE_MB = 12

export function UploadCard({ className }: { className?: string }) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFile = useCallback((selected: File | null | undefined) => {
    if (!selected) return
    if (!selected.type.startsWith('image/')) {
      toast.error('Unsupported file', {
        description: 'Please upload a microscope image (PNG, JPG, or WEBP).',
      })
      return
    }
    if (selected.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error('File too large', {
        description: `Maximum image size is ${MAX_SIZE_MB} MB.`,
      })
      return
    }
    setFile(selected)
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(selected)
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      handleFile(e.dataTransfer.files?.[0])
    },
    [handleFile],
  )

  const reset = () => {
    setFile(null)
    setPreview(null)
    setProgress(0)
    if (inputRef.current) inputRef.current.value = ''
  }

  const analyze = async () => {
    if (!file || !preview) return
    setLoading(true)
    setProgress(8)

    const timer = setInterval(() => {
      setProgress((p) => (p < 90 ? p + Math.random() * 12 : p))
    }, 350)

    try {
      const body = new FormData()
      body.append('image', file)

      const res = await fetch('/api/predict', { method: 'POST', body })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error ?? `Request failed (${res.status}).`)
      }

      const data = (await res.json()) as PredictionResult
      setProgress(100)

      saveAnalysis({
        ...data,
        originalImage: preview,
        fileName: file.name,
        analyzedAt: new Date().toISOString(),
      })

      toast.success('Analysis complete', {
        description: `${data.chromosomes_detected} chromosomes detected.`,
      })

      setTimeout(() => router.push('/results'), 500)
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Something went wrong during analysis.'
      toast.error('Analysis failed', { description: message })
      setLoading(false)
      setProgress(0)
      clearInterval(timer)
      return
    }

    clearInterval(timer)
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-border/70 bg-card p-5 shadow-xl shadow-primary/5 sm:p-6',
        className,
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
          <FlaskConical className="size-5" />
        </span>
        <div>
          <h2 className="font-semibold leading-tight">Upload karyotype image</h2>
          <p className="text-sm text-muted-foreground">
            Drag &amp; drop or browse a microscope image
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.button
            key="dropzone"
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              'flex w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors',
              dragging
                ? 'border-primary bg-accent/60'
                : 'border-border hover:border-primary/50 hover:bg-muted/50',
            )}
          >
            <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
              <UploadCloud className="size-7" />
            </span>
            <span className="space-y-1">
              <span className="block font-medium">
                Drop your image here, or{' '}
                <span className="text-primary">browse</span>
              </span>
              <span className="block text-sm text-muted-foreground">
                PNG, JPG or WEBP up to {MAX_SIZE_MB} MB
              </span>
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border bg-muted">
              <Image
                src={preview || '/placeholder.svg'}
                alt="Selected karyotype preview"
                width={800}
                height={500}
                className="h-64 w-full object-contain"
                unoptimized
              />
              {!loading && (
                <button
                  type="button"
                  onClick={reset}
                  aria-label="Remove image"
                  className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur transition hover:bg-background"
                >
                  <X className="size-4" />
                </button>
              )}

              {loading && (
                <div className="absolute inset-0 grid place-items-center bg-background/55 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <span className="relative grid size-14 place-items-center">
                      <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
                      <span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
                        <Loader2 className="size-6 animate-spin" />
                      </span>
                    </span>
                    <p className="text-sm font-medium">
                      Running detection &amp; classification…
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ImageIcon className="size-4 shrink-0" />
              <span className="truncate">{file?.name}</span>
            </div>

            {loading && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-right text-xs text-muted-foreground">
                  {Math.round(progress)}%
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={analyze}
                disabled={loading}
                size="lg"
                className="flex-1 rounded-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    Analyze image
                  </>
                )}
              </Button>
              <Button
                onClick={reset}
                disabled={loading}
                variant="outline"
                size="lg"
                className="rounded-full"
              >
                Choose another
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
