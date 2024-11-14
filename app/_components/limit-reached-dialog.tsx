import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Link from "next/link";

interface LimitReachedDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const LimitReachedDialog = ({ isOpen, setIsOpen }: LimitReachedDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Limite do mês atingido</DialogTitle>
          <DialogDescription>
            Você precisa de um plano premium para adicionar mais transações este
            mês.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button asChild>
            <Link href="/subscription">Assinar plano premium</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LimitReachedDialog;
