import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCards {
  month: string;
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  userCanAddTransaction?: boolean;
}

const SummaryCards = async ({
  balance,
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  userCanAddTransaction,
}: SummaryCards) => {
  return (
    <div className="space-y-2 md:space-y-6">
      {/* PRIMEIRO CARD */}
      <SummaryCard
        icon={<WalletIcon size={25} />}
        title="Saldo"
        amount={balance}
        size="large"
        userCanAddTransaction={userCanAddTransaction}
      />

      {/* OUTROS CARDS */}

      <div className="grid gap-2 md:grid-cols-3 md:gap-6">
        <SummaryCard
          icon={<TrendingUpIcon size={25} className="text-green-500" />}
          title="Receitas"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={25} className="text-red-500" />}
          title="Despesas"
          amount={expensesTotal}
        />
        <SummaryCard
          icon={<PiggyBankIcon size={25} />}
          title="Investimentos"
          amount={investmentsTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
