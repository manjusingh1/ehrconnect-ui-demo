import { ChartDataCount } from "../../models/chart.model";

export function updateChartCountData(
  data: ChartDataCount[],
  defaultData: ChartDataCount[],
): ChartDataCount[] {
  // Reset to default values
  const updatedData = [...defaultData];

  // Update with backend data
  data.forEach((item) => {
    const category = updatedData.find((c) => c.category === item.category);
    if (category) {
      category.statusCount = item.statusCount;
    }
  });

  return updatedData;
}

export function getFixedColor(index: number): string {
  const colors = [
    "#FF5733", // Red
    "#33FF57", // Green
    "#3357FF", // Blue
    "#FF33A1", // Pink
    "#FF8C33", // Orange
    "#33FFF5", // Cyan
    "#8C33FF", // Purple
    "#FFD733", // Yellow
    "#33FF8C", // Lime
    "#FF3333", // Dark Red
  ];
  return colors[index % colors.length];
}
