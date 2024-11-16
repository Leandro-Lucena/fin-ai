"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import { generateAiReport } from "../_actions/generate-ai-report";
import { useState } from "react";
import Markdown from "react-markdown";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Link from "next/link";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface AiReportButtonProps {
  hasPremiumPlan: boolean;
  month: string;
}

const AiReportButton = ({ month, hasPremiumPlan }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>(null);
  const [reportIsLoading, setReportIsLoading] = useState(false);
  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true);
      const aiReport = await generateAiReport({ month });
      setReport(aiReport);
    } catch (error) {
      console.error(error);
    } finally {
      setReportIsLoading(false);
    }
  };
  const handleDownloadPDF = async () => {
    if (!report) return;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    const lineHeight = 10;
    let y = margin;
    const htmlElement = document.getElementById("logoAi");
    if (htmlElement) {
      try {
        htmlElement.style.padding = "10px";
        htmlElement.style.backgroundColor = "black";
        const canvas = await html2canvas(htmlElement);
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = pageWidth / 4;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const xPosition = pageWidth - margin - imgWidth;
        doc.addImage(imgData, "PNG", xPosition, y, imgWidth, imgHeight);
        htmlElement.style.backgroundColor = "";
        htmlElement.style.padding = "";
        y += imgHeight + lineHeight;
      } catch (error) {
        console.error("Erro ao capturar o elemento HTML:", error);
        return;
      }
    }
    const lines = doc.splitTextToSize(report, pageWidth - margin * 2);
    lines.forEach((line: string) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });
    doc.save(`Relatório-AI-${month}.pdf`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ms-auto rounded-lg px-3">
          Relatório IA
          <BotIcon className="hidden md:block" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        {hasPremiumPlan ? (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Use IA para gerar um relatório com insights sobre suas
                movimentações.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
              <Markdown>{report}</Markdown>
            </ScrollArea>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">
                  {report ? "Fechar" : "Cancelar"}
                </Button>
              </DialogClose>
              {!report ? (
                <Button
                  onClick={handleGenerateReportClick}
                  disabled={reportIsLoading}
                >
                  {reportIsLoading && <Loader2Icon className="animate-spin" />}
                  Gerar relatório
                </Button>
              ) : (
                <Button onClick={handleDownloadPDF}>Baixar relatório</Button>
              )}
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Você precisa de um plano premium para gerar relatórios com
                Inteligência Artificial.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button asChild>
                <Link href="/subscription" className="mb-2">
                  Assinar plano premium
                </Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AiReportButton;
