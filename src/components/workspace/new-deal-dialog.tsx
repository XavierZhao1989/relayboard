"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { accountName, isStage, STAGES, type Stage } from "@/lib/data";
import { useWorkspace } from "@/components/workspace/provider";

const emptyErrors = {
  accountId: "",
  name: "",
  amount: "",
  closeDate: "",
};

export function NewDealDialog({
  lockedAccountId,
  label = "New deal",
}: {
  lockedAccountId?: string;
  label?: string;
}) {
  const { addDeal } = useWorkspace();
  const { accounts } = useWorkspace();
  const [open, setOpen] = useState(false);
  const [accountId, setAccountId] = useState(lockedAccountId ?? "");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [stage, setStage] = useState<Stage>("Qualified");
  const [closeDate, setCloseDate] = useState("");
  const [nextStep, setNextStep] = useState("");
  const [errors, setErrors] = useState(emptyErrors);

  function reset() {
    setAccountId(lockedAccountId ?? "");
    setName("");
    setAmount("");
    setStage("Qualified");
    setCloseDate("");
    setNextStep("");
    setErrors(emptyErrors);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = { ...emptyErrors };
    const parsed = Number(amount);
    if (!accountId) nextErrors.accountId = "Choose an account.";
    if (name.trim().length < 2) nextErrors.name = "Enter a deal name.";
    if (!Number.isFinite(parsed) || parsed <= 0) {
      nextErrors.amount = "Enter an amount greater than zero.";
    } else if (parsed > 10_000_000) {
      nextErrors.amount = "Enter an amount under $10,000,000.";
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(closeDate)) {
      nextErrors.closeDate = "Choose a close date.";
    }
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    addDeal({
      accountId,
      name: name.trim(),
      amount: Math.round(parsed),
      stage,
      closeDate,
      nextStep: nextStep.trim(),
    });
    toast.success(`Deal added for ${accountName(accountId)}`);
    setOpen(false);
    reset();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button type="button">
          <Plus aria-hidden="true" />
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New deal</DialogTitle>
          <DialogDescription>
            Adds a deal to this browser session. Nothing is sent to a server.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-4" noValidate>
          <div className="grid gap-1.5">
            <Label htmlFor="deal-account">Account (required)</Label>
            {lockedAccountId ? (
              <Input
                id="deal-account"
                readOnly
                value={accountName(lockedAccountId)}
              />
            ) : (
              <Select value={accountId || undefined} onValueChange={setAccountId}>
                <SelectTrigger
                  id="deal-account"
                  className="w-full"
                  aria-invalid={Boolean(errors.accountId)}
                  aria-describedby={errors.accountId ? "deal-account-error" : undefined}
                >
                  <SelectValue placeholder="Choose an account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {errors.accountId ? (
              <p id="deal-account-error" className="text-sm text-destructive" role="alert">
                {errors.accountId}
              </p>
            ) : null}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="deal-name">Deal name (required)</Label>
            <Input
              id="deal-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "deal-name-error" : undefined}
            />
            {errors.name ? (
              <p id="deal-name-error" className="text-sm text-destructive" role="alert">
                {errors.name}
              </p>
            ) : null}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="deal-amount">Amount in USD (required)</Label>
              <Input
                id="deal-amount"
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                aria-invalid={Boolean(errors.amount)}
                aria-describedby={errors.amount ? "deal-amount-error" : undefined}
              />
              {errors.amount ? (
                <p id="deal-amount-error" className="text-sm text-destructive" role="alert">
                  {errors.amount}
                </p>
              ) : null}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="deal-close">Close date (required)</Label>
              <Input
                id="deal-close"
                type="date"
                value={closeDate}
                onChange={(event) => setCloseDate(event.target.value)}
                aria-invalid={Boolean(errors.closeDate)}
                aria-describedby={errors.closeDate ? "deal-close-error" : undefined}
              />
              {errors.closeDate ? (
                <p id="deal-close-error" className="text-sm text-destructive" role="alert">
                  {errors.closeDate}
                </p>
              ) : null}
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="deal-stage">Stage</Label>
            <Select
              value={stage}
              onValueChange={(value) => {
                if (isStage(value)) setStage(value);
              }}
            >
              <SelectTrigger id="deal-stage" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STAGES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="deal-next">Next step</Label>
            <Textarea
              id="deal-next"
              value={nextStep}
              onChange={(event) => setNextStep(event.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Add deal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
