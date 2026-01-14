// import { Pergunta } from "@/lib/perguntas";
//  { pergunta }: { pergunta: Pergunta }

export function QuestionCard() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between mb-2 text-sm text-gray-500">
   
        <span>Questão </span>
        <span> valor(es)</span>
      </div>

      <p className="mb-3"> -- Aqui vai o texto da pergunta ---  </p>

      <div className="flex gap-4">
        <label>
          <input type="radio" name="" /> Verdadeiro
        </label>
        <label>
          <input type="radio" name="" /> Falso
        </label>
      </div>
    </div>
  )
}
