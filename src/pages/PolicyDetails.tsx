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

// Sample policy data - in a real app this would come from an API
const sampleData = [
  {
    policyID: "POL001",
    policyNumber: "INS-2024-001",
    insuredName: "TechCorp Industries",
    productLine: "Property Insurance",
    policyStatus: "Active",
    premiumAmount: "$125,000",
    sumInsured: "$5,000,000",
    effectiveDate: "2024-01-01",
    expiryDate: "2024-12-31",
    reinsurerID: "RE001",
    quotaShare: "25%",
  },
  {
    policyID: "POL002",
    policyNumber: "INS-2024-002",
    insuredName: "Maritime Solutions Ltd",
    productLine: "Marine Insurance",
    policyStatus: "Active",
    premiumAmount: "$85,000",
    sumInsured: "$3,200,000",
    effectiveDate: "2024-01-15",
    expiryDate: "2024-12-31",
    reinsurerID: "RE002",
    quotaShare: "30%",
  },
  {
    policyID: "POL003",
    policyNumber: "INS-2024-003",
    insuredName: "Global Manufacturing Co",
    productLine: "Liability Insurance",
    policyStatus: "Pending",
    premiumAmount: "$95,000",
    sumInsured: "$2,800,000",
    effectiveDate: "2024-02-01",
    expiryDate: "2024-12-31",
    reinsurerID: "RE003",
    quotaShare: "20%",
  },
  {
    policyID: "POL004",
    policyNumber: "INS-2024-004",
    insuredName: "Healthcare Systems Inc",
    productLine: "Professional Indemnity",
    policyStatus: "Active",
    premiumAmount: "$150,000",
    sumInsured: "$7,500,000",
    effectiveDate: "2024-01-01",
    expiryDate: "2024-12-31",
    reinsurerID: "RE004",
    quotaShare: "35%",
  },
  {
    policyID: "POL005",
    policyNumber: "INS-2024-005",
    insuredName: "Energy Solutions Ltd",
    productLine: "Engineering Insurance",
    policyStatus: "Active",
    premiumAmount: "$110,000",
    sumInsured: "$4,200,000",
    effectiveDate: "2024-03-01",
    expiryDate: "2024-12-31",
    reinsurerID: "RE005",
    quotaShare: "22%",
  },
  {
    policyID: "POL006",
    policyNumber: "INS-2024-006",
    insuredName: "Retail Chain Group",
    productLine: "Commercial Property",
    policyStatus: "Expired",
    premiumAmount: "$75,000",
    sumInsured: "$2,100,000",
    effectiveDate: "2023-01-01",
    expiryDate: "2023-12-31",
    reinsurerID: "RE001",
    quotaShare: "25%",
  },
];

const PolicyDetails = () => {
  const navigate = useNavigate();

  // Search states
  const [searchPolicyID, setSearchPolicyID] = useState("");
  const [searchInsuredName, setSearchInsuredName] = useState("");
  const [searchEffectiveDate, setSearchEffectiveDate] = useState("");
  const [searchExpiryDate, setSearchExpiryDate] = useState("");

  // Column filter states
  const [columnFilters, setColumnFilters] = useState<{ [key: string]: string }>(
    {},
  );

  // Filtered data based on search criteria
  const filteredData = useMemo(() => {
    return sampleData.filter((item) => {
      const matchesPolicyID = item.policyID
        .toLowerCase()
        .includes(searchPolicyID.toLowerCase());
      const matchesInsuredName = item.insuredName
        .toLowerCase()
        .includes(searchInsuredName.toLowerCase());
      const matchesEffectiveDate =
        !searchEffectiveDate || item.effectiveDate >= searchEffectiveDate;
      const matchesExpiryDate =
        !searchExpiryDate || item.expiryDate <= searchExpiryDate;

      // Apply column filters
      const matchesColumnFilters = Object.entries(columnFilters).every(
        ([column, filter]) => {
          if (!filter) return true;
          const value = item[column as keyof typeof item];
          return value.toLowerCase().includes(filter.toLowerCase());
        },
      );

      return (
        matchesPolicyID &&
        matchesInsuredName &&
        matchesEffectiveDate &&
        matchesExpiryDate &&
        matchesColumnFilters
      );
    });
  }, [
    searchPolicyID,
    searchInsuredName,
    searchEffectiveDate,
    searchExpiryDate,
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
              policies and their reinsurance coverage
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
                  Policy ID
                </label>
                <Input
                  type="text"
                  placeholder="Search by Policy ID"
                  value={searchPolicyID}
                  onChange={(e) => setSearchPolicyID(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insured Name
                </label>
                <Input
                  type="text"
                  placeholder="Search by Insured Name"
                  value={searchInsuredName}
                  onChange={(e) => setSearchInsuredName(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Effective Date
                </label>
                <Input
                  type="date"
                  value={searchEffectiveDate}
                  onChange={(e) => setSearchEffectiveDate(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <Input
                  type="date"
                  value={searchExpiryDate}
                  onChange={(e) => setSearchExpiryDate(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchPolicyID("");
                  setSearchInsuredName("");
                  setSearchEffectiveDate("");
                  setSearchExpiryDate("");
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
                        <div>Policy ID</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.policyID || ""}
                          onChange={(e) =>
                            handleColumnFilter("policyID", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
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
                        <div>Insured Name</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.insuredName || ""}
                          onChange={(e) =>
                            handleColumnFilter("insuredName", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Product Line</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.productLine || ""}
                          onChange={(e) =>
                            handleColumnFilter("productLine", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Policy Status</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.policyStatus || ""}
                          onChange={(e) =>
                            handleColumnFilter("policyStatus", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Premium Amount</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.premiumAmount || ""}
                          onChange={(e) =>
                            handleColumnFilter("premiumAmount", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Sum Insured</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.sumInsured || ""}
                          onChange={(e) =>
                            handleColumnFilter("sumInsured", e.target.value)
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
                        <div>Expiry Date</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.expiryDate || ""}
                          onChange={(e) =>
                            handleColumnFilter("expiryDate", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {item.policyID}
                      </TableCell>
                      <TableCell>{item.policyNumber}</TableCell>
                      <TableCell>{item.insuredName}</TableCell>
                      <TableCell>{item.productLine}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.policyStatus === "Active"
                              ? "bg-green-100 text-green-800"
                              : item.policyStatus === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.policyStatus}
                        </span>
                      </TableCell>
                      <TableCell>{item.premiumAmount}</TableCell>
                      <TableCell>{item.sumInsured}</TableCell>
                      <TableCell>{item.effectiveDate}</TableCell>
                      <TableCell>{item.expiryDate}</TableCell>
                      <TableCell>{item.reinsurerID}</TableCell>
                      <TableCell>{item.quotaShare}</TableCell>
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

export default PolicyDetails;
