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
import { ArrowLeft, Search, Filter, Eye, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// API response type
interface ApiReinsurerData {
  REINSURER_ID: number;
  REINSURER_NAME: string;
  TREATY_ID: number;
  QUOTA_SHARE: string;
  CEDEING_ALL_PREM: string;
  EXPENSE_ALL_PREM: string;
  PER_START_DATE: string;
  PER_END_DATE: string;
}

// Transformed data type for display
interface ReinsurerData {
  reinsurerID: string;
  reinsurerName: string;
  treatyID: string;
  quotaShare: string;
  cedingAllowance: string;
  expenseAllowance: string;
  periodStartDate: string;
  periodEndDate: string;
}

// API fetch function
const fetchReinsurerData = async (): Promise<ApiReinsurerData[]> => {
  const response = await fetch(
    'https://2qiik3x7hi.execute-api.us-east-1.amazonaws.com/dev/getGridDataReinsurerLanding'
  );

  if (!response.ok) {
    throw new Error('Failed to fetch reinsurer data');
  }

  return response.json();
};

// Transform API data to display format
const transformApiData = (apiData: ApiReinsurerData[]): ReinsurerData[] => {
  return apiData.map(item => ({
    reinsurerID: item.REINSURER_ID.toString(),
    reinsurerName: item.REINSURER_NAME,
    treatyID: item.TREATY_ID.toString(),
    quotaShare: `${parseFloat(item.QUOTA_SHARE).toFixed(2)}%`,
    cedingAllowance: parseFloat(item.CEDEING_ALL_PREM).toFixed(4),
    expenseAllowance: parseFloat(item.EXPENSE_ALL_PREM).toFixed(4),
    periodStartDate: new Date(item.PER_START_DATE).toISOString().split('T')[0],
    periodEndDate: new Date(item.PER_END_DATE).toISOString().split('T')[0],
  }));
};

const ReinsurerDetails = () => {
  const navigate = useNavigate();

  // Fetch data using React Query
  const { data: apiData, isLoading, error } = useQuery({
    queryKey: ['reinsurerData'],
    queryFn: fetchReinsurerData,
  });

  // Transform API data
  const reinsurerData = useMemo(() => {
    if (!apiData) return [];
    return transformApiData(apiData);
  }, [apiData]);

  // Search states
  const [searchReinsurerID, setSearchReinsurerID] = useState("");
  const [searchReinsurerName, setSearchReinsurerName] = useState("");
  const [searchTreatyID, setSearchTreatyID] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");

  // Column filter states
  const [columnFilters, setColumnFilters] = useState<{ [key: string]: string }>(
    {},
  );

  // Filtered data based on search criteria
  const filteredData = useMemo(() => {
    return reinsurerData.filter((item) => {
      const matchesReinsurerID = item.reinsurerID
        .toLowerCase()
        .includes(searchReinsurerID.toLowerCase());
      const matchesReinsurerName = item.reinsurerName
        .toLowerCase()
        .includes(searchReinsurerName.toLowerCase());
      const matchesTreatyID = item.treatyID
        .toLowerCase()
        .includes(searchTreatyID.toLowerCase());
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
        matchesTreatyID &&
        matchesStartDate &&
        matchesEndDate &&
        matchesColumnFilters
      );
    });
  }, [
    searchReinsurerID,
    searchReinsurerName,
    searchTreatyID,
    searchStartDate,
    searchEndDate,
    columnFilters,
    reinsurerData,
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

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <div className="flex items-center gap-3 text-gray-600">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-lg">Loading reinsurer data...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 text-red-800">
                <h3 className="text-lg font-semibold">Error Loading Data</h3>
              </div>
              <p className="text-red-700 mt-2">
                Failed to load reinsurer data. Please try refreshing the page.
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="mt-4 border-red-300 text-red-700 hover:bg-red-50"
              >
                Refresh Page
              </Button>
            </div>
          )}

          {/* Content - only show when data is loaded */}
          {!isLoading && !error && (
            <>

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
                  Treaty ID
                </label>
                <Input
                  type="text"
                  placeholder="Search by Treaty ID"
                  value={searchTreatyID}
                  onChange={(e) => setSearchTreatyID(e.target.value)}
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
                  setSearchTreatyID("");
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
                    <TableHead className="font-semibold text-gray-900">
                      <div className="py-2">
                        Actions
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
                      <TableCell>{item.treatyID}</TableCell>
                      <TableCell>{item.quotaShare}</TableCell>
                      <TableCell>{item.cedingAllowance}</TableCell>
                      <TableCell>{item.expenseAllowance}</TableCell>
                      <TableCell>{item.periodStartDate}</TableCell>
                      <TableCell>{item.periodEndDate}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(`/policy-transactions/${item.treatyID}?start=${item.periodStartDate}&end=${item.periodEndDate}&reinsurer=${item.reinsurerID}`)
                          }
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-4 h-4" />
                          View Transactions
                        </Button>
                      </TableCell>
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
          {/* End of conditional content */}
          )}
        </div>
      </main>
    </div>
  );
};

export default ReinsurerDetails;