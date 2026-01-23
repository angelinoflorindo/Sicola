'use client'

import { useEffect, useState } from 'react'

export default function ContadorAcesso( {getFim}:{getFim:Date} ) {
  const [tempo, setTempo] = useState<number | null>(null)

  useEffect(() => {
    async function carregar() {
      const res = await fetch('/api/usuario/pagamento')
      const data = await res.json()

      if (!data.ativo) return

      const fim = new Date(data.fim).getTime()
      setTempo(fim - Date.now())
    }

    carregar()
  }, [])

  useEffect(() => {
    if (tempo === null) return

    const intervalo = setInterval(() => {
      setTempo(prev => {
        if (!prev || prev <= 1000) {
          clearInterval(intervalo)
          return 0
        }
        return prev - 1000
      })
    }, 1000)

    return () => clearInterval(intervalo)
  }, [tempo])

  if (tempo === null) return null

  const horas = Math.floor(tempo / (1000 * 60 * 60))
  const minutos = Math.floor((tempo / (1000 * 60)) % 60)
  const segundos = Math.floor((tempo / 1000) % 60)

  return (
    <div className="bg-yellow-100 text-black p-3 rounded text-sm">
      <strong>
        {' '}
        {horas}h {minutos}m {segundos}s
      </strong>
    </div>
  )
}
