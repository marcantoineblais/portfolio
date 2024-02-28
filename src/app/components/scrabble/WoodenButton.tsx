export default function WoodenButton({ text }: { text: string }) {
    return (
        <button 
            className="w-full bg-tile-texture text-xl text-white px-3 py-1 rounded hover:brightness-50" 
        >
            { text }
        </button>
    )
}