
import { Layout } from "@/components/layout/Layout"
import { HeroSection } from "@/components/dashboard/HeroSection"
import { FeaturedCourses } from "@/components/dashboard/FeaturedCourses"
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents"
import { CommunityHighlights } from "@/components/dashboard/CommunityHighlights"
import { StatsOverview } from "@/components/dashboard/StatsOverview"

const Index = () => {
  return (
    <Layout>
      <div className="space-y-12">
        <HeroSection />
        <StatsOverview />
        <FeaturedCourses />
        <UpcomingEvents />
        <CommunityHighlights />
      </div>
    </Layout>
  )
}

export default Index
