import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-deep-purple text-white">
      {/* Header */}
      <header className="border-b border-cyber-purple/20 bg-deep-purple/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Skeleton className="h-8 w-32 bg-cyber-purple/20" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-2 space-y-8">
            {/* Tool Header */}
            <section className="text-center lg:text-left">
              <Skeleton className="h-12 w-80 mx-auto lg:mx-0 mb-4 bg-cyber-purple/20" />
              <Skeleton className="h-6 w-96 mx-auto lg:mx-0 mb-6 bg-cyber-purple/20" />
              <div className="flex gap-4 justify-center lg:justify-start mb-6">
                <Skeleton className="h-12 w-32 bg-cyber-purple/20" />
                <Skeleton className="h-12 w-24 bg-cyber-purple/20" />
              </div>
              <Skeleton className="h-64 w-full bg-cyber-purple/20 rounded-2xl" />
            </section>

            {/* Content Sections */}
            <div className="space-y-8">
              <Skeleton className="h-32 w-full bg-cyber-purple/20" />
              <Skeleton className="h-48 w-full bg-cyber-purple/20" />
              <Skeleton className="h-64 w-full bg-cyber-purple/20" />
            </div>
          </main>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card className="bg-dark-purple/50 border-cyber-purple/30">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-32 mb-4 bg-cyber-purple/20" />
                <Skeleton className="h-4 w-full bg-cyber-purple/20" />
              </CardContent>
            </Card>
            <Card className="bg-dark-purple/50 border-cyber-purple/30">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-24 mb-4 bg-cyber-purple/20" />
                <Skeleton className="h-16 w-full bg-cyber-purple/20" />
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
