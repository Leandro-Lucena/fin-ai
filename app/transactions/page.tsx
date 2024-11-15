import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import { ScrollArea } from "../_components/ui/scroll-area";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      date: "desc",
    },
  });
  const userCanAddTransactions = await canUserAddTransaction();
  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden px-1 py-6 md:px-6">
        {/* TÍTULO E BOTÃO */}
        <div className="w-full items-center justify-between space-y-4 md:flex">
          <h1 className="w-full text-center text-2xl font-bold md:text-left">
            Transações
          </h1>
          <span className="flex justify-center">
            <AddTransactionButton
              userCanAddTransaction={userCanAddTransactions}
            />
          </span>
        </div>
        <ScrollArea className="h-full rounded-md border">
          <DataTable
            columns={transactionColumns}
            data={JSON.parse(JSON.stringify(transactions))}
          />
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionsPage;
