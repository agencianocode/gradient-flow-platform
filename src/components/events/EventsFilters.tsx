
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Search, Filter, Calendar, DollarSign, X } from "lucide-react"

const categories = ["Todos", "Bubble", "Webflow", "Zapier", "Airtable", "Notion", "Figma"]
const levels = ["Principiante", "Intermedio", "Avanzado"]
const prices = ["Gratis", "Hasta $100", "$100-$300", "$300+"]

export function EventsFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const toggleFilter = (item: string, type: 'category' | 'level' | 'price') => {
    const setters = {
      category: setSelectedCategories,
      level: setSelectedLevels,
      price: setSelectedPrices
    }
    
    const getters = {
      category: selectedCategories,
      level: selectedLevels,
      price: selectedPrices
    }
    
    const currentItems = getters[type]
    const setter = setters[type]
    
    if (currentItems.includes(item)) {
      setter(currentItems.filter(i => i !== item))
    } else {
      setter([...currentItems, item])
    }
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedLevels([])
    setSelectedPrices([])
    setSearchTerm("")
  }

  const totalFilters = selectedCategories.length + selectedLevels.length + selectedPrices.length

  return (
    <div className="mb-8">
      {/* Search and Filter Toggle */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar eventos por título, instructor o herramienta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
          />
        </div>
        
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="px-6 py-3 relative"
        >
          <Filter className="w-5 h-5 mr-2" />
          Filtros
          {totalFilters > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-1 min-w-0 h-5 flex items-center justify-center">
              {totalFilters}
            </Badge>
          )}
        </Button>
      </div>

      {/* Active Filters */}
      {totalFilters > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {[...selectedCategories, ...selectedLevels, ...selectedPrices].map((filter, index) => (
            <Badge 
              key={`${filter}-${index}`} 
              variant="secondary" 
              className="px-3 py-1 bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors cursor-pointer"
              onClick={() => {
                if (selectedCategories.includes(filter)) toggleFilter(filter, 'category')
                else if (selectedLevels.includes(filter)) toggleFilter(filter, 'level')
                else if (selectedPrices.includes(filter)) toggleFilter(filter, 'price')
              }}
            >
              {filter}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-purple-600 hover:text-purple-700"
          >
            Limpiar todo
          </Button>
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <Card className="p-6 animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Categorías
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "ghost"}
                    size="sm"
                    onClick={() => toggleFilter(category, 'category')}
                    className={`w-full justify-start transition-all duration-200 ${
                      selectedCategories.includes(category) 
                        ? "bg-purple-500 text-white hover:bg-purple-600" 
                        : "hover:bg-purple-50"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Level */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Nivel
              </h3>
              <div className="space-y-2">
                {levels.map((level) => (
                  <Button
                    key={level}
                    variant={selectedLevels.includes(level) ? "default" : "ghost"}
                    size="sm"
                    onClick={() => toggleFilter(level, 'level')}
                    className={`w-full justify-start transition-all duration-200 ${
                      selectedLevels.includes(level) 
                        ? "bg-blue-500 text-white hover:bg-blue-600" 
                        : "hover:bg-blue-50"
                    }`}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                Precio
              </h3>
              <div className="space-y-2">
                {prices.map((price) => (
                  <Button
                    key={price}
                    variant={selectedPrices.includes(price) ? "default" : "ghost"}
                    size="sm"
                    onClick={() => toggleFilter(price, 'price')}
                    className={`w-full justify-start transition-all duration-200 ${
                      selectedPrices.includes(price) 
                        ? "bg-green-500 text-white hover:bg-green-600" 
                        : "hover:bg-green-50"
                    }`}
                  >
                    {price}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
