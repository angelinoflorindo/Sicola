'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  getFim: Date | string
}

export default function ContadorAcesso({ getFim }: Props) {
  const router = useRouter()
  const [tempo, setTempo] = useState<number>(0)

  useEffect(() => {
    const fim = new Date(getFim).getTime()

    const tick = () => {
      const restante = fim - Date.now()

      if (restante <= 0) {
        setTempo(0)
        expirarAcesso()
        return
      }

      setTempo(restante)
    }

    tick()
    const intervalo = setInterval(tick, 1000)

    return () => clearInterval(intervalo)
  }, [getFim])

  async function expirarAcesso() {
    try {
      await fetch('/api/usuario/pagamento/acesso/expirar', {
        method: 'POST',
      })
    } finally {
      router.replace('/usuario/pagamentos')
    }
  }

  if (tempo <= 0) {
    return (
      <div className="rounded-lg bg-red-100 text-red-700 px-4 py-3 text-sm font-semibold shadow">
        ⛔ Acesso expirado
      </div>
    )
  }

  // 🔢 Cálculos
  const totalSegundos = Math.floor(tempo / 1000)
  const dias = Math.floor(totalSegundos / 86400)
  const horas = Math.floor((totalSegundos % 86400) / 3600)
  const minutos = Math.floor((totalSegundos % 3600) / 60)
  const segundos = totalSegundos % 60

  const mostrarDias = dias >= 2

  return (
    <div  className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-yellow-100 to-amber-100 px-5 py-3 shadow-md">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-white font-bold">
        ⏳
      </div>

      <div className="text-sm text-yellow-900">
        <div className="font-semibold">Tempo restante</div>

        <div className="mt-1 font-mono text-base tracking-wide">
          {mostrarDias && (
            <span>{String(dias).padStart(2, '0')}d </span>
          )}

          <span>{String(horas).padStart(2, '0')}h </span>
          <span>{String(minutos).padStart(2, '0')}m </span>
          <span>{String(segundos).padStart(2, '0')}s</span>
        </div>
      </div>
    </div>
  )
}
