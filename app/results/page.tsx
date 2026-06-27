import type { Metadata } from 'next'
import { ResultsView } from '@/components/results/results-view'

export const metadata: Metadata = {
  title: 'Results — ChromoAI',
  description:
    'Detailed AI chromosome analysis report with annotated image, predicted condition, confidence and detection summary.',
}

export default function ResultsPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <ResultsView />
    </section>
  )
}
