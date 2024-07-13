// import { Box } from "@chakra-ui/react";
// import React from "react";
// import { AxisOptions, Chart } from "react-charts";

// export type SleepProps = { date: Date; sleepDuration: number };

// export const MyChart: React.FC<{ data: SleepProps[] }> = ({ data }) => {
//     const series = React.useMemo(
//         () => [
//           {
//             label: "Sleep Data",
//             data: data.map((item) => ({
//               date: item.date,
//               sleepDuration: item.sleepDuration,
//             })),
//           },
//         ],
//         [data]
//       );
  
//     const primaryAxis = React.useMemo(
//     (): AxisOptions<SleepProps> => ({
//       getValue: (datum) => datum.date,
//       scaleType: "time",
//     }),
//     []
//   );

//   const secondaryAxes = React.useMemo(
//     (): AxisOptions<SleepProps>[] => [
//       {
//         getValue: (datum) => datum.sleepDuration,
//         elementType: "bar",
//         scaleType: "linear",
//       },
//     ],
//     []
//   );

  

//   return (
//     <Box w="100%" h="400px">
//       <Chart
//         options={{
//           data: series,
//           primaryAxis,
//           secondaryAxes,
//         }}
//       />
//     </Box>
//   );
// };
