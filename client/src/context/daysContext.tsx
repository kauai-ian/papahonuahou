// centralize state management for days, for ease of access and manipulate days data from different components

import { createContext, useEffect, useState, FC, ReactNode } from "react";
import * as api from "../api/days";

export type DayProps = {
  _id: string;
  dayStart: string;
  
};

export type DaysContextType = {
  days: DayProps[];
  isLoading: boolean;
  fetchDays: () => void;
  selectedDay: DayProps | null;
  selectDay: (day: DayProps | null) => void;
};

export const dayInitState: DaysContextType = {
  days: [],
  isLoading: true,
  fetchDays: () => {},
  selectedDay: null,
  selectDay: () => {},
};

export const DaysContext = createContext<DaysContextType>(dayInitState);

export const DaysProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [days, setDays] = useState<DayProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<DayProps | null>(null);

  const fetchDays = async () => {
    try {
      const response = await api.listDays();
      const sortedDays = response.data.sort(
        (a: DayProps, b: DayProps) =>
          new Date(a.dayStart).getTime() - new Date(b.dayStart).getTime()
      );
      setDays(sortedDays);
    } catch (error) {
      console.error("error fetching days", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDays();
  }, []);

  const selectDay = (day: DayProps | null) => {
    setSelectedDay(day);
  };

  return (
    <DaysContext.Provider value={{ days, isLoading, fetchDays, selectedDay, selectDay }}>
      {children}
    </DaysContext.Provider>
  );
};
