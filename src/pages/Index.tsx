import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Info } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-8 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-6">
          {/* Logo placeholder - using a simple rectangular shape */}
          <div className="w-10 h-9 bg-gray-800 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">L</span>
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
            <button className="flex items-center justify-center px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-gray-800 text-base font-normal">
                Reinsurer Details
              </span>
            </button>
            <button className="flex items-center justify-center px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors">
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
            <button className="flex items-center justify-center px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors">
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
            >
              Reinsurer Details
            </Button>
            <Button
              size="lg"
              className="bg-gray-800 text-gray-100 border-gray-800 hover:bg-gray-900 px-6 py-3"
            >
              Policy Details
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
              Subheading
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {/* Card 1: Evaluate Treaty Rules */}
            <Card className="border-0 shadow-none bg-transparent p-0">
              <CardHeader className="flex flex-row items-start gap-6 p-0 pb-4">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <Info className="w-7 h-7 text-gray-800" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-2xl font-bold text-gray-900 leading-tight tracking-tight mb-2">
                    Evaluate Treaty Rules
                  </CardTitle>
                  <CardDescription className="text-base text-gray-500 leading-relaxed">
                    Analyze and apply specific terms and conditions set out in a
                    reinsurance treaty to ensure correct handling of reinsured
                    policies, premiums, and claims
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            {/* Card 2: Assign Policies */}
            <Card className="border-0 shadow-none bg-transparent p-0">
              <CardHeader className="flex flex-row items-start gap-6 p-0 pb-4">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <Info className="w-7 h-7 text-gray-800" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-2xl font-bold text-gray-900 leading-tight tracking-tight mb-2">
                    Assign Policies
                  </CardTitle>
                  <CardDescription className="text-base text-gray-500 leading-relaxed">
                    Systematically review insurance policies to determine which
                    ones qualify for reinsurance coverage under a treaty
                    agreement, and formally linking those policies to the
                    appropriate reinsurance arrangement
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            {/* Card 3: Audit & Reporting */}
            <Card className="border-0 shadow-none bg-transparent p-0">
              <CardHeader className="flex flex-row items-start gap-6 p-0 pb-4">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <Info className="w-7 h-7 text-gray-800" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-2xl font-bold text-gray-900 leading-tight tracking-tight mb-2">
                    Audit & Reporting
                  </CardTitle>
                  <CardDescription className="text-base text-gray-500 leading-relaxed">
                    Accurate tracking and validation of reinsurance
                    transactions. Compliant, transparent communication with
                    reinsurers, internal stakeholders, and regulators.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            {/* Card 4: Placeholder */}
            <Card className="border-0 shadow-none bg-transparent p-0">
              <CardHeader className="flex flex-row items-start gap-6 p-0 pb-4">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <Info className="w-7 h-7 text-gray-800" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-2xl font-bold text-gray-900 leading-tight tracking-tight mb-2">
                    Title
                  </CardTitle>
                  <CardDescription className="text-base text-gray-500 leading-relaxed">
                    Body text for whatever you'd like to say. Add main takeaway
                    points, quotes, anecdotes, or even a very very short story.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            {/* Card 5: Placeholder */}
            <Card className="border-0 shadow-none bg-transparent p-0">
              <CardHeader className="flex flex-row items-start gap-6 p-0 pb-4">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <Info className="w-7 h-7 text-gray-800" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-2xl font-bold text-gray-900 leading-tight tracking-tight mb-2">
                    Title
                  </CardTitle>
                  <CardDescription className="text-base text-gray-500 leading-relaxed">
                    Body text for whatever you'd like to say. Add main takeaway
                    points, quotes, anecdotes, or even a very very short story.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            {/* Card 6: Placeholder */}
            <Card className="border-0 shadow-none bg-transparent p-0">
              <CardHeader className="flex flex-row items-start gap-6 p-0 pb-4">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <Info className="w-7 h-7 text-gray-800" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-2xl font-bold text-gray-900 leading-tight tracking-tight mb-2">
                    Title
                  </CardTitle>
                  <CardDescription className="text-base text-gray-500 leading-relaxed">
                    Body text for whatever you'd like to say. Add main takeaway
                    points, quotes, anecdotes, or even a very very short story.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
