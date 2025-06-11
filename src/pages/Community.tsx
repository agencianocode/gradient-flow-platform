
import { Layout } from "@/components/layout/Layout"
import { SocialFeed } from "@/components/community/SocialFeed"
import { CommunityHeader } from "@/components/community/CommunityHeader"
import { TrendingSidebar } from "@/components/community/TrendingSidebar"
import { CreatePostFab } from "@/components/community/CreatePostFab"

const Community = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        <CommunityHeader />
        
        <div className="container max-w-screen-2xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Feed */}
            <div className="lg:col-span-8 xl:col-span-9">
              <SocialFeed />
            </div>
            
            {/* Trending Sidebar */}
            <div className="lg:col-span-4 xl:col-span-3">
              <TrendingSidebar />
            </div>
          </div>
        </div>
        
        {/* Floating Create Post Button */}
        <CreatePostFab />
      </div>
    </Layout>
  )
}

export default Community
