"use client";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { FeatureFlag } from "@/types/features";

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface TicketPieChartProps {
  data: PieChartData[];
  title: string;
}

const TicketPieChart = ({ data, title }: TicketPieChartProps) => {
  const isEnabled = useFeatureFlag(FeatureFlag.ShowPieChart, true);

  if (!isEnabled) return <div></div>;

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              label={({ percent }) => `${(percent * 100).toFixed(2)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TicketPieChart;
