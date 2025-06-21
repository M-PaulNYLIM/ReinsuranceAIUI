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

// Sample policy data - in a real app this would come from an API
const samplePolicyData = [
  {
    policyNumber: "POL-2024-001",
    productName: "Variable Universal Life",
    firmName: "ABC Financial Advisors",
    accountValue: "$125,450.00",
    applicationSignDate: "2024-01-15",
    status: "Active",
  },
  {
    policyNumber: "POL-2024-002",
    productName: "Term Life Insurance",
    firmName: "XYZ Investment Group",
    accountValue: "$87,230.00",
    applicationSignDate: "2024-02-03",
    status: "Active",
  },
  {
    policyNumber: "POL-2024-003",
    productName: "Whole Life Insurance",
    firmName: "Global Wealth Management",
    accountValue: "$156,780.00",
    applicationSignDate: "2024-01-28",
    status: "Pending",
  },
  {
    policyNumber: "POL-2024-004",
    productName: "Universal Life Insurance",
    firmName: "Premier Financial Services",
    accountValue: "$203,560.00",
    applicationSignDate: "2024-03-12",
    status: "Active",
  },
  {
    policyNumber: "POL-2024-005",
    productName: "Variable Life Insurance",
    firmName: "Elite Insurance Partners",
    accountValue: "$98,440.00",
    applicationSignDate: "2024-02-20",
    status: "Cancelled",
  },
  {
    policyNumber: "POL-2024-006",
    productName: "Term Life Insurance",
    firmName: "Trusted Advisors LLC",
    accountValue: "$134,670.00",
    applicationSignDate: "2024-03-05",
    status: "Active",
  },
  {
    policyNumber: "POL-2024-007",
    productName: "Variable Universal Life",
    firmName: "Strategic Financial Group",
    accountValue: "$189,320.00",
    applicationSignDate: "2024-01-10",
    status: "Active",
  },
  {
    policyNumber: "POL-2024-008",
    productName: "Whole Life Insurance",
    firmName: "Apex Investment Solutions",
    accountValue: "$112,890.00",
    applicationSignDate: "2024-02-14",
    status: "Pending",
  },
];

const PolicyDetails = () => {
  const navigate = useNavigate();

  // Search states
  const [searchPolicyNumber, setSearchPolicyNumber] = useState("");
  const [searchProductName, setSearchProductName] = useState("");
  const [searchFirmName, setSearchFirmName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  // Column filter states
  const [columnFilters, setColumnFilters] = useState<{ [key: string]: string }>(
    {},
  );

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  // Filtered data based on search criteria
  const filteredData = useMemo(() => {
    return samplePolicyData.filter((item) => {
      const matchesPolicyNumber = item.policyNumber
        .toLowerCase()
        .includes(searchPolicyNumber.toLowerCase());
      const matchesProductName = item.productName
        .toLowerCase()
        .includes(searchProductName.toLowerCase());
      const matchesFirmName = item.firmName
        .toLowerCase()
        .includes(searchFirmName.toLowerCase());
      const matchesStatus = item.status
        .toLowerCase()
        .includes(searchStatus.toLowerCase());

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
        matchesStatus &&
        matchesColumnFilters
      );
    });
  }, [
    searchPolicyNumber,
    searchProductName,
    searchFirmName,
    searchStatus,
    columnFilters,
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
              Policy Details
            </h1>
            <p className="text-xl text-gray-600">
              Manage and view comprehensive reinsurance information about your
              insurance policies
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <Input
                  type="text"
                  placeholder="Search by Status"
                  value={searchStatus}
                  onChange={(e) => setSearchStatus(e.target.value)}
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
                  setSearchStatus("");
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
                    <TableHead className="font-semibold text-gray-900 w-32">
                      <div className="space-y-2">
                        <div>Policy Number</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.policyNumber || ""}
                          onChange={(e) =>
                            handleColumnFilter("policyNumber", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900 w-48">
                      <div className="space-y-2">
                        <div>Product Name</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.productName || ""}
                          onChange={(e) =>
                            handleColumnFilter("productName", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900 w-48">
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
                    <TableHead className="font-semibold text-gray-900 w-32">
                      <div className="space-y-2">
                        <div>Account Value</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.accountValue || ""}
                          onChange={(e) =>
                            handleColumnFilter("accountValue", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900 w-36">
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
                    <TableHead className="font-semibold text-gray-900 w-24">
                      <div className="space-y-2">
                        <div>Status</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.status || ""}
                          onChange={(e) =>
                            handleColumnFilter("status", e.target.value)
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
                      <TableCell className="font-medium w-32">
                        {item.policyNumber}
                      </TableCell>
                      <TableCell className="w-48">{item.productName}</TableCell>
                      <TableCell className="w-48">{item.firmName}</TableCell>
                      <TableCell className="font-medium w-32">
                        {item.accountValue}
                      </TableCell>
                      <TableCell className="w-36">
                        {item.applicationSignDate}
                      </TableCell>
                      <TableCell className="w-24">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            item.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Cancelled"
                                ? "bg-red-100 text-red-800"
                                : item.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="w-32">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(
                              `/policy-transactions/TREATY-001?start=${item.applicationSignDate}&end=${item.applicationSignDate}&reinsurer=RE001&policy=${item.policyNumber}`,
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
                  No policies found matching your search criteria.
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {filteredData.length > 0 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {startRecord} to {endRecord} of {filteredData.length}{" "}
                  results
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="text-sm"
                  >
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                            currentPage === pageNumber ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setCurrentPage(pageNumber)}
                          className="w-8 h-8 text-sm"
                        >
                          {pageNumber}
                        </Button>
                      );
                    })}
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
        </div>
      </main>
    </div>
  );
};

export default PolicyDetails;
