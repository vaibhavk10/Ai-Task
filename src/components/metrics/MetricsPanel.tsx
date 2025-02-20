import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const MetricCard = ({
  title = "Metric",
  value = "0",
  change = 0,
  icon,
}: MetricCardProps) => (
  <Card className="p-6 bg-white">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-semibold mt-1">{value}</h3>
      </div>
      <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
    </div>
    <div className="flex items-center mt-4">
      {change >= 0 ? (
        <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
      ) : (
        <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
      )}
      <span
        className={`text-sm ${change >= 0 ? "text-green-500" : "text-red-500"}`}
      >
        {Math.abs(change)}%
      </span>
      <span className="text-sm text-gray-500 ml-1">vs last week</span>
    </div>
  </Card>
);

interface MetricsPanelProps {
  metrics?: {
    completionRate: number;
    tasksCompleted: number;
    avgCompletionTime: string;
    productivityScore: number;
  };
}

const MetricsPanel = ({
  metrics = {
    completionRate: 85,
    tasksCompleted: 24,
    avgCompletionTime: "2.5 days",
    productivityScore: 92,
  },
}: MetricsPanelProps) => {
  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Performance Metrics</h2>
        <Tabs defaultValue="week" className="w-[200px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Completion Rate"
          value={`${metrics.completionRate}%`}
          change={12}
          icon={<CheckCircle2 className="w-6 h-6 text-green-500" />}
        />
        <MetricCard
          title="Tasks Completed"
          value={metrics.tasksCompleted.toString()}
          change={8}
          icon={<TrendingUp className="w-6 h-6 text-blue-500" />}
        />
        <MetricCard
          title="Avg. Completion Time"
          value={metrics.avgCompletionTime}
          change={-5}
          icon={<Clock className="w-6 h-6 text-orange-500" />}
        />
        <MetricCard
          title="Productivity Score"
          value={`${metrics.productivityScore}/100`}
          change={15}
          icon={<TrendingUp className="w-6 h-6 text-purple-500" />}
        />
      </div>

      <div className="mt-6">
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-medium mb-4">Task Completion Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">High Priority Tasks</span>
                <span className="text-sm text-gray-500">80%</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">
                  Medium Priority Tasks
                </span>
                <span className="text-sm text-gray-500">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Low Priority Tasks</span>
                <span className="text-sm text-gray-500">90%</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MetricsPanel;
