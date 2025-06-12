
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface SkeletonCardProps {
  variant?: "default" | "event" | "blog" | "course"
  className?: string
}

export function SkeletonCard({ variant = "default", className = "" }: SkeletonCardProps) {
  if (variant === "event") {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <Skeleton className="h-48 w-full bg-gradient-to-r from-purple-100 via-purple-50 to-purple-100 animate-shimmer" />
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-4 w-16 bg-purple-200" />
          <Skeleton className="h-6 w-3/4 bg-gradient-to-r from-purple-200 to-blue-200" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8 rounded-full bg-purple-200" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-8 w-24 bg-gradient-to-r from-purple-300 to-blue-300" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === "blog") {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <div className="md:flex">
          <Skeleton className="md:w-1/3 h-48 md:h-auto bg-gradient-to-r from-orange-100 via-orange-50 to-orange-100 animate-shimmer" />
          <CardContent className="md:w-2/3 p-6 space-y-4">
            <Skeleton className="h-4 w-20 bg-orange-200" />
            <Skeleton className="h-6 w-full bg-gradient-to-r from-orange-200 to-pink-200" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex items-center space-x-4 pt-4">
              <Skeleton className="h-6 w-6 rounded-full bg-orange-200" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <Skeleton className="h-6 w-3/4 bg-gradient-to-r from-gray-200 to-gray-100" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-8 w-24 bg-gradient-to-r from-gray-300 to-gray-200" />
      </CardContent>
    </Card>
  )
}
