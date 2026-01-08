import Card from '@/components/ui/Card'


export default function Resultados() {
return (
<section>
<h2 className="text-xl font-bold mb-4">Resultados</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<Card title="Matemática I" description="Nota: 15/20" />
<Card title="Estatística" description="Nota: 13/20" />
</div>
</section>
)
}