export default function Card({ title, description }: { title: string; description: string }) {
return (
<div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
<h3 className="font-semibold text-lg">{title}</h3>
<p className="text-sm text-gray-600 mt-1">{description}</p>
</div>
)
}