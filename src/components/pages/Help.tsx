import React from "react";
import { Card } from "@/components/ui/card";

const Help = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Help Center</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-2">Getting Started</h2>
          <p className="text-gray-600">
            Learn the basics of using our task management platform.
          </p>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-2">FAQs</h2>
          <p className="text-gray-600">
            Find answers to commonly asked questions.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Help;
