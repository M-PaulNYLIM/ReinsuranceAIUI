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
import { ArrowLeft, Search, Filter, FileText, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample policy data - in a real app this would come from an API
const samplePolicyData = [
  {
    policyNumber: "POL-2024-001",
    policyholderName: "ABC Manufacturing Corp",
    effectiveDate: "2024-01-01",
    expirationDate: "2024-12-31",
    premium: "$45,000.00",
    status: "Active",
    lineOfBusiness: "Commercial Property",
    coverage: "$2,500,000",
    deductible: "$5,000",
  },
  {
    policyNumber: "POL-2024-002",
    policyholderName: "XYZ Construction LLC",
    effectiveDate: "2024-02-15",
    expirationDate: "2025-02-14",
    premium: "$32,000.00",
    status: "Active",
    lineOfBusiness: "General Liability",
    coverage: "$1,000,000",
    deductible: "$2,500",
  },
  {
    policyNumber: "POL-2024-003",
    policyholderName: "Global Logistics Inc",
    effectiveDate: "2024-01-01",
    expirationDate: "2024-12-31",
    premium: "$28,500.00",
    status: "Cancelled",
    lineOfBusiness: "Commercial Auto",
    coverage: "$750,000",
    deductible: "$1,000",
  },
  {
    policyNumber: "POL-2024-004",
    policyholderName: "Tech Solutions Ltd",
    effectiveDate: "2024-03-01",
    expirationDate: "2025-02-28",
    premium: "$55,000.00",
    status: "Active",
    lineOfBusiness: "Professional Liability",
    coverage: "$5,000,000",
    deductible: "$10,000",
  },
  {
    policyNumber: "POL-2024-005",
    policyholderName: "Healthcare Partners",
    effectiveDate: "2024-01-15",
    expirationDate: "2024-12-31",
    premium: "$72,000.00",
    status: "Active",
    lineOfBusiness: "Medical Malpractice",
    coverage: "$3,000,000",
    deductible: "$25,000",
  },
];

const PolicyDetails = () => {
  const navigate = useNavigate();

  // Search states
  const [searchPolicyNumber, setSearchPolicyNumber] = useState("");
  const [searchPolicyholderName, setSearchPolicyholderName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchLineOfBusiness, setSearchLineOfBusiness] = useState("");

  // Column filter states
  const [columnFilters, setColumnFilters] = useState<{ [key: string]: string }>(
    {},
  );

  // Filtered data based on search criteria
  const filteredData = useMemo(() => {
    return samplePolicyData.filter((item) => {
      const matchesPolicyNumber = item.policyNumber
        .toLowerCase()
        .includes(searchPolicyNumber.toLowerCase());
      const matchesPolicyholderName = item.policyholderName
        .toLowerCase()
        .includes(searchPolicyholderName.toLowerCase());
      const matchesStatus = item.status
        .toLowerCase()
        .includes(searchStatus.toLowerCase());
      const matchesLineOfBusiness = item.lineOfBusiness
        .toLowerCase()
        .includes(searchLineOfBusiness.toLowerCase());

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
        matchesPolicyholderName &&
        matchesStatus &&
        matchesLineOfBusiness &&
        matchesColumnFilters
      );
    });
  }, [
    searchPolicyNumber,
    searchPolicyholderName,
    searchStatus,
    searchLineOfBusiness,
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
              Policy Details
            </h1>
            <p className="text-xl text-gray-600">
              Manage and view comprehensive information about your insurance
              policies
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
                  Policyholder Name
                </label>
                <Input
                  type="text"
                  placeholder="Search by Policyholder Name"
                  value={searchPolicyholderName}
                  onChange={(e) => setSearchPolicyholderName(e.target.value)}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Line of Business
                </label>
                <Input
                  type="text"
                  placeholder="Search by Line of Business"
                  value={searchLineOfBusiness}
                  onChange={(e) => setSearchLineOfBusiness(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchPolicyNumber("");
                  setSearchPolicyholderName("");
                  setSearchStatus("");
                  setSearchLineOfBusiness("");
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
                  Policy Records ({filteredData.length})
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
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Policyholder Name</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.policyholderName || ""}
                          onChange={(e) =>
                            handleColumnFilter(
                              "policyholderName",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Effective Date</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.effectiveDate || ""}
                          onChange={(e) =>
                            handleColumnFilter("effectiveDate", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Expiration Date</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.expirationDate || ""}
                          onChange={(e) =>
                            handleColumnFilter("expirationDate", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Premium</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.premium || ""}
                          onChange={(e) =>
                            handleColumnFilter("premium", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
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
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Line of Business</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.lineOfBusiness || ""}
                          onChange={(e) =>
                            handleColumnFilter("lineOfBusiness", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Coverage</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.coverage || ""}
                          onChange={(e) =>
                            handleColumnFilter("coverage", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="py-2">Actions</div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {item.policyNumber}
                      </TableCell>
                      <TableCell>{item.policyholderName}</TableCell>
                      <TableCell>{item.effectiveDate}</TableCell>
                      <TableCell>{item.expirationDate}</TableCell>
                      <TableCell className="font-medium">
                        {item.premium}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            item.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Cancelled"
                                ? "bg-red-100 text-red-800"
                                : item.status === "Expired"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell>{item.lineOfBusiness}</TableCell>
                      <TableCell className="font-medium">
                        {item.coverage}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(`/policy-details/${item.policyNumber}`)
                          }
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                          <FileText className="w-4 h-4" />
                          View Policy
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
