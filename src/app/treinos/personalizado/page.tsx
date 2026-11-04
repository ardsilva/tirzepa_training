import { Suspense } from "react";
import { TreinoPersonalizado } from "./TreinoPersonalizado";

export const metadata = { title: "Treino do assistente" };

export default function Page() {
  return (
    <Suspense fallback={null}>
      <TreinoPersonalizado />
    </Suspense>
  );
}
