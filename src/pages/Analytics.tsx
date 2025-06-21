import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample data for Total Ceded Premiums by Treaty
const cededPremiumsData = [
  {
    month: "Jan 2024",
    "Treaty A": 2400000,
    "Treaty B": 1398000,
    "Treaty C": 980000,
    "Treaty D": 1580000,
  },
  {
    month: "Feb 2024",
    "Treaty A": 2210000,
    "Treaty B": 1480000,
    "Treaty C": 1200000,
    "Treaty D": 1690000,
  },
  {
    month: "Mar 2024",
    "Treaty A": 2290000,
    "Treaty B": 1320000,
    "Treaty C": 1100000,
    "Treaty D": 1720000,
  },
  {
    month: "Apr 2024",
    "Treaty A": 2780000,
    "Treaty B": 1590000,
    "Treaty C": 1350000,
    "Treaty D": 1820000,
  },
  {
    month: "May 2024",
    "Treaty A": 1890000,
    "Treaty B": 1480000,
    "Treaty C": 1180000,
    "Treaty D": 1550000,
  },
  {
    month: "Jun 2024",
    "Treaty A": 2390000,
    "Treaty B": 1380000,
    "Treaty C": 1230000,
    "Treaty D": 1780000,
  },
  {
    month: "Jul 2024",
    "Treaty A": 3490000,
    "Treaty B": 1630000,
    "Treaty C": 1450000,
    "Treaty D": 1920000,
  },
  {
    month: "Aug 2024",
    "Treaty A": 2490000,
    "Treaty B": 1530000,
    "Treaty C": 1320000,
    "Treaty D": 1680000,
  },
];

// Sample data for Reinsurance Expense & Income by Reinsurer
const profitabilityData = [
  {
    reinsurer: "Global Re",
    income: 5200000,
    expenses: 4100000,
    netProfit: 1100000,
  },
  {
    reinsurer: "Atlantic Re",
    income: 4800000,
    expenses: 3900000,
    netProfit: 900000,
  },
  {
    reinsurer: "Pacific Re",
    income: 3600000,
    expenses: 3200000,
    netProfit: 400000,
  },
  {
    reinsurer: "European Re",
    income: 6100000,
    expenses: 4800000,
    netProfit: 1300000,
  },
  {
    reinsurer: "Asian Re",
    income: 2900000,
    expenses: 2600000,
    netProfit: 300000,
  },
];

// Sample data for Risk Concentration
const riskConcentrationData = [
  { name: "Global Re", value: 28, amount: 15400000 },
  { name: "European Re", value: 24, amount: 13200000 },
  { name: "Atlantic Re", value: 19, amount: 10500000 },
  { name: "Pacific Re", value: 16, amount: 8800000 },
  { name: "Asian Re", value: 8, amount: 4400000 },
  { name: "Others", value: 5, amount: 2700000 },
];

// Sample data for Product Line Analysis
const productLineData = [
  {
    product: "Life Insurance",
    exposure: 24500000,
    premiums: 3200000,
    riskLevel: "Medium",
  },
  {
    product: "Property Insurance",
    exposure: 18900000,
    premiums: 2800000,
    riskLevel: "High",
  },
  {
    product: "Health Insurance",
    exposure: 16200000,
    premiums: 2100000,
    riskLevel: "Low",
  },
  {
    product: "Auto Insurance",
    exposure: 12800000,
    premiums: 1900000,
    riskLevel: "Medium",
  },
  {
    product: "Commercial Lines",
    exposure: 22100000,
    premiums: 3400000,
    riskLevel: "High",
  },
];

// Colors for charts
const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#6B7280",
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatCompactCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

const Analytics = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("ytd");
  const [viewType, setViewType] = useState("treaty");

  // Calculate key metrics
  const totalCededPremiums =
    cededPremiumsData[cededPremiumsData.length - 1]["Treaty A"] +
    cededPremiumsData[cededPremiumsData.length - 1]["Treaty B"] +
    cededPremiumsData[cededPremiumsData.length - 1]["Treaty C"] +
    cededPremiumsData[cededPremiumsData.length - 1]["Treaty D"];

  const totalNetProfit = profitabilityData.reduce(
    (sum, item) => sum + item.netProfit,
    0,
  );
  const totalExposure = riskConcentrationData.reduce(
    (sum, item) => sum + item.amount,
    0,
  );
  const avgProfitMargin =
    (totalNetProfit /
      profitabilityData.reduce((sum, item) => sum + item.income, 0)) *
    100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Reinsurance Analytics
              </h1>
              <p className="text-gray-600 mt-1">
                Key Metrics & Performance Dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ytd">YTD 2024</SelectItem>
                <SelectItem value="q4">Q4 2024</SelectItem>
                <SelectItem value="q3">Q3 2024</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Ceded Premiums
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCompactCurrency(totalCededPremiums)}
                </div>
                <p className="text-xs text-green-600 mt-1">
                  +12.5% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Net Profit
                </CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCompactCurrency(totalNetProfit)}
                </div>
                <p className="text-xs text-green-600 mt-1">
                  +8.2% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Exposure
                </CardTitle>
                <Shield className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCompactCurrency(totalExposure)}
                </div>
                <p className="text-xs text-yellow-600 mt-1">
                  Risk level: Moderate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Profit Margin
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {avgProfitMargin.toFixed(1)}%
                </div>
                <p className="text-xs text-green-600 mt-1">
                  +2.1% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Total Ceded Premiums Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Total Ceded Premiums Trend</CardTitle>
                  <Select value={viewType} onValueChange={setViewType}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="treaty">By Treaty</SelectItem>
                      <SelectItem value="reinsurer">By Reinsurer</SelectItem>
                      <SelectItem value="product">By Product</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={cededPremiumsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={formatCompactCurrency} />
                    <Tooltip
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="Treaty A"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="Treaty B"
                      stackId="1"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="Treaty C"
                      stackId="1"
                      stroke="#F59E0B"
                      fill="#F59E0B"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="Treaty D"
                      stackId="1"
                      stroke="#EF4444"
                      fill="#EF4444"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Profitability Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Reinsurance Profitability by Reinsurer</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={profitabilityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="reinsurer" />
                    <YAxis tickFormatter={formatCompactCurrency} />
                    <Tooltip
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                    <Legend />
                    <Bar dataKey="income" fill="#10B981" name="Income" />
                    <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                    <Bar dataKey="netProfit" fill="#3B82F6" name="Net Profit" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Risk Analysis Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Concentration by Reinsurer */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Concentration by Reinsurer</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={riskConcentrationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {riskConcentrationData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [
                        formatCurrency(
                          riskConcentrationData.find(
                            (item) => item.name === name,
                          )?.amount || 0,
                        ),
                        "Exposure",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Product Line Risk Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Product Line Risk & Exposure</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={productLineData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      tickFormatter={formatCompactCurrency}
                    />
                    <YAxis dataKey="product" type="category" width={100} />
                    <Tooltip
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                    <Legend />
                    <Bar
                      dataKey="exposure"
                      fill="#8B5CF6"
                      name="Total Exposure"
                    />
                    <Bar dataKey="premiums" fill="#F59E0B" name="Premiums" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Metrics Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Reinsurer</th>
                      <th className="text-right p-3">Income</th>
                      <th className="text-right p-3">Expenses</th>
                      <th className="text-right p-3">Net Profit</th>
                      <th className="text-right p-3">Margin %</th>
                      <th className="text-center p-3">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profitabilityData.map((item, index) => {
                      const margin = (item.netProfit / item.income) * 100;
                      return (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{item.reinsurer}</td>
                          <td className="p-3 text-right">
                            {formatCurrency(item.income)}
                          </td>
                          <td className="p-3 text-right">
                            {formatCurrency(item.expenses)}
                          </td>
                          <td className="p-3 text-right font-semibold text-green-600">
                            {formatCurrency(item.netProfit)}
                          </td>
                          <td className="p-3 text-right">
                            {margin.toFixed(1)}%
                          </td>
                          <td className="p-3 text-center">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                margin > 20
                                  ? "bg-green-100 text-green-800"
                                  : margin > 15
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {margin > 20
                                ? "Excellent"
                                : margin > 15
                                  ? "Good"
                                  : "Needs Attention"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Return Button */}
          <div className="text-center pt-6">
            <Button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
