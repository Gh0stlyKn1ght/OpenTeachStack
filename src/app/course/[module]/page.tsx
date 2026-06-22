import { redirect } from "next/navigation";
import { MODULES } from "@/lib/metadata";

interface ModulePageProps {
  params: Promise<{ module: string }>;
}

export function generateStaticParams() {
  return MODULES.map((mod) => ({ module: mod.slug }));
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { module } = await params;
  redirect(`/book/ots-101/${module}`);
}
