import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 60

type PredictionResponse = {
  annotated_image: string
  predicted_disease: string
  confidence: number
  chromosomes_detected: number
  status: string
}

// Sample classes used when no live Python backend is configured.
const SAMPLE_PREDICTIONS: Omit<PredictionResponse, 'annotated_image'>[] = [
  { predicted_disease: 'Normal Karyotype (46,XY)', confidence: 0.97, chromosomes_detected: 46, status: 'Normal' },
  { predicted_disease: 'Down Syndrome (Trisomy 21)', confidence: 0.98, chromosomes_detected: 47, status: 'Abnormal' },
  { predicted_disease: 'Turner Syndrome (45,X)', confidence: 0.94, chromosomes_detected: 45, status: 'Abnormal' },
  { predicted_disease: 'Klinefelter Syndrome (47,XXY)', confidence: 0.95, chromosomes_detected: 47, status: 'Abnormal' },
  { predicted_disease: 'Edwards Syndrome (Trisomy 18)', confidence: 0.92, chromosomes_detected: 47, status: 'Abnormal' },
]

export async function POST(request: Request) {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json(
      { error: 'Invalid multipart/form-data request.' },
      { status: 400 },
    )
  }

  const file = formData.get('image') ?? formData.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: 'No image file provided. Attach it under the "image" field.' },
      { status: 400 },
    )
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json(
      { error: 'Uploaded file must be an image.' },
      { status: 415 },
    )
  }

  // If a real Python backend (FastAPI/Flask) is configured, proxy to it.
  const backendUrl = process.env.CHROMO_BACKEND_URL
  if (backendUrl) {
    try {
      const proxyForm = new FormData()
      proxyForm.append('image', file, file.name)
      const upstream = await fetch(
        `${backendUrl.replace(/\/$/, '')}/api/predict`,
        { method: 'POST', body: proxyForm },
      )
      if (!upstream.ok) {
        return NextResponse.json(
          { error: `Backend responded with status ${upstream.status}.` },
          { status: 502 },
        )
      }
      const data = (await upstream.json()) as PredictionResponse
      return NextResponse.json(data)
    } catch {
      return NextResponse.json(
        { error: 'Could not reach the analysis backend.' },
        { status: 502 },
      )
    }
  }

  // No backend configured: return a representative mock response.
  // The original upload is echoed back as the "annotated" image so the UI
  // can render the full results flow during development.
  const bytes = Buffer.from(await file.arrayBuffer())
  const dataUrl = `data:${file.type};base64,${bytes.toString('base64')}`

  const index = bytes.length % SAMPLE_PREDICTIONS.length
  const prediction = SAMPLE_PREDICTIONS[index]

  // Simulate model processing latency.
  await new Promise((resolve) => setTimeout(resolve, 1400))

  return NextResponse.json({
    annotated_image: dataUrl,
    ...prediction,
  } satisfies PredictionResponse)
}
