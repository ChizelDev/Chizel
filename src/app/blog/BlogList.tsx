"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function BlogList({ posts }: { posts: any[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
  }

  return (
    <div className="relative min-h-screen bg-white pt-32 pb-20 px-6 md:px-12 lg:px-20 z-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
        className="mb-16 text-center max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-black">Our <span className="text-[#3366FF]">Blog</span></h1>
        <p className="text-gray-600 text-xl font-medium">Insights, tutorials, and news from our team.</p>
      </motion.div>

      {posts.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {posts.map((post) => (
            <motion.div key={post._id} variants={itemVariants}>
              <Link href={`/blog/${post.slug.current}`}>
                <div className="bg-white border border-gray-100 overflow-hidden h-full flex flex-col group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-60 w-full overflow-hidden bg-gray-50">
                    {post.imageUrl ? (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <p className="text-sm font-bold text-[#3366FF] uppercase tracking-wider mb-4">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h2 className="text-2xl font-bold mb-4 text-black leading-tight group-hover:text-[#FF5722] transition-colors line-clamp-3 min-h-[5rem]">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 font-medium leading-relaxed flex-1 line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="bg-gray-50 border border-gray-100 p-12 inline-block">
            <h3 className="text-2xl font-black mb-2 text-black">No posts yet</h3>
            <p className="text-gray-600 font-medium">Check back later for new content.</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
