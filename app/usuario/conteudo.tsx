import LoadingPage from "@/components/LoadingPage";
import { UserPerfonal } from "@/services/userService";

export default function Conteudo({ users }: { users: UserPerfonal }) {
  if (!users.primeiro_nome || !users.email) {
    return <LoadingPage />;
  }
  return (
    <div id="container" className="bg-gray-50 py-5 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Meu Perfil</h1>
        <div className="flex flex-col">
          <span className="py-1">
            Nome Completo:{" "}
            <b>
              {users?.primeiro_nome} {users.segundo_nome}
            </b>
          </span>
          <span className="py-1">
            Telemovel: <b>{users?.telemovel}</b>
          </span>
          <span className="py-1">
            Email: <b>{users?.email}</b>
          </span>

          <span className="py-1">
            Curso: <b>{users?.curso}</b>
          </span>
        </div>
      </div>
    </div>
  );
}
