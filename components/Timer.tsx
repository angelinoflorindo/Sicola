'use client'
import { useEffect, useState } from 'react'


interface TimerProps {
duration: number // segundos
onFinish: () => void
}


export function Timer({ duration, onFinish }: TimerProps) {
const [timeLeft, setTimeLeft] = useState(duration)


useEffect(() => {
if (timeLeft <= 0) {
onFinish()
return
}


const interval = setInterval(() => {
setTimeLeft(prev => prev - 1)
}, 1000)


return () => clearInterval(interval)
}, [timeLeft, onFinish])


const hours = Math.floor(timeLeft / 3600)
const minutes = Math.floor((timeLeft % 3600) / 60)
const seconds = timeLeft % 60


return (
<div className="bg-red-100 text-red-700 px-3 py-1 rounded font-semibold text-sm">
⏱ {hours.toString().padStart(2, '0')}:{minutes
.toString()
.padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
</div>
)
}