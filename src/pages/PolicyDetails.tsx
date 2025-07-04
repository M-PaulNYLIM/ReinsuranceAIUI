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
interface ApiPolicyData {
  POLICY_NUMBER: number;
  PRODUCT_NAME: string;
  RF_FIRM_NAME: string;
  ENDING_AV: string;
  RRCF_DATE_ADDED: string;
}

// Transformed data type for display
interface PolicyData {
  policyNumber: string;
  productName: string;
  firmName: string;
  applicationSignDate: string;
  accountValue: string;
  reinsuredAccountValue: string;
}

// API fetch function
const fetchPolicyData = async (): Promise<ApiPolicyData[]> => {
  const response = await fetch(
    "https://2qiik3x7hi.execute-api.us-east-1.amazonaws.com/dev/getGridDataPolicyLanding",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch policy data");
  }

  return response.json();
};

// Generate random status
const getRandomStatus = (): string => {
  const statuses = ["Active", "Pending", "Cancelled"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Transform API data to display format
const transformApiData = (apiData: ApiPolicyData[]): PolicyData[] => {
  return apiData.map((item) => {
    const accountValue = parseFloat(item.ENDING_AV);
    return {
      policyNumber: item.POLICY_NUMBER.toString(),
      productName: item.PRODUCT_NAME,
      firmName: item.RF_FIRM_NAME,
      applicationSignDate: new Date(item.RRCF_DATE_ADDED)
        .toISOString()
        .split("T")[0],
      accountValue: `$${accountValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      reinsuredAccountValue: `$${(accountValue * 0.25).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`, // 25% of account value as sample reinsured amount
    };
  });
};

const PolicyDetails = () => {
  const navigate = useNavigate();

  // Fetch data using React Query
  const {
    data: apiData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["policyData"],
    queryFn: fetchPolicyData,
  });

  // Transform API data
  const policyData = useMemo(() => {
    if (!apiData) return [];
    return transformApiData(apiData);
  }, [apiData]);

  // Search states
  const [searchPolicyNumber, setSearchPolicyNumber] = useState("");
  const [searchProductName, setSearchProductName] = useState("");
  const [searchFirmName, setSearchFirmName] = useState("");

  // Column filter states
  const [columnFilters, setColumnFilters] = useState<{ [key: string]: string }>(
    {},
  );

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  // Filtered data based on search criteria
  const filteredData = useMemo(() => {
    return policyData.filter((item) => {
      const matchesPolicyNumber = item.policyNumber
        .toLowerCase()
        .includes(searchPolicyNumber.toLowerCase());
      const matchesProductName = item.productName
        .toLowerCase()
        .includes(searchProductName.toLowerCase());
      const matchesFirmName = item.firmName
        .toLowerCase()
        .includes(searchFirmName.toLowerCase());

      // Apply column filters
      const matchesColumnFilters = Object.entries(columnFilters).every(
        ([column, filter]) => {
          if (!filter) return true;
          const value = item[column as keyof typeof item];
          return value.toLowerCase().includes(filter.toLowerCase());
        },
      );

      return (
        matchesPolicyNumber &&
        matchesProductName &&
        matchesFirmName &&
        matchesColumnFilters
      );
    });
  }, [
    searchPolicyNumber,
    searchProductName,
    searchFirmName,
    columnFilters,
    policyData,
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
      <main className="px-6 md:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Policy Details
            </h1>
            <p className="text-xl text-gray-600">
              Manage and view comprehensive reinsurance information about your
              insurance policies
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-3 text-gray-600">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-lg">Loading policy data...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-red-800">
                <h3 className="text-lg font-semibold">Error Loading Data</h3>
              </div>
              <p className="text-red-700 mt-2">
                Failed to load policy data. Please try refreshing the page.
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Policy Number
                    </label>
                    <Input
                      type="text"
                      placeholder="Search by Policy Number"
                      value={searchPolicyNumber}
                      onChange={(e) => setSearchPolicyNumber(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Search by Product Name"
                      value={searchProductName}
                      onChange={(e) => setSearchProductName(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Firm Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Search by Firm Name"
                      value={searchFirmName}
                      onChange={(e) => setSearchFirmName(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchPolicyNumber("");
                      setSearchProductName("");
                      setSearchFirmName("");
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
                      Policy Records
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
                        <TableHead className="font-semibold text-gray-900 w-32 text-center">
                          <div className="space-y-2">
                            <div>Policy Number</div>
                            <Input
                              type="number"
                              placeholder="Filter..."
                              className="h-8 text-xs"
                              value={columnFilters.policyNumber || ""}
                              onChange={(e) =>
                                handleColumnFilter(
                                  "policyNumber",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900 w-48 text-center">
                          <div className="space-y-2">
                            <div>Product Name</div>
                            <Input
                              type="text"
                              placeholder="Filter..."
                              className="h-8 text-xs"
                              value={columnFilters.productName || ""}
                              onChange={(e) =>
                                handleColumnFilter(
                                  "productName",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900 w-36 text-center">
                          <div className="space-y-2">
                            <div>Firm Name</div>
                            <Input
                              type="text"
                              placeholder="Filter..."
                              className="h-8 text-xs"
                              value={columnFilters.firmName || ""}
                              onChange={(e) =>
                                handleColumnFilter("firmName", e.target.value)
                              }
                            />
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900 w-36 text-center">
                          <div className="space-y-2">
                            <div>Application Sign Date</div>
                            <Input
                              type="date"
                              className="h-8 text-xs"
                              value={columnFilters.applicationSignDate || ""}
                              onChange={(e) =>
                                handleColumnFilter(
                                  "applicationSignDate",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900 w-32 text-center">
                          <div className="space-y-2">
                            <div>Account Value</div>
                            <Input
                              type="text"
                              placeholder="Filter..."
                              className="h-8 text-xs"
                              value={columnFilters.accountValue || ""}
                              onChange={(e) =>
                                handleColumnFilter(
                                  "accountValue",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900 w-36 text-center">
                          <div className="space-y-2">
                            <div>Reinsured Account Value</div>
                            <Input
                              type="text"
                              placeholder="Filter..."
                              className="h-8 text-xs"
                              value={columnFilters.reinsuredAccountValue || ""}
                              onChange={(e) =>
                                handleColumnFilter(
                                  "reinsuredAccountValue",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedData.map((item, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="font-medium w-32 text-center">
                            {item.policyNumber}
                          </TableCell>
                          <TableCell className="w-48 text-center">
                            {item.productName}
                          </TableCell>
                          <TableCell className="w-36 text-center">
                            {item.firmName}
                          </TableCell>
                          <TableCell className="w-36 text-center">
                            {item.applicationSignDate}
                          </TableCell>
                          <TableCell className="font-medium w-32 text-center">
                            {item.accountValue}
                          </TableCell>
                          <TableCell className="font-medium w-36 text-center">
                            {item.reinsuredAccountValue}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {filteredData.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No policies found matching your search criteria.
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

              <div className="text-center mt-8">
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

export default PolicyDetails;
