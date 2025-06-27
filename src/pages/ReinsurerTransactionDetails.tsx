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
import { ArrowLeft, Search, Filter, Loader2 } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// API response type
interface ApiReinsurerTransactionData {
  POLICY_NUMBER: string;
  PRODUCT_CODE: string;
  PRODUCT_NAME: string;
  TENOR: number;
  FIRM_NAME: string;
}

// Transformed data type for display
interface ReinsurerTransactionData {
  policyNumber: string;
  productCode: string;
  productName: string;
  tenor: number;
  firmName: string;
}

// API fetch function
const fetchReinsurerTransactionData = async (
  treatyId: string,
): Promise<ApiReinsurerTransactionData[]> => {
  // For now, return mock data since we don't have the actual API endpoint
  // In a real implementation, this would call an API endpoint like:
  // `https://2qiik3x7hi.execute-api.us-east-1.amazonaws.com/dev/getReinsurerTransactions/${treatyId}`

  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData: ApiReinsurerTransactionData[] = [
        {
          POLICY_NUMBER: "POL001234567",
          PRODUCT_CODE: "LI001",
          PRODUCT_NAME: "Term Life Insurance",
          TENOR: 20,
          FIRM_NAME: "Allstate Financial Services",
        },
        {
          POLICY_NUMBER: "POL001234568",
          PRODUCT_CODE: "LI002",
          PRODUCT_NAME: "Whole Life Insurance",
          TENOR: 30,
          FIRM_NAME: "Prudential Life Insurance",
        },
        {
          POLICY_NUMBER: "POL001234569",
          PRODUCT_CODE: "AN001",
          PRODUCT_NAME: "Fixed Annuity",
          TENOR: 15,
          FIRM_NAME: "MetLife Investment Solutions",
        },
        {
          POLICY_NUMBER: "POL001234570",
          PRODUCT_CODE: "AN002",
          PRODUCT_NAME: "Variable Annuity",
          TENOR: 25,
          FIRM_NAME: "New York Life Insurance",
        },
        {
          POLICY_NUMBER: "POL001234571",
          PRODUCT_CODE: "DI001",
          PRODUCT_NAME: "Disability Insurance",
          TENOR: 10,
          FIRM_NAME: "Northwestern Mutual",
        },
        {
          POLICY_NUMBER: "POL001234572",
          PRODUCT_CODE: "CI001",
          PRODUCT_NAME: "Critical Illness",
          TENOR: 20,
          FIRM_NAME: "Guardian Life Insurance",
        },
        {
          POLICY_NUMBER: "POL001234573",
          PRODUCT_CODE: "UL001",
          PRODUCT_NAME: "Universal Life",
          TENOR: 40,
          FIRM_NAME: "MassMutual Financial Group",
        },
        {
          POLICY_NUMBER: "POL001234574",
          PRODUCT_CODE: "TR001",
          PRODUCT_NAME: "Travel Insurance",
          TENOR: 1,
          FIRM_NAME: "Travelers Insurance",
        },
      ];
      resolve(mockData);
    }, 800);
  });
};

// Transform API data to display format
const transformApiData = (
  apiData: ApiReinsurerTransactionData[],
): ReinsurerTransactionData[] => {
  return apiData.map((item) => ({
    policyNumber: item.POLICY_NUMBER,
    productCode: item.PRODUCT_CODE,
    productName: item.PRODUCT_NAME,
    tenor: item.TENOR,
    firmName: item.FIRM_NAME,
  }));
};

const ReinsurerTransactionDetails = () => {
  const navigate = useNavigate();
  const { treatyID } = useParams<{ treatyID: string }>();
  const [searchParams] = useSearchParams();

  // Get reinsurer info from URL params
  const reinsurerID = searchParams.get("reinsurer") || "N/A";
  const reinsurerName = searchParams.get("reinsurerName") || "N/A";
  const startDate = searchParams.get("start") || "N/A";
  const endDate = searchParams.get("end") || "N/A";

  // Fetch data using React Query
  const {
    data: apiData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reinsurerTransactionData", treatyID],
    queryFn: () => fetchReinsurerTransactionData(treatyID || ""),
    enabled: !!treatyID,
  });

  // Transform API data
  const transactionData = useMemo(() => {
    if (!apiData) return [];
    return transformApiData(apiData);
  }, [apiData]);

  // Search states
  const [searchPolicyNumber, setSearchPolicyNumber] = useState("");
  const [searchProductCode, setSearchProductCode] = useState("");
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
    return transactionData.filter((item) => {
      const matchesPolicyNumber = item.policyNumber
        .toLowerCase()
        .includes(searchPolicyNumber.toLowerCase());
      const matchesProductCode = item.productCode
        .toLowerCase()
        .includes(searchProductCode.toLowerCase());
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
          return value.toString().toLowerCase().includes(filter.toLowerCase());
        },
      );

      return (
        matchesPolicyNumber &&
        matchesProductCode &&
        matchesProductName &&
        matchesFirmName &&
        matchesColumnFilters
      );
    });
  }, [
    searchPolicyNumber,
    searchProductCode,
    searchProductName,
    searchFirmName,
    columnFilters,
    transactionData,
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
            onClick={() => navigate("/reinsurer-details")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Reinsurer Details
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
              Reinsurance Transaction Details
            </h1>
            <p className="text-xl text-gray-600">
              Detailed transaction information for reinsurance products
            </p>
          </div>

          {/* Reinsurer Information Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h2 className="text-2xl font-bold text-blue-900 mb-3">
              Reinsurer Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Reinsurer Name
                </label>
                <div className="text-lg font-semibold text-blue-900">
                  {reinsurerName}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Treaty ID
                </label>
                <div className="text-lg font-semibold text-blue-900">
                  {treatyID}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Period Start Date
                </label>
                <div className="text-lg font-semibold text-blue-900">
                  {startDate}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Period End Date
                </label>
                <div className="text-lg font-semibold text-blue-900">
                  {endDate}
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-3 text-gray-600">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-lg">Loading transaction data...</span>
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
                Failed to load transaction data. Please try refreshing the page.
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
              <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-gray-600" />
                    <h3 className="text-base font-semibold text-gray-900">
                      Search Filters
                    </h3>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchProductCode("");
                      setSearchProductName("");
                      setColumnFilters({});
                      setCurrentPage(1);
                    }}
                    className="text-gray-600 h-7 px-3 text-xs"
                  >
                    Clear All
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 max-w-xs">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Product Code
                    </label>
                    <Input
                      type="text"
                      placeholder="Search by code..."
                      value={searchProductCode}
                      onChange={(e) => setSearchProductCode(e.target.value)}
                      className="w-full h-8 text-sm"
                    />
                  </div>

                  <div className="flex-1 max-w-sm">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Search by name..."
                      value={searchProductName}
                      onChange={(e) => setSearchProductName(e.target.value)}
                      className="w-full h-8 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Product Transaction Records
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
                        <TableHead className="font-semibold text-gray-900 w-32">
                          <div className="space-y-2">
                            <div>Product Code</div>
                            <Input
                              type="text"
                              placeholder="Filter..."
                              className="h-8 text-xs"
                              value={columnFilters.productCode || ""}
                              onChange={(e) =>
                                handleColumnFilter(
                                  "productCode",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900 w-64">
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
                        <TableHead className="font-semibold text-gray-900 w-24">
                          <div className="space-y-2">
                            <div>Tenor</div>
                            <Input
                              type="number"
                              placeholder="Filter..."
                              className="h-8 text-xs"
                              value={columnFilters.tenor || ""}
                              onChange={(e) =>
                                handleColumnFilter("tenor", e.target.value)
                              }
                            />
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900 w-28">
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
                        <TableHead className="font-semibold text-gray-900 w-32">
                          <div className="space-y-2">
                            <div>Ceding Allowance</div>
                            <Input
                              type="number"
                              step="0.0001"
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
                        <TableHead className="font-semibold text-gray-900 w-32">
                          <div className="space-y-2">
                            <div>Expense Allowance</div>
                            <Input
                              type="number"
                              step="0.0001"
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
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedData.map((item, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="font-medium w-32 text-center">
                            {item.productCode}
                          </TableCell>
                          <TableCell className="w-64 text-center">
                            {item.productName}
                          </TableCell>
                          <TableCell className="w-24 text-center">
                            {item.tenor}
                          </TableCell>
                          <TableCell className="w-28 text-center">
                            {item.quotaShare}
                          </TableCell>
                          <TableCell className="w-32 text-center">
                            {item.cedingAllowance}
                          </TableCell>
                          <TableCell className="w-32 text-center">
                            {item.expenseAllowance}
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
                  onClick={() => navigate("/reinsurer-details")}
                  className="bg-gray-800 text-gray-100 border-gray-800 hover:bg-gray-900"
                >
                  Return to Reinsurer Details
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReinsurerTransactionDetails;
