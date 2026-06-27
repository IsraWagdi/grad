'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ScanLine, ShieldCheck, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UploadCard } from '@/components/upload-card'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.12 }}
          className="relative"
        >
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="size-2 rounded-full bg-primary" />
            AI-powered karyotype analysis
          </motion.span>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Decode human chromosomes with{' '}
            <span className="text-primary">artificial intelligence</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            Upload a microscope karyotype image and ChromoAI detects every
            chromosome, labels each pair, and predicts associated genetic
            conditions in seconds.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button
              render={<Link href="/analyze" />}
              nativeButton={false}
              size="lg"
              className="rounded-full"
            >
              Start analysis
              <ArrowRight className="size-4" />
            </Button>
            <Button
              render={<Link href="/about" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="rounded-full"
            >
              How it works
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-2">
              <ScanLine className="size-4 text-primary" />
              YOLO detection
            </span>
            <span className="inline-flex items-center gap-2">
              <Activity className="size-4 text-primary" />
              Disease prediction
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              Research-grade
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -right-6 -top-6 hidden size-40 rounded-full bg-primary/10 blur-3xl lg:block" />
          <div className="relative mb-6 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xl shadow-primary/5">
            <Image
              src="/hero-chromosomes.png"
              alt="Illustration of human chromosomes analyzed by AI with detection boxes"
              width={900}
              height={560}
              priority
              className="h-auto w-full"
            />
          </div>
          <UploadCard />
        </motion.div>
      </div>
    </section>
  )
}
