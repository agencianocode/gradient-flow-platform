
interface ReactionPickerProps {
  onReaction: (emoji: string) => void
}

const reactions = ["❤️", "👍", "👏", "🔥", "🚀", "🤯", "😍", "💡"]

export function ReactionPicker({ onReaction }: ReactionPickerProps) {
  return (
    <div className="absolute bottom-full left-0 mb-2 z-50 animate-scale-in">
      <div className="flex items-center gap-1 p-2 bg-popover border border-border rounded-lg shadow-lg backdrop-blur-lg">
        {reactions.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onReaction(emoji)}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-accent transition-colors transform hover:scale-125 active:scale-95"
          >
            <span className="text-lg">{emoji}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
