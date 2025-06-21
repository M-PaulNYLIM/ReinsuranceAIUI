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
import { ArrowLeft, Search, Filter, Eye } from "lucide-react";
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
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Reinsurer Details
            </h1>
            <p className="text-xl text-gray-600">
              Manage and view comprehensive information about your reinsurance
              partners
            </p>
          </div>

          {/* Search Filters */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Search Filters
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reinsurer ID
                </label>
                <Input
                  type="text"
                  placeholder="Search by Reinsurer ID"
                  value={searchReinsurerID}
                  onChange={(e) => setSearchReinsurerID(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reinsurer Name
                </label>
                <Input
                  type="text"
                  placeholder="Search by Reinsurer Name"
                  value={searchReinsurerName}
                  onChange={(e) => setSearchReinsurerName(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Period Start Date
                </label>
                <Input
                  type="date"
                  value={searchStartDate}
                  onChange={(e) => setSearchStartDate(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Period End Date
                </label>
                <Input
                  type="date"
                  value={searchEndDate}
                  onChange={(e) => setSearchEndDate(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchReinsurerID("");
                  setSearchReinsurerName("");
                  setSearchStartDate("");
                  setSearchEndDate("");
                  setColumnFilters({});
                }}
                className="text-gray-600"
              >
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Reinsurer Records ({filteredData.length})
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Filter className="w-4 h-4" />
                  Click column headers to filter
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Reinsurer ID</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.reinsurerID || ""}
                          onChange={(e) =>
                            handleColumnFilter("reinsurerID", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Reinsurer Name</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.reinsurerName || ""}
                          onChange={(e) =>
                            handleColumnFilter("reinsurerName", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Treaty ID</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.treatyID || ""}
                          onChange={(e) =>
                            handleColumnFilter("treatyID", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Quota Share</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.quotaShare || ""}
                          onChange={(e) =>
                            handleColumnFilter("quotaShare", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Ceding Allowance</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.cedingAllowance || ""}
                          onChange={(e) =>
                            handleColumnFilter(
                              "cedingAllowance",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Expense Allowance</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.expenseAllowance || ""}
                          onChange={(e) =>
                            handleColumnFilter(
                              "expenseAllowance",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Ceding Allowance for Commissions</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.cedingAllowanceCommissions || ""}
                          onChange={(e) =>
                            handleColumnFilter(
                              "cedingAllowanceCommissions",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Expense Allowance for Commissions</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={
                            columnFilters.expenseAllowanceCommissions || ""
                          }
                          onChange={(e) =>
                            handleColumnFilter(
                              "expenseAllowanceCommissions",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Period Start Date</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.periodStartDate || ""}
                          onChange={(e) =>
                            handleColumnFilter(
                              "periodStartDate",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Period End Date</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.periodEndDate || ""}
                          onChange={(e) =>
                            handleColumnFilter("periodEndDate", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {item.reinsurerID}
                      </TableCell>
                      <TableCell>{item.reinsurerName}</TableCell>
                      <TableCell>{item.treatyID}</TableCell>
                      <TableCell>{item.quotaShare}</TableCell>
                      <TableCell>{item.cedingAllowance}</TableCell>
                      <TableCell>{item.expenseAllowance}</TableCell>
                      <TableCell>{item.cedingAllowanceCommissions}</TableCell>
                      <TableCell>{item.expenseAllowanceCommissions}</TableCell>
                      <TableCell>{item.periodStartDate}</TableCell>
                      <TableCell>{item.periodEndDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No records found matching your search criteria.
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-8">
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
