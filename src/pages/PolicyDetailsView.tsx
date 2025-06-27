import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// API response types
interface PolicyLevelData {
  recordCreateDate: string;
  policyNumber: string;
  issueState: string;
  productName: string;
  productCode: string;
  productTenor: number;
  productChannel: string;
  periodType: string;
  periodStartDate: string;
  periodEndDate: string;
  totalPremiumsForPeriod: string;
  totalPartialSurrender: string;
  totalSurrender: string;
  annuitization: string;
  death: string;
  transfers: string;
  fees: string;
  partialSurrenderCharge: string;
  surrenderCharge: string;
  marketValueAdjustments: string;
  totalInterestEarned: string;
  totalCommissionPaid: string;
  totalDeathPayments: string;
  totalInterestClaims: string;
  totalDeathClaims: string;
  other: string;
  startingAccumulationValue: string;
  endingAccumulationValue: string;
}

interface ReinsurerLevelData {
  reinsurerName: string;
  treatyId: string;
  quotaShare: string;
  cedingPremiumAllowance: string;
  cedingAccumulatedValueAllowance: string;
  expensePremiumAllowance: string;
  expenseCommissionAllowance: string;
  premiumSource: string;
  totalPremiumsForPeriod: string;
  totalPartialSurrender: string;
  totalSurrender: string;
  annuitization: string;
  death: string;
  transfers: string;
  fees: string;
  partialSurrenderCharge: string;
  surrenderCharge: string;
  marketValueAdjustments: string;
  totalInterestEarned: string;
  totalCommissionPaid: string;
  totalDeathPayments: string;
  totalInterestClaims: string;
  totalDeathClaims: string;
  other: string;
  startingAccumulationValue: string;
  endingAccumulationValue: string;
}

interface PolicyDetailsData {
  policyLevel: PolicyLevelData;
  reinsurerLevels: ReinsurerLevelData[];
}

// API fetch function (mock data for now)
const fetchPolicyDetails = async (
  policyNumber: string,
): Promise<PolicyDetailsData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData: PolicyDetailsData = {
        policyLevel: {
          recordCreateDate: "2024-01-15",
          policyNumber: policyNumber,
          issueState: "NY",
          productName: "Secure Term MVA Fixed Annuity II",
          productCode: "2D",
          productTenor: 3,
          productChannel: "Direct",
          periodType: "Annual",
          periodStartDate: "2024-01-01",
          periodEndDate: "2024-12-31",
          totalPremiumsForPeriod: "$125,000.00",
          totalPartialSurrender: "$5,000.00",
          totalSurrender: "$0.00",
          annuitization: "$0.00",
          death: "$0.00",
          transfers: "$2,500.00",
          fees: "$750.00",
          partialSurrenderCharge: "$150.00",
          surrenderCharge: "$0.00",
          marketValueAdjustments: "$-1,200.00",
          totalInterestEarned: "$4,500.00",
          totalCommissionPaid: "$3,750.00",
          totalDeathPayments: "$0.00",
          totalInterestClaims: "$0.00",
          totalDeathClaims: "$0.00",
          other: "$0.00",
          startingAccumulationValue: "$118,500.00",
          endingAccumulationValue: "$123,400.00",
        },
        reinsurerLevels: [
          {
            reinsurerName: "Global Reinsurance Partners",
            treatyId: "TR001",
            quotaShare: "35.00%",
            cedingPremiumAllowance: "2.50%",
            cedingAccumulatedValueAllowance: "1.75%",
            expensePremiumAllowance: "1.25%",
            expenseCommissionAllowance: "0.85%",
            premiumSource: "New Business",
            totalPremiumsForPeriod: "$43,750.00",
            totalPartialSurrender: "$1,750.00",
            totalSurrender: "$0.00",
            annuitization: "$0.00",
            death: "$0.00",
            transfers: "$875.00",
            fees: "$262.50",
            partialSurrenderCharge: "$52.50",
            surrenderCharge: "$0.00",
            marketValueAdjustments: "$-420.00",
            totalInterestEarned: "$1,575.00",
            totalCommissionPaid: "$1,312.50",
            totalDeathPayments: "$0.00",
            totalInterestClaims: "$0.00",
            totalDeathClaims: "$0.00",
            other: "$0.00",
            startingAccumulationValue: "$41,475.00",
            endingAccumulationValue: "$43,190.00",
          },
          {
            reinsurerName: "Atlantic Reinsurance Corp",
            treatyId: "TR002",
            quotaShare: "25.00%",
            cedingPremiumAllowance: "2.25%",
            cedingAccumulatedValueAllowance: "1.50%",
            expensePremiumAllowance: "1.10%",
            expenseCommissionAllowance: "0.75%",
            premiumSource: "Renewal",
            totalPremiumsForPeriod: "$31,250.00",
            totalPartialSurrender: "$1,250.00",
            totalSurrender: "$0.00",
            annuitization: "$0.00",
            death: "$0.00",
            transfers: "$625.00",
            fees: "$187.50",
            partialSurrenderCharge: "$37.50",
            surrenderCharge: "$0.00",
            marketValueAdjustments: "$-300.00",
            totalInterestEarned: "$1,125.00",
            totalCommissionPaid: "$937.50",
            totalDeathPayments: "$0.00",
            totalInterestClaims: "$0.00",
            totalDeathClaims: "$0.00",
            other: "$0.00",
            startingAccumulationValue: "$29,625.00",
            endingAccumulationValue: "$30,850.00",
          },
        ],
      };
      resolve(mockData);
    }, 1000);
  });
};

const PolicyDetailsView = () => {
  const navigate = useNavigate();
  const { policyNumber } = useParams<{ policyNumber: string }>();

  // Fetch policy details using React Query
  const {
    data: policyData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["policyDetails", policyNumber],
    queryFn: () => fetchPolicyDetails(policyNumber || ""),
    enabled: !!policyNumber,
  });

  const InfoCard = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        {title}
      </h3>
      {children}
    </div>
  );

  const InfoField = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="text-base text-gray-900 font-medium">{value}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
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
              Policy Details
            </h1>
            <p className="text-xl text-gray-600">
              Comprehensive policy information for {policyNumber}
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-3 text-gray-600">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-lg">Loading policy details...</span>
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
                Failed to load policy details. Please try refreshing the page.
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
          {!isLoading && !error && policyData && (
            <>
              {/* Policy Level Section */}
              <InfoCard title="Policy Level Information">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InfoField
                    label="Record Create Date"
                    value={policyData.policyLevel.recordCreateDate}
                  />
                  <InfoField
                    label="Policy Number"
                    value={policyData.policyLevel.policyNumber}
                  />
                  <InfoField
                    label="Issue State"
                    value={policyData.policyLevel.issueState}
                  />
                  <InfoField
                    label="Product Name"
                    value={policyData.policyLevel.productName}
                  />
                  <InfoField
                    label="Product Code"
                    value={policyData.policyLevel.productCode}
                  />
                  <InfoField
                    label="Product Tenor"
                    value={`${policyData.policyLevel.productTenor} years`}
                  />
                  <InfoField
                    label="Product Channel"
                    value={policyData.policyLevel.productChannel}
                  />
                  <InfoField
                    label="Period Type"
                    value={policyData.policyLevel.periodType}
                  />
                  <InfoField
                    label="Period Start Date"
                    value={policyData.policyLevel.periodStartDate}
                  />
                  <InfoField
                    label="Period End Date"
                    value={policyData.policyLevel.periodEndDate}
                  />
                  <InfoField
                    label="Total Premiums for Period"
                    value={policyData.policyLevel.totalPremiumsForPeriod}
                  />
                  <InfoField
                    label="Total Partial Surrender"
                    value={policyData.policyLevel.totalPartialSurrender}
                  />
                  <InfoField
                    label="Total Surrender"
                    value={policyData.policyLevel.totalSurrender}
                  />
                  <InfoField
                    label="Annuitization"
                    value={policyData.policyLevel.annuitization}
                  />
                  <InfoField
                    label="Death"
                    value={policyData.policyLevel.death}
                  />
                  <InfoField
                    label="Transfers"
                    value={policyData.policyLevel.transfers}
                  />
                  <InfoField label="Fees" value={policyData.policyLevel.fees} />
                  <InfoField
                    label="Partial Surrender Charge"
                    value={policyData.policyLevel.partialSurrenderCharge}
                  />
                  <InfoField
                    label="Surrender Charge"
                    value={policyData.policyLevel.surrenderCharge}
                  />
                  <InfoField
                    label="Market Value Adjustments"
                    value={policyData.policyLevel.marketValueAdjustments}
                  />
                  <InfoField
                    label="Total Interest Earned"
                    value={policyData.policyLevel.totalInterestEarned}
                  />
                  <InfoField
                    label="Total Commission Paid"
                    value={policyData.policyLevel.totalCommissionPaid}
                  />
                  <InfoField
                    label="Total Death Payments"
                    value={policyData.policyLevel.totalDeathPayments}
                  />
                  <InfoField
                    label="Total Interest Claims"
                    value={policyData.policyLevel.totalInterestClaims}
                  />
                  <InfoField
                    label="Total Death Claims"
                    value={policyData.policyLevel.totalDeathClaims}
                  />
                  <InfoField
                    label="Other"
                    value={policyData.policyLevel.other}
                  />
                  <InfoField
                    label="Starting Accumulation Value"
                    value={policyData.policyLevel.startingAccumulationValue}
                  />
                  <InfoField
                    label="Ending Accumulation Value"
                    value={policyData.policyLevel.endingAccumulationValue}
                  />
                </div>
              </InfoCard>

              {/* Reinsurer Level Sections */}
              {policyData.reinsurerLevels.map((reinsurer, index) => (
                <InfoCard
                  key={index}
                  title={`Reinsurer Level Information - ${reinsurer.reinsurerName}`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InfoField
                      label="Reinsurer Name"
                      value={reinsurer.reinsurerName}
                    />
                    <InfoField label="Treaty ID" value={reinsurer.treatyId} />
                    <InfoField
                      label="Quota Share"
                      value={reinsurer.quotaShare}
                    />
                    <InfoField
                      label="Ceding Premium Allowance"
                      value={reinsurer.cedingPremiumAllowance}
                    />
                    <InfoField
                      label="Ceding Accumulated Value Allowance"
                      value={reinsurer.cedingAccumulatedValueAllowance}
                    />
                    <InfoField
                      label="Expense Premium Allowance"
                      value={reinsurer.expensePremiumAllowance}
                    />
                    <InfoField
                      label="Expense Commission Allowance"
                      value={reinsurer.expenseCommissionAllowance}
                    />
                    <InfoField
                      label="Premium Source"
                      value={reinsurer.premiumSource}
                    />
                    <InfoField
                      label="Total Premiums for Period"
                      value={reinsurer.totalPremiumsForPeriod}
                    />
                    <InfoField
                      label="Total Partial Surrender"
                      value={reinsurer.totalPartialSurrender}
                    />
                    <InfoField
                      label="Total Surrender"
                      value={reinsurer.totalSurrender}
                    />
                    <InfoField
                      label="Annuitization"
                      value={reinsurer.annuitization}
                    />
                    <InfoField label="Death" value={reinsurer.death} />
                    <InfoField label="Transfers" value={reinsurer.transfers} />
                    <InfoField label="Fees" value={reinsurer.fees} />
                    <InfoField
                      label="Partial Surrender Charge"
                      value={reinsurer.partialSurrenderCharge}
                    />
                    <InfoField
                      label="Surrender Charge"
                      value={reinsurer.surrenderCharge}
                    />
                    <InfoField
                      label="Market Value Adjustments"
                      value={reinsurer.marketValueAdjustments}
                    />
                    <InfoField
                      label="Total Interest Earned"
                      value={reinsurer.totalInterestEarned}
                    />
                    <InfoField
                      label="Total Commission Paid"
                      value={reinsurer.totalCommissionPaid}
                    />
                    <InfoField
                      label="Total Death Payments"
                      value={reinsurer.totalDeathPayments}
                    />
                    <InfoField
                      label="Total Interest Claims"
                      value={reinsurer.totalInterestClaims}
                    />
                    <InfoField
                      label="Total Death Claims"
                      value={reinsurer.totalDeathClaims}
                    />
                    <InfoField label="Other" value={reinsurer.other} />
                    <InfoField
                      label="Starting Accumulation Value"
                      value={reinsurer.startingAccumulationValue}
                    />
                    <InfoField
                      label="Ending Accumulation Value"
                      value={reinsurer.endingAccumulationValue}
                    />
                  </div>
                </InfoCard>
              ))}

              <div className="text-center mt-8">
                <Button
                  onClick={() => navigate(-1)}
                  className="bg-gray-800 text-gray-100 border-gray-800 hover:bg-gray-900"
                >
                  Return to Previous Page
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default PolicyDetailsView;
