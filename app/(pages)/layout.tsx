import Navbar from "@/components/Navbar"


export default function pagesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col">
            <Navbar />
            <div className="mt-20">
                {children}
            </div>
        </div>
    )
}