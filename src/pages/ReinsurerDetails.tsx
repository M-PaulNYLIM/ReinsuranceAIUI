import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample data - in a real app this would come from an API
const sampleData = [
  {
    reinsurerID: "RE001",
    reinsurerName: "Global Re Insurance",
    treatyID: "TR2024001",
    quotaShare: "25%",
    cedingAllowance: "15%",
    expenseAllowance: "10%",
    cedingAllowanceCommissions: "12%",
    expenseAllowanceCommissions: "8%",
    periodStartDate: "2024-01-01",
    periodEndDate: "2024-12-31",
  },
  {
    reinsurerID: "RE002",
    reinsurerName: "Atlantic Reinsurance",
    treatyID: "TR2024002",
    quotaShare: "30%",
    cedingAllowance: "18%",
    expenseAllowance: "12%",
    cedingAllowanceCommissions: "14%",
    expenseAllowanceCommissions: "9%",
    periodStartDate: "2024-01-15",
    periodEndDate: "2024-12-31",
  },
  {
    reinsurerID: "RE003",
    reinsurerName: "Pacific Re Holdings",
    treatyID: "TR2024003",
    quotaShare: "20%",
    cedingAllowance: "16%",
    expenseAllowance: "11%",
    cedingAllowanceCommissions: "13%",
    expenseAllowanceCommissions: "7%",
    periodStartDate: "2024-02-01",
    periodEndDate: "2024-12-31",
  },
  {
    reinsurerID: "RE004",
    reinsurerName: "European Reinsurance Group",
    treatyID: "TR2024004",
    quotaShare: "35%",
    cedingAllowance: "20%",
    expenseAllowance: "13%",
    cedingAllowanceCommissions: "15%",
    expenseAllowanceCommissions: "10%",
    periodStartDate: "2024-01-01",
    periodEndDate: "2024-12-31",
  },
  {
    reinsurerID: "RE005",
    reinsurerName: "Asian Re Solutions",
    treatyID: "TR2024005",
    quotaShare: "22%",
    cedingAllowance: "17%",
    expenseAllowance: "9%",
    cedingAllowanceCommissions: "11%",
    expenseAllowanceCommissions: "6%",
    periodStartDate: "2024-03-01",
    periodEndDate: "2024-12-31",
  },
];

const ReinsurerDetails = () => {
  const navigate = useNavigate();

  // Search states
  const [searchReinsurerID, setSearchReinsurerID] = useState("");
  const [searchReinsurerName, setSearchReinsurerName] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");

  // Column filter states
  const [columnFilters, setColumnFilters] = useState<{ [key: string]: string }>(
    {},
  );

  // Filtered data based on search criteria
  const filteredData = useMemo(() => {
    return sampleData.filter((item) => {
      const matchesReinsurerID = item.reinsurerID
        .toLowerCase()
        .includes(searchReinsurerID.toLowerCase());
      const matchesReinsurerName = item.reinsurerName
        .toLowerCase()
        .includes(searchReinsurerName.toLowerCase());
      const matchesStartDate =
        !searchStartDate || item.periodStartDate >= searchStartDate;
      const matchesEndDate =
        !searchEndDate || item.periodEndDate <= searchEndDate;

      // Apply column filters
      const matchesColumnFilters = Object.entries(columnFilters).every(
        ([column, filter]) => {
          if (!filter) return true;
          const value = item[column as keyof typeof item];
          return value.toLowerCase().includes(filter.toLowerCase());
        },
      );

      return (
        matchesReinsurerID &&
        matchesReinsurerName &&
        matchesStartDate &&
        matchesEndDate &&
        matchesColumnFilters
      );
    });
  }, [
    searchReinsurerID,
    searchReinsurerName,
    searchStartDate,
    searchEndDate,
    columnFilters,
  ]);

  const handleColumnFilter = (column: string, value: string) => {
    setColumnFilters((prev) => ({
      ...prev,
      [column]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-8 border-b border-gray-200 bg-white">
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
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-400 bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Sign in
          </Button>
          <Button
            size="sm"
            className="bg-gray-800 text-gray-100 border-gray-800 hover:bg-gray-900"
          >
            Register
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 md:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Reinsurer Details
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manage and view comprehensive information about your reinsurance
              partners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Placeholder content for reinsurer details */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Reinsurer Information
              </h3>
              <p className="text-gray-600">
                View detailed information about your reinsurance partners,
                including contact details, coverage limits, and contract terms.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Coverage Analysis
              </h3>
              <p className="text-gray-600">
                Analyze coverage patterns, utilization rates, and performance
                metrics for each reinsurer relationship.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Contract Management
              </h3>
              <p className="text-gray-600">
                Track contract renewal dates, terms, and conditions for all
                reinsurance agreements.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Performance Metrics
              </h3>
              <p className="text-gray-600">
                Monitor key performance indicators and financial metrics for
                each reinsurer partnership.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => navigate("/")}
              className="bg-gray-800 text-gray-100 border-gray-800 hover:bg-gray-900"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReinsurerDetails;
