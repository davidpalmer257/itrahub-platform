import { redirect } from "next/navigation";

export default function BudgetIndex() {
  redirect("/budget/budgets");
}
