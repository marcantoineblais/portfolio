export default function WoodenButton({ text, action = () => false }: { text: string, action?: Function }) {
    return (
        <button 
        onClick={() => action()}
            className="w-full bg-tile-texture text-xl text-white px-3 py-1 rounded hover:brightness-50" 
        >
            { text }
        </button>
    )
}