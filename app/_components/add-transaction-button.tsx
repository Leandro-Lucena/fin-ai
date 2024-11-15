"use client";

import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import { Button } from "./ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import LimitReachedDialog from "./limit-reached-dialog";

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean;
}

const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [dialogSubscriptionIsOpen, setDialogSubscriptionIsOpen] =
    useState(false);

  return (
    <>
      <Button
        className="rounded-lg px-3 text-base font-bold"
        onClick={
          !userCanAddTransaction
            ? () => setDialogSubscriptionIsOpen(true)
            : () => setDialogIsOpen(true)
        }
      >
        Adicionar transação
        <ArrowDownUpIcon />
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
      <LimitReachedDialog
        isOpen={dialogSubscriptionIsOpen}
        setIsOpen={setDialogSubscriptionIsOpen}
      />
    </>
  );
};

export default AddTransactionButton;
