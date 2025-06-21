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
import { ArrowLeft, Search, Filter, FileText } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

// Sample policy transaction data - in a real app this would come from an API
const generateSampleTransactions = (treatyID: string) => [
  {
    policyNumber: "POL001",
    transactionID: "TXN001",
    transactionType: "New Business",
    transactionDate: "2024-01-15",
    premium: "$15,000.00",
    commission: "$2,250.00",
    quotaSharePremium: "$3,750.00",
    cedingCommission: "$562.50",
    netPremium: "$3,187.50",
    policyEffectiveDate: "2024-01-01",
    policyExpirationDate: "2024-12-31",
    insuredName: "ABC Manufacturing Corp",
    treatyID: treatyID,
  },
  {
    policyNumber: "POL002",
    transactionID: "TXN002",
    transactionType: "Endorsement",
    transactionDate: "2024-02-01",
    premium: "$5,000.00",
    commission: "$750.00",
    quotaSharePremium: "$1,250.00",
    cedingCommission: "$187.50",
    netPremium: "$1,062.50",
    policyEffectiveDate: "2024-01-01",
    policyExpirationDate: "2024-12-31",
    insuredName: "XYZ Construction LLC",
    treatyID: treatyID,
  },
  {
    policyNumber: "POL003",
    transactionID: "TXN003",
    transactionType: "Cancellation",
    transactionDate: "2024-03-15",
    premium: "-$8,000.00",
    commission: "-$1,200.00",
    quotaSharePremium: "-$2,000.00",
    cedingCommission: "-$300.00",
    netPremium: "-$1,700.00",
    policyEffectiveDate: "2024-01-01",
    policyExpirationDate: "2024-12-31",
    insuredName: "Global Logistics Inc",
    treatyID: treatyID,
  },
  {
    policyNumber: "POL004",
    transactionID: "TXN004",
    transactionType: "Renewal",
    transactionDate: "2024-04-01",
    premium: "$22,000.00",
    commission: "$3,300.00",
    quotaSharePremium: "$5,500.00",
    cedingCommission: "$825.00",
    netPremium: "$4,675.00",
    policyEffectiveDate: "2024-04-01",
    policyExpirationDate: "2025-03-31",
    insuredName: "Tech Solutions Ltd",
    treatyID: treatyID,
  },
  {
    policyNumber: "POL005",
    transactionID: "TXN005",
    transactionType: "New Business",
    transactionDate: "2024-05-10",
    premium: "$18,500.00",
    commission: "$2,775.00",
    quotaSharePremium: "$4,625.00",
    cedingCommission: "$693.75",
    netPremium: "$3,931.25",
    policyEffectiveDate: "2024-05-01",
    policyExpirationDate: "2025-04-30",
    insuredName: "Healthcare Partners",
    treatyID: treatyID,
  },
];

const PolicyTransactionDetails = () => {
  const navigate = useNavigate();
  const { treatyID, policyNumber } = useParams<{
    treatyID?: string;
    policyNumber?: string;
  }>();
  const [searchParams] = useSearchParams();

  const periodStart = searchParams.get("start") || "";
  const periodEnd = searchParams.get("end") || "";
  const reinsurerID = searchParams.get("reinsurer") || "";
  const policyParam = searchParams.get("policy") || "";

  // Search states
  const [searchPolicyNumber, setSearchPolicyNumber] = useState("");
  const [searchTransactionType, setSearchTransactionType] = useState("");
  const [searchInsuredName, setSearchInsuredName] = useState("");

  // Column filter states
  const [columnFilters, setColumnFilters] = useState<{ [key: string]: string }>(
    {},
  );

  // Get sample transaction data
  const sampleTransactions = useMemo(
    () => generateSampleTransactions(treatyID || ""),
    [treatyID],
  );

  // Filtered data based on search criteria
  const filteredData = useMemo(() => {
    return sampleTransactions.filter((item) => {
      const matchesPolicyNumber = item.policyNumber
        .toLowerCase()
        .includes(searchPolicyNumber.toLowerCase());
      const matchesTransactionType = item.transactionType
        .toLowerCase()
        .includes(searchTransactionType.toLowerCase());
      const matchesInsuredName = item.insuredName
        .toLowerCase()
        .includes(searchInsuredName.toLowerCase());

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
        matchesTransactionType &&
        matchesInsuredName &&
        matchesColumnFilters
      );
    });
  }, [
    searchPolicyNumber,
    searchTransactionType,
    searchInsuredName,
    columnFilters,
    sampleTransactions,
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
      <main className="px-6 md:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Policy Transaction Details
            </h1>
            <div className="text-xl text-gray-600 space-y-2">
              {policyNumber && (
                <p>
                  Policy Number:{" "}
                  <span className="font-semibold text-gray-900">
                    {policyNumber}
                  </span>
                </p>
              )}
              {treatyID && (
                <p>
                  Treaty ID:{" "}
                  <span className="font-semibold text-gray-900">
                    {treatyID}
                  </span>
                </p>
              )}
              {reinsurerID && (
                <p>
                  Reinsurer ID:{" "}
                  <span className="font-semibold text-gray-900">
                    {reinsurerID}
                  </span>
                </p>
              )}
              {policyParam && (
                <p>
                  Policy:{" "}
                  <span className="font-semibold text-gray-900">
                    {policyParam}
                  </span>
                </p>
              )}
              <p>
                Period:{" "}
                <span className="font-semibold text-gray-900">
                  {periodStart} to {periodEnd}
                </span>
              </p>
            </div>
          </div>

          {/* Search Filters */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
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
                  Transaction Type
                </label>
                <Input
                  type="text"
                  placeholder="Search by Transaction Type"
                  value={searchTransactionType}
                  onChange={(e) => setSearchTransactionType(e.target.value)}
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
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchPolicyNumber("");
                  setSearchTransactionType("");
                  setSearchInsuredName("");
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
                  Policy Transactions ({filteredData.length})
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
                        <div>Transaction ID</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.transactionID || ""}
                          onChange={(e) =>
                            handleColumnFilter("transactionID", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Transaction Type</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.transactionType || ""}
                          onChange={(e) =>
                            handleColumnFilter(
                              "transactionType",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Transaction Date</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.transactionDate || ""}
                          onChange={(e) =>
                            handleColumnFilter(
                              "transactionDate",
                              e.target.value,
                            )
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
                        <div>Quota Share Premium</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.quotaSharePremium || ""}
                          onChange={(e) =>
                            handleColumnFilter(
                              "quotaSharePremium",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Ceding Commission</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.cedingCommission || ""}
                          onChange={(e) =>
                            handleColumnFilter(
                              "cedingCommission",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="space-y-2">
                        <div>Net Premium</div>
                        <Input
                          type="text"
                          placeholder="Filter..."
                          className="h-8 text-xs"
                          value={columnFilters.netPremium || ""}
                          onChange={(e) =>
                            handleColumnFilter("netPremium", e.target.value)
                          }
                        />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((transaction, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {transaction.policyNumber}
                      </TableCell>
                      <TableCell>{transaction.transactionID}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            transaction.transactionType === "New Business"
                              ? "bg-green-100 text-green-800"
                              : transaction.transactionType === "Renewal"
                                ? "bg-blue-100 text-blue-800"
                                : transaction.transactionType === "Endorsement"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : transaction.transactionType ===
                                      "Cancellation"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {transaction.transactionType}
                        </span>
                      </TableCell>
                      <TableCell>{transaction.transactionDate}</TableCell>
                      <TableCell>{transaction.insuredName}</TableCell>
                      <TableCell className="font-medium">
                        {transaction.premium}
                      </TableCell>
                      <TableCell className="font-medium">
                        {transaction.quotaSharePremium}
                      </TableCell>
                      <TableCell>{transaction.cedingCommission}</TableCell>
                      <TableCell className="font-medium">
                        {transaction.netPremium}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No policy transactions found matching your search criteria.
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-8">
            <Button
              onClick={() => navigate("/reinsurer-details")}
              className="bg-gray-800 text-gray-100 border-gray-800 hover:bg-gray-900"
            >
              Return to Reinsurer Details
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PolicyTransactionDetails;
