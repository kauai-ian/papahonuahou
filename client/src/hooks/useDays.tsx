import { useContext } from "react";
import { DaysContext, DaysContextType } from "../context/daysContext";

export const useDays = (): DaysContextType => {
  const context = useContext(DaysContext);
  if (context === undefined) {
    throw new Error("useDays must be used within a DaysProvider");
  }
  return context;
};
