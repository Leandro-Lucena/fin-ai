import Image from "next/image";
import { Button } from "../_components/ui/button";
import { ChartNoAxesCombinedIcon, LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { userId } = await auth();
  if (userId) {
    redirect("/");
  }
  return (
    <div className="relative flex h-full flex-col md:grid md:grid-cols-2">
      {/* BLOCO LOGIN */}
      <div className="mx-4 my-auto flex max-w-[550px] flex-col justify-center rounded-2xl bg-black bg-opacity-90 p-8 py-14 md:mx-auto md:bg-transparent">
        <span className="mb-3 flex items-end gap-3 border-b p-3 px-2">
          <ChartNoAxesCombinedIcon size={45} className="text-primary" />
          <span className="text-4xl font-bold">Fin.AI</span>
        </span>
        <h1 className="mb-2 text-3xl font-bold sm:text-4xl">Bem vindo</h1>
        <p className="mb-8 text-muted-foreground">
          Fin.AI é uma plataforma de gestão financeira que utiliza Inteligência
          Artificial para analisar seus históricos de movimentações e oferecer
          dicas e insights personalizados, facilitando o controle de suas
          finanças.
        </p>
        <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mr-2" />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>
      {/* IMAGEM */}
      <div className="absolute -z-10 h-full w-full sm:inset-0 md:relative">
        <Image
          src="/login.jpg"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
