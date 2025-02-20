import React from "react";
import MetricsPanel from "../metrics/MetricsPanel";
import KanbanBoard from "../kanban/KanbanBoard";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <MetricsPanel />
      <div className="mt-6">
        <KanbanBoard />
      </div>
    </div>
  );
};

export default Dashboard;
