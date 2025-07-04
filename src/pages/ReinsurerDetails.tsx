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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Search, Filter, Eye, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// API response type
interface ApiReinsurerData {
  REINSURER_ID?: number | null;
  REINSURER_NAME?: string | null;
  TREATY_ID?: number | null;
  QUOTA_SHARE?: string | null;
  CEDEING_ALL_PREM?: string | null;
  EXPENSE_ALL_PREM?: string | null;
  PER_START_DATE?: string | null;
  PER_END_DATE?: string | null;
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
  try {
    const response = await fetch(
      "https://2qiik3x7hi.execute-api.us-east-1.amazonaws.com/dev/getGridDataReinsurerLanding",
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch reinsurer data: ${response.status}`);
    }

    const data = await response.json();

    // Ensure we always return an array
    if (!Array.isArray(data)) {
      console.warn("API returned non-array data:", data);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching reinsurer data:", error);
    throw error;
  }
};

// Transform API data to display format
const transformApiData = (apiData: ApiReinsurerData[]): ReinsurerData[] => {
  return apiData.map((item) => ({
    reinsurerID: item.REINSURER_ID?.toString() || "N/A",
    reinsurerName: item.REINSURER_NAME || "N/A",
    treatyID: item.TREATY_ID?.toString() || "N/A",
    quotaShare: item.QUOTA_SHARE
      ? `${parseFloat(item.QUOTA_SHARE).toFixed(2)}%`
      : "N/A",
    cedingAllowance: item.CEDEING_ALL_PREM
      ? parseFloat(item.CEDEING_ALL_PREM).toFixed(4)
      : "N/A",
    expenseAllowance: item.EXPENSE_ALL_PREM
      ? parseFloat(item.EXPENSE_ALL_PREM).toFixed(4)
      : "N/A",
    periodStartDate: item.PER_START_DATE
      ? new Date(item.PER_START_DATE).toISOString().split("T")[0]
      : "N/A",
    periodEndDate: item.PER_END_DATE
      ? new Date(item.PER_END_DATE).toISOString().split("T")[0]
      : "N/A",
  }));
};

const ReinsurerDetails = () => {
  const navigate = useNavigate();

  // Fetch data using React Query
  const {
    data: apiData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reinsurerData"],
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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

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

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, rowsPerPage]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startRecord =
    filteredData.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endRecord = Math.min(currentPage * rowsPerPage, filteredData.length);

  const handleColumnFilter = (column: string, value: string) => {
    setColumnFilters((prev) => ({
      ...prev,
      [column]: value,
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
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
      <main className="px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Reinsurer Details
            </h1>
            <p className="text-xl text-gray-600">
              Manage and view comprehensive information about your reinsurance
              partners
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
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
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Search Filters
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
                      setSearchReinsurerName("");
                      setSearchTreatyID("");
                      setSearchStartDate("");
                      setSearchEndDate("");
                      setColumnFilters({});
                      setCurrentPage(1);
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
                      Reinsurer Records
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">Show:</span>
                        <Select
                          value={rowsPerPage.toString()}
                          onValueChange={(value) =>
                            handleRowsPerPageChange(Number(value))
                          }
                        >
                          <SelectTrigger className="w-20 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-gray-600">rows</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Filter className="w-4 h-4" />
                        Click column headers to filter
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-gray-900 w-24">
                          <div className="space-y-2">
                            <div>Reinsurer ID</div>
                            <Input
                              type="number"
                              placeholder="Filter..."
                              className="h-8 text-xs"
                              value={columnFilters.reinsurerID || ""}
                              onChange={(e) =>
                                handleColumnFilter(
                                  "reinsurerID",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900 w-64">
                          <div className="space-y-2">
                            <div>Reinsurer Name</div>
                            <Input
                              type="text"
                              placeholder="Filter..."
                              className="h-8 text-xs"
                              value={columnFilters.reinsurerName || ""}
                              onChange={(e) =>
                                handleColumnFilter(
                                  "reinsurerName",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900 w-20">
                          <div className="space-y-2">
                            <div>Treaty ID</div>
                            <Input
                              type="number"
                              placeholder="Filter..."
                              className="h-8 text-xs"
                              value={columnFilters.treatyID || ""}
                              onChange={(e) =>
                                handleColumnFilter("treatyID", e.target.value)
                              }
                            />
                          </div>
                        </TableHead>

                        <TableHead className="font-semibold text-gray-900 w-32">
                          <div className="space-y-2">
                            <div>Period Start Date</div>
                            <Input
                              type="date"
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
                        <TableHead className="font-semibold text-gray-900 w-32">
                          <div className="space-y-2">
                            <div>Period End Date</div>
                            <Input
                              type="date"
                              className="h-8 text-xs"
                              value={columnFilters.periodEndDate || ""}
                              onChange={(e) =>
                                handleColumnFilter(
                                  "periodEndDate",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900 w-32">
                          <div className="py-2">Actions</div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedData.map((item, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="font-medium w-24 text-center">
                            {item.reinsurerID}
                          </TableCell>
                          <TableCell className="w-64 text-center">
                            {item.reinsurerName}
                          </TableCell>
                          <TableCell className="w-20 text-center">
                            {item.treatyID}
                          </TableCell>
                          <TableCell className="w-32 text-center">
                            {item.periodStartDate}
                          </TableCell>
                          <TableCell className="w-32 text-center">
                            {item.periodEndDate}
                          </TableCell>
                          <TableCell className="w-32 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                navigate(
                                  `/reinsurer-transactions/${item.treatyID}?start=${item.periodStartDate}&end=${item.periodEndDate}&reinsurer=${item.reinsurerID}&reinsurerName=${encodeURIComponent(item.reinsurerName)}`,
                                )
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

                {/* Pagination Controls */}
                {filteredData.length > 0 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      Showing {startRecord} to {endRecord} of{" "}
                      {filteredData.length} results
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="text-sm"
                      >
                        Previous
                      </Button>

                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            let pageNumber;
                            if (totalPages <= 5) {
                              pageNumber = i + 1;
                            } else if (currentPage <= 3) {
                              pageNumber = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNumber = totalPages - 4 + i;
                            } else {
                              pageNumber = currentPage - 2 + i;
                            }

                            return (
                              <Button
                                key={pageNumber}
                                variant={
                                  currentPage === pageNumber
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => setCurrentPage(pageNumber)}
                                className="w-8 h-8 text-sm"
                              >
                                {pageNumber}
                              </Button>
                            );
                          },
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="text-sm"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center mt-4">
                <Button
                  onClick={() => navigate("/")}
                  className="bg-gray-800 text-gray-100 border-gray-800 hover:bg-gray-900"
                >
                  Return to Dashboard
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReinsurerDetails;
