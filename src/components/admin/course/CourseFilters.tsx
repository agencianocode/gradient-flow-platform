
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface CourseFiltersProps {
  searchTerm: string
  statusFilter: string
  onSearchChange: (value: string) => void
  onStatusFilterChange: (value: string) => void
}

export function CourseFilters({ 
  searchTerm, 
  statusFilter, 
  onSearchChange, 
  onStatusFilterChange 
}: CourseFiltersProps) {
  return (
    <div className="flex gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar cursos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filtrar por estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los estados</SelectItem>
          <SelectItem value="published">Publicados</SelectItem>
          <SelectItem value="draft">Borradores</SelectItem>
          <SelectItem value="archived">Archivados</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
