import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  userCanAddTransaction?: boolean;
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
  userCanAddTransaction,
}: SummaryCardProps) => {
  const getAmountColor = (amount: number) => {
    if (amount < 0) {
      return "text-red-500";
    }
    if (amount > 0) {
      return "text-green-500";
    }
    return "text-white";
  };

  return (
    <Card className={`${size === "large" ? "bg-white bg-opacity-5" : ""}`}>
      <CardHeader className="flex-row items-center justify-between gap-4">
        <span
          className={`flex gap-2 ${size === "small" ? "text-lg text-muted-foreground" : "text-xl text-white opacity-70"}`}
        >
          {icon}

          {title}
        </span>
        {size === "large" && (
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        )}
      </CardHeader>
      <CardContent className="flex justify-between overflow-hidden">
        <p
          className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl"} ${size === "large" && getAmountColor(amount)} ${title === "Despesas" && "text-red-500"} ${title === "Receitas" && "text-green-500"}`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
