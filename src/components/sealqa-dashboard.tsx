"use client"

import { useState, useMemo } from "react"
import { Filter, Search, BarChart3, TrendingUp, ArrowUpDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Complete performance data structure
const performanceData = {
  questionTypes: {
    models: ["GPT-4.1", "o3-mini", "o3", "Llama-4-Scout", "DeepSeek-R1"],
    categories: [
      <span key="1">
        Advanced Reasoning (Q<sub>1</sub>)
      </span>,
      <span key="2">
        Entity/Event Disambiguation (Q<sub>2</sub>)
      </span>,
      <span key="3">
        Temporal Tracking (Q<sub>3</sub>)
      </span>,
      <span key="4">
        Cross-lingual Reasoning (Q<sub>4</sub>)
      </span>,
      <span key="5">
        False-premise Detection (Q<sub>5</sub>)
      </span>,
    ],
    withoutSearch: [
      [14.1, 14.2, 25.7, 0.0, 0.0],
      [13.0, 17.6, 17.1, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0], // o3 has dashes in original table
      [4.9, 6.8, 5.7, 0.0, 0.0],
      [20.7, 23.0, 22.9, 7.1, 0.0],
    ],
    withSearch: [
      [20.1, 17.6, 25.7, 21.4, 9.1],
      [12.0, 9.5, 20.0, 0.0, 9.1],
      [33.7, 32.4, 48.6, 7.1, 27.3],
      [4.3, 6.8, 8.6, 0.0, 0.0],
      [10.3, 10.8, 14.3, 0.0, 18.2],
    ],
  },
  temporalFreshness: {
    models: ["GPT-4.1", "o3-mini", "o3", "Llama-4-Scout", "DeepSeek-R1"],
    categories: ["NEVER", "SLOW", "FAST"],
    withoutSearch: [
      [21.5, 18.0, 1.6],
      [40.5, 39.6, 17.2],
      [0.0, 0.0, 0.0], // o3 has dashes in original table
      [10.1, 4.5, 4.1],
      [32.9, 24.3, 6.2],
    ],
    withSearch: [
      [17.7, 24.3, 17.2],
      [16.5, 10.8, 9.4],
      [41.8, 39.6, 17.2],
      [6.3, 4.5, 7.8],
      [15.2, 9.9, 7.8],
    ],
  },
  informationRecency: {
    models: ["GPT-4.1", "o3-mini", "o3", "Llama-4-Scout", "DeepSeek-R1"],
    categories: ["< 2024", "2024", "2025"],
    withoutSearch: [
      [23.5, 6.1, 0.0],
      [45.6, 26.5, 10.7],
      [0.0, 0.0, 0.0], // o3 has dashes in original table
      [8.7, 4.1, 0.0],
      [35.6, 8.2, 0.0],
    ],
    withSearch: [
      [25.5, 20.4, 7.1],
      [15.4, 6.1, 8.9],
      [46.3, 26.5, 10.7],
      [7.4, 6.1, 1.8],
      [14.8, 6.1, 5.4],
    ],
  },
  searchResultQuality: {
    models: ["GPT-4.1", "o3-mini", "o3", "Llama-4-Scout", "DeepSeek-R1"],
    categories: ["UNHELPFUL", "CONFLICT"],
    withoutSearch: [
      [14.5, 15.3],
      [11.8, 16.6],
      [0.0, 0.0], // o3 has dashes in original table
      [3.6, 7.6],
      [20.9, 23.6],
    ],
    withSearch: [
      [18.2, 22.2],
      [10.9, 13.2],
      [33.6, 35.4],
      [4.5, 6.9],
      [9.1, 12.5],
    ],
  },
}

type TabId = keyof typeof performanceData
type SortConfig = {
  key: string
  direction: "asc" | "desc"
} | null

// Tab definitions
const tabs = [
  {
    id: "questionTypes" as TabId,
    label: "Question Types",
    description: "Performance across Q₁-Q₅ question categories",
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
    description: "Performance when search results are unhelpful vs conflicting",
    icon: Filter,
  },
]

export default function SealQADashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("questionTypes")
  const [sortConfig, setSortConfig] = useState<SortConfig>(null)
  const [filterModel, setFilterModel] = useState<string>("all")
  const [searchMode, setSearchMode] = useState<"withSearch" | "withoutSearch">("withSearch")

  const currentData = performanceData[activeTab]
  const currentTab = tabs.find((tab) => tab.id === activeTab)!

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Seal-Hard Performance</h1>
            </div>
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

        {/* Controls - All filters on one line without white box */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <currentTab.icon className="w-5 h-5 text-blue-500" />
              <div>
                <h3 className="font-semibold text-gray-900">{currentTab.label}</h3>
                <p className="text-sm text-gray-600">{currentTab.description}</p>
              </div>
            </div>

            {/* All Filters in One Row */}
            <div className="flex items-center gap-4">
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

              {/* Category Filter */}
              <Select value={activeTab} onValueChange={(value) => setActiveTab(value as TabId)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="questionTypes">Question Types</SelectItem>
                  <SelectItem value="temporalFreshness">Temporal Analysis</SelectItem>
                  <SelectItem value="informationRecency">Information Recency</SelectItem>
                  <SelectItem value="searchResultQuality">Search Quality</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Performance Table */}
        <Card className="overflow-hidden">
          <CardContent>
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
                        {sortConfig?.key === "model" ? (
                          <span className="text-blue-500">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                        ) : (
                          <ArrowUpDown className="w-3 h-3 text-gray-400" />
                        )}
                      </div>
                    </th>
                    {currentData.categories.map((category, index) => (
                      <th
                        key={index}
                        className="px-4 py-4 text-center font-semibold text-gray-700 cursor-pointer hover:bg-blue-100 transition-colors min-w-32"
                        onClick={() => handleSort(index.toString())}
                      >
                        <div className="flex items-center justify-center gap-2">
                          {category}
                          {sortConfig?.key === index.toString() ? (
                            <span className="text-blue-500">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                          ) : (
                            <ArrowUpDown className="w-3 h-3 text-gray-400" />
                          )}
                        </div>
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
                        {item.model}
                      </td>
                      {item.values.map((value, index) => (
                        <td key={index} className="px-4 py-4 text-center">
                          <Badge variant="secondary" className="font-medium px-2 py-1 text-xs">
                            {value === 0 && (searchMode === "withoutSearch" || item.model === "o3")
                              ? "N/A"
                              : `${value.toFixed(1)}%`}
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
      </div>
    </div>
  )
}
