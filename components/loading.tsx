import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-50">
      <div className="text-center">
        <Loader2 className="mx-auto w-16 h-16 animate-spin text-blue-600 mb-4" />
      </div>
    </div>
  )
}

