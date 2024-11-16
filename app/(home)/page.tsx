import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`/?month=${new Date().getMonth() + 1}`);
  }
  const dashboard = await getDashboard(month);
  const userCanAddTransactions = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId);
  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-auto p-6">
        <div className="grid grid-cols-3 items-center space-y-4">
          <h1 className="col-span-3 w-full text-center text-2xl font-bold md:col-span-1 md:text-left">
            Dashboard
          </h1>
          <span className="col-span-2 pe-4 md:col-span-1">
            <TimeSelect />
          </span>
          <AiReportButton
            month={month}
            hasPremiumPlan={user.publicMetadata.subscriptionPlan === "premium"}
          />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 flex flex-col gap-3 overflow-hidden md:col-span-2 md:gap-6">
            <SummaryCards
              month={month}
              {...dashboard}
              userCanAddTransaction={userCanAddTransactions}
            />
            <div className="grid h-full grid-rows-1 gap-3 overflow-hidden md:grid-cols-2 md:gap-6">
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
              <TransactionPieChart {...dashboard} />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
