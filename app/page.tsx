import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { getAllowedModuleIds, getAllowedSubmodules } from "@/lib/data/acl";
import { Dashboard } from "@/components/dashboard";

export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const [allowedModuleIds, allowedSubmodules] = await Promise.all([
    getAllowedModuleIds(session.id_user),
    getAllowedSubmodules(session.id_user),
  ]);

  return (
    <Dashboard
      allowedModuleIds={allowedModuleIds}
      allowedSubmodules={allowedSubmodules}
      userName={session.nome}
    />
  );
}
