import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { getAllowedModuleIds, getAllowedSubmodules } from "@/lib/data/acl";
import { getAnosDisponiveis } from "@/lib/data/modules";
import { Dashboard } from "@/components/dashboard";

export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const [allowedModuleIds, allowedSubmodules, anosDisponiveis] =
    await Promise.all([
      getAllowedModuleIds(session.id_user),
      getAllowedSubmodules(session.id_user),
      getAnosDisponiveis(session.municipio),
    ]);

  return (
    <Dashboard
      allowedModuleIds={allowedModuleIds}
      allowedSubmodules={allowedSubmodules}
      anosDisponiveis={anosDisponiveis}
      userName={session.nome}
    />
  );
}
