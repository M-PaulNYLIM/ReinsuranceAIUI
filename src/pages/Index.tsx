import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Info,
  BarChart3,
  FileText,
  Settings,
  TrendingUp,
  Building2,
  ScrollText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-8 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-6">
          {/* Logo placeholder - using a simple rectangular shape */}
          <div className="w-10 h-9 bg-gray-800 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">R</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-2 flex-1 justify-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center px-2 py-2 rounded-lg bg-gray-100">
              <span className="text-gray-800 text-base font-normal">
                Home Page
              </span>
            </div>
            <button
              className="flex items-center justify-center px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => navigate("/reinsurer-details")}
            >
              <span className="text-gray-800 text-base font-normal">
                Reinsurer Details
              </span>
            </button>
            <button
              className="flex items-center justify-center px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => navigate("/policy-details")}
            >
              <span className="text-gray-800 text-base font-normal">
                Policy Details
              </span>
            </button>
            <button className="flex items-center justify-center px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-gray-800 text-base font-normal">
                Reports
              </span>
            </button>
            <button className="flex items-center justify-center px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-gray-800 text-base font-normal">
                File Transfer Files
              </span>
            </button>
            <button
              className="flex items-center justify-center px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => navigate("/analytics")}
            >
              <span className="text-gray-800 text-base font-normal">
                Analytics
              </span>
            </button>
          </div>
        </nav>

        {/* Auth Buttons */}
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

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-40 flex flex-col items-center justify-center text-center bg-white bg-opacity-80 bg-blend-overlay bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Title and Subtitle */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
              RECAP
            </h1>
            <p className="text-lg md:text-2xl lg:text-3xl text-gray-900 font-normal leading-relaxed max-w-3xl">
              Reinsurance Engine for Calculations, Administration & Processing
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="border-gray-400 bg-gray-200 text-gray-800 hover:bg-gray-300 px-6 py-3"
              onClick={() => navigate("/reinsurer-details")}
            >
              <Building2 className="w-5 h-5 mr-2" />
              Reinsurer Details
            </Button>
            <Button
              size="lg"
              className="bg-gray-800 text-gray-100 border-gray-800 hover:bg-gray-900 px-6 py-3"
              onClick={() => navigate("/policy-details")}
            >
              Policy Details
            </Button>
            <Button
              size="lg"
              className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700 px-6 py-3"
              onClick={() => navigate("/analytics")}
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Analytics Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Business Capabilities Section */}
      <section className="px-6 md:px-16 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col items-start gap-2 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight">
              Business Capabilities
            </h2>
            <p className="text-xl text-gray-500 font-normal leading-relaxed">
              Comprehensive reinsurance management and analytics
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate("/reinsurer-details")}
            >
              <CardHeader>
                <FileText className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Reinsurer Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Manage reinsurer relationships, treaties, and quota share
                  agreements with comprehensive tracking.
                </CardDescription>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate("/policy-details")}
            >
              <CardHeader>
                <Settings className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle className="text-lg">Policy Administration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complete policy lifecycle management with detailed tracking of
                  products, firms, and account values.
                </CardDescription>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate("/analytics")}
            >
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">Analytics & Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Interactive dashboards with key metrics, profitability
                  analysis, and risk concentration insights.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Info className="w-8 h-8 text-orange-600 mb-2" />
                <CardTitle className="text-lg">Risk Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor risk concentration, exposure limits, and compliance
                  across all reinsurance relationships.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Quick Access Section */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Quick Access
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate("/reinsurer-details")}
              >
                <FileText className="w-5 h-5" />
                <span>View All Treaties</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate("/policy-details")}
              >
                <Settings className="w-5 h-5" />
                <span>Manage Policies</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate("/analytics")}
              >
                <BarChart3 className="w-5 h-5" />
                <span>View Analytics</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
