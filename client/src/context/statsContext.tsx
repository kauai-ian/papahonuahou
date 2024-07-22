import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getStatistics } from "../api/events";
import dayjs from "dayjs";

// create a state sharing statistics to reduce api calls

type StatisticsSummary = {
    totalEvents: number;
    totalSleepTime: number;
    totalSleepEvents: number;
    totalNapTime: number;
    totalNapEvents: number;
    totalMealEvents: number;
    averageSleepTime: number;
    averageNapTime: number;
    totalDiaperChanges: number;
    sleepEvents: { eventStart: string; eventEnd: string }[];
    napEvents: { eventStart: string; eventEnd: string }[];
}

type StatisticsSummaryProps = {
    statistics: StatisticsSummary | null;
    timeRange: string;
    setTimeRange: (range: string) => void;
    loading: boolean;
}

const StatisticsContext = createContext<StatisticsSummaryProps | undefined>(undefined)

export const useStatistics = () => {
    const context = useContext(StatisticsContext);
    if (!context) {
        throw new Error('useStatistics must be used within a provider')
    }
    return context;
}

type StatisticsProviderProps = {
    children: ReactNode;
}

export const StatisticsProvider: React.FC<StatisticsProviderProps> = ({children}) => {
    const [statistics, setStatistics] = useState<StatisticsSummary | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [timeRange, setTimeRange] = useState<string>('7days')

    useEffect(() => {
    const calculateDateRange = () => {
        let eventStart: Date;
        const eventEnd: Date = new Date();
  
        if (timeRange === "7days") {
          eventStart = dayjs().subtract(7, "day").toDate();
        } else if (timeRange === "30days") {
          eventStart = dayjs().subtract(30, "day").toDate();
        } else {
          eventStart = new Date("1970-01-01"); // all time
        }
        return { eventStart, eventEnd };
      };
  
      const fetchStats = async () => {
        try {
          const { eventStart, eventEnd } = calculateDateRange();
          const updatedFilter = {
            eventTypes: ["sleep", "nap", "meal", "diaper"],
            eventStart,
            eventEnd,
        };
        console.log("Fetching statistics with filter:", updatedFilter);
        const response = await getStatistics(updatedFilter);
        console.log("Statistics data:", response.data);
        setStatistics(response.data);
      } catch (error) {
        console.error("failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [timeRange]);

  return (
    <StatisticsContext.Provider value={{ statistics, timeRange, setTimeRange, loading}}>
        {children}
    </StatisticsContext.Provider>
  )

}