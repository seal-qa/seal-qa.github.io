"use client"

import { useState, useMemo } from "react"
import { Download, Filter, Search, BarChart3, TrendingUp, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Complete performance data structure
const performanceData = {
  questionTypes: {
    models: ["GPT-4.1", "o3-MINI", "o3", "Llama-4-Scout", "DeepSeek-R1"],
    categories: ["Q1", "Q2", "Q3", "Q4", "Q5"],
    withoutSearch: [
      [14.1, 14.2, 25.7, 0.0, 0.0],
      [12.3, 16.8, 23.4, 18.2, 8.9],
      [18.7, 19.5, 28.9, 22.1, 12.4],
      [8.9, 11.2, 19.8, 15.6, 5.2],
      [16.4, 18.9, 31.2, 24.7, 14.8],
    ],
    withSearch: [
      [20.1, 17.6, 25.7, 21.4, 9.1],
      [18.9, 22.4, 28.6, 25.3, 15.7],
      [24.3, 26.1, 34.2, 29.8, 18.9],
      [15.2, 18.7, 24.9, 22.1, 12.4],
      [22.8, 25.4, 36.7, 31.5, 21.2],
    ],
  },
  temporalFreshness: {
    models: ["GPT-4.1", "o3-MINI", "o3", "Llama-4-Scout", "DeekSeek-R1"],
    categories: ["NEVER", "SLOW", "FAST"],
    withoutSearch: [
      [21.5, 18.0, 1.6],
      [19.2, 15.8, 3.2],
      [25.4, 22.1, 4.8],
      [16.7, 12.9, 2.1],
      [23.8, 19.6, 3.9],
    ],
    withSearch: [
      [17.7, 24.3, 17.2],
      [15.9, 21.8, 14.6],
      [21.2, 28.7, 22.4],
      [13.4, 18.9, 12.8],
      [19.8, 26.1, 19.7],
    ],
  },
  informationRecency: {
    models: ["GPT-4.1", "o3-MINI", "o3", "Llama-4-Scout", "DeepSeek-R1"],
    categories: ["Before 2024", "2024", "2025"],
    withoutSearch: [
      [28.4, 15.2, 8.9],
      [25.7, 13.8, 6.4],
      [32.1, 18.6, 11.2],
      [22.3, 11.9, 5.8],
      [29.8, 16.7, 9.7],
    ],
    withSearch: [
      [35.2, 22.8, 15.4],
      [31.9, 19.6, 12.7],
      [38.7, 26.3, 18.9],
      [28.4, 17.2, 10.8],
      [36.5, 24.1, 16.3],
    ],
  },
  searchResultQuality: {
    models: ["GPT-4.1", "O3-MINI", "O3", "Llama-4-Scout", "DeepSeek-R1"],
    categories: ["HIGH", "MEDIUM", "LOW"],
    withoutSearch: [
      [0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0],
    ],
    withSearch: [
      [31.7, 18.9, 12.4],
      [28.3, 16.2, 9.8],
      [36.2, 22.7, 15.1],
      [25.8, 14.6, 8.3],
      [33.9, 20.4, 13.7],
    ],
  },
}

type TabId = keyof typeof performanceData
type SortConfig = {
  key: string
  direction: "asc" | "desc"
} | null

// Performance color coding function
const getPerformanceColor = (value: number): string => {
  if (value === 0) return "bg-gray-100 text-gray-500"
  if (value < 5) return "bg-red-100 text-red-800"
  if (value < 15) return "bg-orange-100 text-orange-800"
  if (value < 25) return "bg-yellow-100 text-yellow-800"
  if (value < 35) return "bg-green-100 text-green-800"
  return "bg-green-200 text-green-900"
}

// Tab definitions
const tabs = [
  {
    id: "questionTypes" as TabId,
    label: "Question Types",
    description: "Performance across Q1-Q5 question categories",
    icon: BarChart3,
  },
  {
    id: "temporalFreshness" as TabId,
    label: "Temporal Analysis",
    description: "Analysis of temporal information freshness",
    icon: TrendingUp,
  },
  {
    id: "informationRecency" as TabId,
    label: "Information Recency",
    description: "Performance on recent vs. older information",
    icon: Search,
  },
  {
    id: "searchResultQuality" as TabId,
    label: "Search Quality",
    description: "Quality assessment of search-enhanced results",
    icon: Filter,
  },
]

// Tooltip content for categories
const categoryTooltips: Record<string, Record<string, string>> = {
  questionTypes: {
    Q1: "Basic factual questions requiring simple recall",
    Q2: "Analytical questions requiring reasoning",
    Q3: "Complex multi-step questions",
    Q4: "Comparative analysis questions",
    Q5: "Synthesis and evaluation questions",
  },
  temporalFreshness: {
    NEVER: "Information that never changes",
    SLOW: "Information that changes slowly over time",
    FAST: "Information that changes rapidly",
  },
  informationRecency: {
    "Before 2024": "Information from before 2024",
    "2024": "Information from the year 2024",
    "2025": "Information from the year 2025",
  },
  searchResultQuality: {
    HIGH: "High-quality, authoritative sources",
    MEDIUM: "Moderate quality sources",
    LOW: "Lower quality or less authoritative sources",
  },
}

export default function SealQADashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("questionTypes")
  const [sortConfig, setSortConfig] = useState<SortConfig>(null)
  const [filterModel, setFilterModel] = useState<string>("all")
  const [searchMode, setSearchMode] = useState<"withSearch" | "withoutSearch">("withSearch")
  const [viewMode, setViewMode] = useState<"table" | "heatmap">("table")
  const [showComparison, setShowComparison] = useState(false)
  const [showInsights, setShowInsights] = useState(false)
  const [selectedModels, setSelectedModels] = useState<string[]>([])

  const currentData = performanceData[activeTab]
  const currentTab = tabs.find((tab) => tab.id === activeTab)!

  const insights = useMemo(() => {
    const allData = currentData.models.map((model, index) => ({
      model,
      values: searchMode === "withSearch" ? currentData.withSearch[index] : currentData.withoutSearch[index],
      average:
        searchMode === "withSearch"
          ? currentData.withSearch[index].reduce((sum, val) => sum + val, 0) / currentData.withSearch[index].length
          : currentData.withoutSearch[index].reduce((sum, val) => sum + val, 0) /
            currentData.withoutSearch[index].length,
    }))

    // Best performing model overall
    const bestModel = allData.reduce((best, current) => (current.average > best.average ? current : best))

    // Worst performing model overall
    const worstModel = allData.reduce((worst, current) => (current.average < worst.average ? current : worst))

    // Best category performance
    const categoryPerformance = currentData.categories.map((category, catIndex) => {
      const categoryValues = allData.map((model) => model.values[catIndex])
      return {
        category,
        average: categoryValues.reduce((sum, val) => sum + val, 0) / categoryValues.length,
        best: Math.max(...categoryValues),
        worst: Math.min(...categoryValues),
        bestModel: allData[categoryValues.indexOf(Math.max(...categoryValues))].model,
      }
    })

    const bestCategory = categoryPerformance.reduce((best, current) =>
      current.average > best.average ? current : best,
    )

    const worstCategory = categoryPerformance.reduce((worst, current) =>
      current.average < worst.average ? current : worst,
    )

    // Search effectiveness
    const searchEffectiveness = currentData.models.map((model, index) => {
      const withoutSearchAvg =
        currentData.withoutSearch[index].reduce((sum, val) => sum + val, 0) / currentData.withoutSearch[index].length
      const withSearchAvg =
        currentData.withSearch[index].reduce((sum, val) => sum + val, 0) / currentData.withSearch[index].length
      return {
        model,
        improvement: withSearchAvg - withoutSearchAvg,
        improvementPercent: ((withSearchAvg - withoutSearchAvg) / withoutSearchAvg) * 100,
      }
    })

    const avgSearchImprovement =
      searchEffectiveness.reduce((sum, item) => sum + item.improvement, 0) / searchEffectiveness.length
    const bestSearchImprovement = searchEffectiveness.reduce((best, current) =>
      current.improvement > best.improvement ? current : best,
    )

    return {
      bestModel,
      worstModel,
      bestCategory,
      worstCategory,
      categoryPerformance,
      avgSearchImprovement,
      bestSearchImprovement,
      totalDataPoints: allData.length * currentData.categories.length,
    }
  }, [currentData, searchMode])

  // Filter and sort data
  const processedData = useMemo(() => {
    let data = currentData.models.map((model, index) => ({
      model,
      values: searchMode === "withSearch" ? currentData.withSearch[index] : currentData.withoutSearch[index],
    }))

    // Filter by model
    if (filterModel !== "all") {
      data = data.filter((item) => item.model === filterModel)
    }

    // Sort data
    if (sortConfig) {
      data.sort((a, b) => {
        if (sortConfig.key === "model") {
          const aValue = a.model
          const bValue = b.model
          return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        } else {
          const categoryIndex = Number.parseInt(sortConfig.key)
          const aValue = a.values[categoryIndex]
          const bValue = b.values[categoryIndex]
          return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue
        }
      })
    }

    return data
  }, [currentData, filterModel, searchMode, sortConfig])

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return current.direction === "asc" ? { key, direction: "desc" } : null
      }
      return { key, direction: "asc" }
    })
  }

  const exportData = (format: "csv" | "json") => {
    const data = processedData.map((item) => {
      const row: Record<string, any> = { Model: item.model }
      currentData.categories.forEach((category, index) => {
        row[category] = item.values[index]
      })
      return row
    })

    if (format === "csv") {
      const headers = ["Model", ...currentData.categories]
      const csvContent = [headers.join(","), ...data.map((row) => headers.map((header) => row[header]).join(","))].join(
        "\n",
      )

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `sealqa-${activeTab}-${searchMode}.csv`
      a.click()
    } else {
      const jsonContent = JSON.stringify(data, null, 2)
      const blob = new Blob([jsonContent], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `sealqa-${activeTab}-${searchMode}.json`
      a.click()
    }
  }

  // Calculate statistics
  const stats = useMemo(() => {
    const allValues = processedData.flatMap((item) => item.values)
    const bestModel = processedData.reduce((best, current) => {
      const bestAvg = best.values.reduce((sum, val) => sum + val, 0) / best.values.length
      const currentAvg = current.values.reduce((sum, val) => sum + val, 0) / current.values.length
      return currentAvg > bestAvg ? current : best
    }, processedData[0])

    return {
      avgPerformance: (allValues.reduce((sum, val) => sum + val, 0) / allValues.length).toFixed(1),
      bestModel: bestModel?.model || "N/A",
      bestScore: bestModel
        ? (bestModel.values.reduce((sum, val) => sum + val, 0) / bestModel.values.length).toFixed(1)
        : "0",
      totalModels: processedData.length,
    }
  }, [processedData])

  // Model Comparison Component
  const ModelComparison = () => {
    if (!showComparison) return null

    const comparisonData = selectedModels
      .map((model) => {
        const modelIndex = currentData.models.indexOf(model)
        return {
          model,
          values:
            searchMode === "withSearch" ? currentData.withSearch[modelIndex] : currentData.withoutSearch[modelIndex],
          average:
            searchMode === "withSearch"
              ? currentData.withSearch[modelIndex].reduce((sum, val) => sum + val, 0) /
                currentData.withSearch[modelIndex].length
              : currentData.withoutSearch[modelIndex].reduce((sum, val) => sum + val, 0) /
                currentData.withoutSearch[modelIndex].length,
        }
      })
      .filter(Boolean)

    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Model Comparison
          </CardTitle>
          <CardDescription>Side-by-side comparison of selected models across all categories</CardDescription>
        </CardHeader>
        <CardContent>
          {comparisonData.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Select models from the table to compare them</p>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {comparisonData.map((item) => (
                  <Card key={item.model} className="border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{item.model}</CardTitle>
                      <Badge className="w-fit bg-blue-100 text-blue-800">Avg: {item.average.toFixed(1)}%</Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {currentData.categories.map((category, index) => (
                          <div key={category} className="flex justify-between items-center">
                            <span className="text-sm font-medium">{category}</span>
                            <Badge className={`${getPerformanceColor(item.values[index])} text-xs`}>
                              {item.values[index] === 0 && searchMode === "withoutSearch"
                                ? "N/A"
                                : `${item.values[index].toFixed(1)}%`}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {comparisonData.length > 1 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Comparison Insights</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Best Overall: </span>
                      <span className="text-blue-700">
                        {
                          comparisonData.reduce((best, current) => (current.average > best.average ? current : best))
                            .model
                        }
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Performance Gap: </span>
                      <span className="text-blue-700">
                        {(
                          Math.max(...comparisonData.map((d) => d.average)) -
                          Math.min(...comparisonData.map((d) => d.average))
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  // Statistical Insights Component
  const StatisticalInsights = () => {
    if (!showInsights) return null

    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Statistical Insights
          </CardTitle>
          <CardDescription>Automated analysis and key findings from the performance data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Overall Performance */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 border-b pb-2">Overall Performance</h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-green-800">Best Model</span>
                  </div>
                  <p className="text-sm text-green-700">{insights.bestModel.model}</p>
                  <p className="text-xs text-green-600">Average: {insights.bestModel.average.toFixed(1)}%</p>
                </div>

                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="font-medium text-red-800">Needs Improvement</span>
                  </div>
                  <p className="text-sm text-red-700">{insights.worstModel.model}</p>
                  <p className="text-xs text-red-600">Average: {insights.worstModel.average.toFixed(1)}%</p>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-blue-800">Performance Gap</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    {(insights.bestModel.average - insights.worstModel.average).toFixed(1)}% difference
                  </p>
                </div>
              </div>
            </div>

            {/* Category Analysis */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 border-b pb-2">Category Analysis</h4>
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="font-medium text-purple-800">Strongest Category</span>
                  </div>
                  <p className="text-sm text-purple-700">{insights.bestCategory.category}</p>
                  <p className="text-xs text-purple-600">Average: {insights.bestCategory.average.toFixed(1)}%</p>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="font-medium text-orange-800">Challenging Category</span>
                  </div>
                  <p className="text-sm text-orange-700">{insights.worstCategory.category}</p>
                  <p className="text-xs text-orange-600">Average: {insights.worstCategory.average.toFixed(1)}%</p>
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-700">Category Rankings:</span>
                  {insights.categoryPerformance
                    .sort((a, b) => b.average - a.average)
                    .map((cat, index) => (
                      <div key={cat.category} className="flex justify-between text-xs">
                        <span>
                          #{index + 1} {cat.category}
                        </span>
                        <span className="font-medium">{cat.average.toFixed(1)}%</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Search Effectiveness */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 border-b pb-2">Search Impact</h4>
              <div className="space-y-3">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="font-medium text-indigo-800">Average Improvement</span>
                  </div>
                  <p className="text-sm text-indigo-700">+{insights.avgSearchImprovement.toFixed(1)}%</p>
                  <p className="text-xs text-indigo-600">With search enhancement</p>
                </div>

                <div className="p-3 bg-teal-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="font-medium text-teal-800">Best Search Gain</span>
                  </div>
                  <p className="text-sm text-teal-700">{insights.bestSearchImprovement.model}</p>
                  <p className="text-xs text-teal-600">
                    +{insights.bestSearchImprovement.improvement.toFixed(1)}% improvement
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">Data Points</span>
                  </div>
                  <p className="text-sm text-gray-700">{insights.totalDataPoints} total measurements</p>
                  <p className="text-xs text-gray-600">Across {currentData.models.length} models</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Seal-Hard Performance Analysis</h1>
                <p className="text-lg text-gray-600 mt-1">
                </p>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-600">Avg Performance</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgPerformance}%</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-600">Best Model</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{stats.bestModel}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-gray-600">Best Score</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.bestScore}%</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-600">Models</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalModels}</p>
                </CardContent>
              </Card>
            </div>
          </header>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex flex-wrap gap-2 sm:gap-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600 bg-blue-50 rounded-t-lg px-3"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Card className="flex-1">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="flex items-center gap-2">
                    <currentTab.icon className="w-5 h-5 text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{currentTab.label}</h3>
                      <p className="text-sm text-gray-600">{currentTab.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 ml-auto">
                    {/* Search Mode Toggle */}
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setSearchMode("withoutSearch")}
                        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                          searchMode === "withoutSearch"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        Without Search
                      </button>
                      <button
                        onClick={() => setSearchMode("withSearch")}
                        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                          searchMode === "withSearch"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        With Search
                      </button>
                    </div>

                    {/* Model Filter */}
                    <Select value={filterModel} onValueChange={setFilterModel}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter models" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Models</SelectItem>
                        {currentData.models.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Export Button */}
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportData("csv")}
                        className="flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        CSV
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportData("json")}
                        className="flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        JSON
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Table */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-50 to-purple-50">
                      <th
                        className="sticky left-0 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 text-left font-semibold text-gray-700 border-r border-gray-200 cursor-pointer hover:bg-blue-100 transition-colors"
                        onClick={() => handleSort("model")}
                      >
                        <div className="flex items-center gap-2">
                          Model
                          {sortConfig?.key === "model" && (
                            <span className="text-blue-500">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                          )}
                        </div>
                      </th>
                      {currentData.categories.map((category, index) => (
                        <th
                          key={category}
                          className="px-4 py-4 text-center font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 transition-colors min-w-24"
                          onClick={() => handleSort(index.toString())}
                        >
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center justify-center gap-1">
                                {category}
                                <Info className="w-3 h-3 text-gray-400" />
                                {sortConfig?.key === index.toString() && (
                                  <span className="text-blue-500">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{categoryTooltips[activeTab]?.[category] || `${category} category performance`}</p>
                            </TooltipContent>
                          </Tooltip>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {processedData.map((item, rowIndex) => (
                      <tr
                        key={item.model}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}
                      >
                        <td className="sticky left-0 bg-white px-6 py-4 font-bold text-gray-900 border-r border-gray-200">
                          <div
                            className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-colors ${
                              selectedModels.includes(item.model)
                                ? "bg-blue-100 border-2 border-blue-300"
                                : "hover:bg-gray-100"
                            }`}
                            onClick={() => {
                              setSelectedModels((prev) =>
                                prev.includes(item.model)
                                  ? prev.filter((m) => m !== item.model)
                                  : [...prev, item.model],
                              )
                            }}
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${
                                selectedModels.includes(item.model) ? "bg-blue-500" : "bg-gray-400"
                              }`}
                            ></div>
                            {item.model}
                            {selectedModels.includes(item.model) && (
                              <Badge variant="secondary" className="ml-auto text-xs">
                                Selected
                              </Badge>
                            )}
                          </div>
                        </td>
                        {item.values.map((value, index) => (
                          <td key={index} className="px-4 py-4 text-center">
                            <Badge
                              variant="secondary"
                              className={`${getPerformanceColor(value)} font-medium px-2 py-1 text-xs`}
                            >
                              {value === 0 && searchMode === "withoutSearch" ? "N/A" : `${value.toFixed(1)}%`}
                            </Badge>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Collapsible Analysis Sections */}
          <div className="space-y-4 mt-6">
            {/* Model Comparison Dropdown */}
            <Card>
              <CardHeader
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setShowComparison(!showComparison)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    <CardTitle>Model Comparison</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedModels.length > 0 && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {selectedModels.length} selected
                      </Badge>
                    )}
                    <div className={`transform transition-transform ${showComparison ? "rotate-180" : ""}`}>↓</div>
                  </div>
                </div>
                <CardDescription>Side-by-side comparison of selected models across all categories</CardDescription>
              </CardHeader>
              {showComparison && (
                <CardContent>
                  <ModelComparison />
                </CardContent>
              )}
            </Card>

            {/* Statistical Insights Dropdown */}
            <Card>
              <CardHeader
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setShowInsights(!showInsights)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                    <CardTitle>Statistical Insights</CardTitle>
                  </div>
                  <div className={`transform transition-transform ${showInsights ? "rotate-180" : ""}`}>↓</div>
                </div>
                <CardDescription>Automated analysis and key findings from the performance data</CardDescription>
              </CardHeader>
              {showInsights && (
                <CardContent>
                  <StatisticalInsights />
                </CardContent>
              )}
            </Card>
          </div>

          {/* Performance Legend */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Performance Color Legend</CardTitle>
              <CardDescription>Color coding based on performance percentage ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800">0-5%</Badge>
                  <span className="text-sm text-gray-600">Poor</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-orange-100 text-orange-800">5-15%</Badge>
                  <span className="text-sm text-gray-600">Below Average</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-100 text-yellow-800">15-25%</Badge>
                  <span className="text-sm text-gray-600">Average</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">25-35%</Badge>
                  <span className="text-sm text-gray-600">Good</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-200 text-green-900">35%+</Badge>
                  <span className="text-sm text-gray-600">Excellent</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
