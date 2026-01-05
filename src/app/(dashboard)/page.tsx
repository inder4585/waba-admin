import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Phone, MessageSquare, FileText } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { label: "Total WABA Groups", value: "12", icon: Users, color: "text-blue-500", bg: "bg-blue-100" },
    { label: "Connected Numbers", value: "8", icon: Phone, iconColor: "text-green-500", bg: "bg-green-100" },
    { label: "Active Chats", value: "145", icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-100" },
    { label: "Templates Approved", value: "34", icon: FileText, color: "text-orange-500", bg: "bg-orange-100" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-2">Welcome back to your comprehensive overview.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.label}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-1">+2.5% from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Placeholder for charts or recent activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-none shadow-sm">
            <CardHeader>
                <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[200px] flex items-center justify-center text-slate-400">
                    Chart Placeholder
                </div>
            </CardContent>
        </Card>
        <Card className="col-span-3 border-none shadow-sm">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
             <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <div className="text-sm">New WABA Group "Sales Team" created</div>
                    </div>
                     <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <div className="text-sm">Number +1234567890 connected</div>
                    </div>
                     <div className="flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                        <div className="text-sm">Campaign "Holiday Special" started</div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
