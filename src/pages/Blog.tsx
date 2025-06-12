
import { useState } from "react"
import { Layout } from "@/components/layout/Layout"
import { BlogHero } from "@/components/blog/BlogHero"
import { BlogGrid } from "@/components/blog/BlogGrid"
import { BlogSidebar } from "@/components/blog/BlogSidebar"

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <Layout>
      <div className="space-y-8">
        <BlogHero />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <BlogGrid 
              category={selectedCategory}
              searchQuery={searchQuery}
            />
          </div>
          
          <div className="lg:col-span-1">
            <BlogSidebar 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
