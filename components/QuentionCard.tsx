"use client";

interface Question {
  id: number;
  text: string;
}

export function QuestionCard({ question }: { question: Question }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <p className="font-medium mb-3">{question.text}</p>
      <textarea
        className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
        rows={5}
        placeholder="Escreva a sua resposta aqui..."
      />
    </div>
  );
}
