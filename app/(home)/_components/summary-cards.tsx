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
    <div className="space-y-6">
      {/* PRIMEIRO CARD */}
      <SummaryCard
        icon={<WalletIcon size={30} />}
        title="Saldo"
        amount={balance}
        size="large"
        userCanAddTransaction={userCanAddTransaction}
      />

      {/* OUTROS CARDS */}

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<TrendingUpIcon size={25} className="text-primary" />}
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
          title="Investido"
          amount={investmentsTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
