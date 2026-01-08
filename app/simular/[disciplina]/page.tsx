'use client'
import { Timer } from '@/components/Timer'
import { QuestionCard } from '@/components/QuentionCard'
import { useRouter } from 'next/navigation'


export default function Simular({ params }: { params: { disciplina: string } }) {
const router = useRouter()


function finalizar() {
alert('Prova finalizada!')
router.push('/resultados')
}


return (
<section className="max-w-3xl mx-auto">
<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
<h2 className="font-bold text-lg">{decodeURIComponent(params.disciplina)}</h2>
<Timer duration={2 * 60 * 60} onFinish={finalizar} />
</div>


<QuestionCard question={{ id: 1, text: 'Questão de exemplo da disciplina.' }} />


<button onClick={finalizar} className="mt-6 w-full bg-blue-700 text-white py-3 rounded">
Submeter Prova
</button>
</section>
)
}