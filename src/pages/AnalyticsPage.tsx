// File: src/pages/AnalyticsPage.tsx
// Place this file in src/pages/

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { Card, CardContent } from "@/components/ui/card";

const meetingData = [
  { month: "Jan", meetings: 12 },
  { month: "Feb", meetings: 18 },
  { month: "Mar", meetings: 25 },
  { month: "Apr", meetings: 21 },
  { month: "May", meetings: 32 },
  { month: "Jun", meetings: 38 },
];

const productivityData = [
  { week: "W1", score: 72 },
  { week: "W2", score: 76 },
  { week: "W3", score: 84 },
  { week: "W4", score: 89 },
  { week: "W5", score: 91 },
];

export default function AnalyticsPage() {
  return (
    <PageWrapper>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Analytics
          </h1>

          <p className="mt-2 text-muted-foreground">
            Team productivity and meeting intelligence.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Total Meetings
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                148
              </h2>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                AI Summaries
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                142
              </h2>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Action Items
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                526
              </h2>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Productivity
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                91%
              </h2>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6 text-lg font-semibold">
                Monthly Meetings
              </h2>

              <div className=" h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={meetingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="meetings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6 text-lg font-semibold">
                Productivity Trend
              </h2>

              <div className=" h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={productivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}