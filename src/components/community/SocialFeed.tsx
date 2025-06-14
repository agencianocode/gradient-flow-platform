import { PostCard } from "./PostCard"
import { CreatePostCard } from "./CreatePostCard"
import { useCommunity } from "@/hooks/useCommunity"
import { Skeleton } from "@/components/ui/skeleton"

export function SocialFeed() {
  const { posts, loading } = useCommunity()

  if (loading) {
    return (
      <div className="space-y-6">
        <CreatePostCard />
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <CreatePostCard />
      
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            Aún no hay publicaciones en la comunidad
          </div>
          <p className="text-sm text-muted-foreground">
            ¡Sé el primero en compartir algo!
          </p>
        </div>
      )}
      
      {/* Load More Trigger - Could be implemented later */}
      {posts.length > 0 && (
        <div className="flex justify-center py-8">
          <div className="text-sm text-muted-foreground">
            Todas las publicaciones cargadas
          </div>
        </div>
      )}
    </div>
  )
}
