import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import DashBoardContent from "./conteudo"; 
import styles from "@/modules/login.module.css"

export default function Dashboard() {
  return (
    <div className={styles.section} >
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4 md:p-8">
          <DashBoardContent/>
        </main>
      </div>
    </div>
  );
}
