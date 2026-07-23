import { MetadataRoute } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mathplus.com.vn'

  let posts: any[] = []
  let courses: any[] = []
  let successStories: any[] = []

  try {
    posts = await prisma.post.findMany({ where: { published: true } })
    courses = await prisma.course.findMany()
    successStories = await prisma.successStory.findMany()
  } catch (error) {
    console.error("Failed to fetch data for sitemap:", error)
  }

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
  }))

  const courseUrls = courses.map((course) => ({
    url: `${baseUrl}/khoa-hoc/${course.slug}`,
    lastModified: course.updatedAt,
  }))

  const storyUrls = successStories.map((story) => ({
    url: `${baseUrl}/cau-chuyen-thanh-cong/${story.slug}`,
    lastModified: story.updatedAt,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/gioi-thieu`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/khoa-hoc`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/doi-ngu-giao-vien`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/cau-chuyen-thanh-cong`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/dang-ki-hoc`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/lien-he`,
      lastModified: new Date(),
    },
    ...courseUrls,
    ...postUrls,
    ...storyUrls,
  ]
}
