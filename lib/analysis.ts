export type PredictionResult = {
  annotated_image: string
  predicted_disease: string
  confidence: number
  chromosomes_detected: number
  status: 'Normal' | 'Abnormal' | string
}

export type StoredAnalysis = PredictionResult & {
  originalImage: string
  fileName: string
  analyzedAt: string
}

const STORAGE_KEY = 'chromoai:last-analysis'

export function saveAnalysis(data: StoredAnalysis) {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // ignore quota / serialization errors
  }
}

export function loadAnalysis(): StoredAnalysis | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as StoredAnalysis) : null
  } catch {
    return null
  }
}

export function clearAnalysis() {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(STORAGE_KEY)
}
