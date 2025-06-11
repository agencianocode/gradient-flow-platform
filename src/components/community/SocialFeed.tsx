
import { PostCard } from "./PostCard"
import { CreatePostCard } from "./CreatePostCard"

const mockPosts = [
  {
    id: "1",
    author: {
      name: "María González",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      badge: "Expert",
      isOnline: true
    },
    content: "¿Alguien más está emocionado por las nuevas funcionalidades de Webflow? He estado experimentando con las animaciones avanzadas y los resultados son increíbles 🚀",
    timestamp: "hace 5 min",
    media: ["https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600"],
    tags: ["webflow", "animaciones", "nocode"],
    reactions: {
      "❤️": 24,
      "🚀": 12,
      "🔥": 8,
      "👏": 15
    },
    comments: 7,
    shares: 3
  },
  {
    id: "2",
    author: {
      name: "Carlos Ruiz",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      badge: "Pro",
      isOnline: false
    },
    content: "Tutorial completo sobre cómo construir un marketplace sin código usando Bubble + Stripe. ¿Les interesa que suba el video paso a paso?",
    timestamp: "hace 1h",
    tags: ["bubble", "marketplace", "stripe", "tutorial"],
    reactions: {
      "❤️": 45,
      "👍": 32,
      "🤯": 18
    },
    comments: 23,
    shares: 12
  },
  {
    id: "3",
    author: {
      name: "Ana Torres",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      badge: "Rising Star",
      isOnline: true
    },
    content: "¡Mi primera app creada con FlutterFlow ya está en la App Store! 🎉 No puedo creer lo rápido que fue el proceso. Gracias a toda la comunidad por el apoyo.",
    timestamp: "hace 3h",
    media: ["https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600"],
    tags: ["flutterflow", "app-store", "mobile", "éxito"],
    reactions: {
      "🎉": 67,
      "👏": 45,
      "❤️": 38,
      "🚀": 23
    },
    comments: 34,
    shares: 18
  }
]

export function SocialFeed() {
  return (
    <div className="space-y-6">
      <CreatePostCard />
      
      <div className="space-y-6">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* Load More Trigger */}
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  )
}
