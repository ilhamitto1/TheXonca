import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/content";
import { ReadingProgress } from "@/components/blog/reading-progress";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Jurnal" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="bg-ivory pb-24 pt-36">
      <ReadingProgress />
      <div className="container-lux max-w-3xl">
        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold-deep">
          {post.category} · {post.date} · {post.readTime}
        </p>
        <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] text-ink">
          {post.title}
        </h1>
        <p className="mt-6 font-body text-lg text-stone">{post.excerpt}</p>
      </div>

      <div className="container-lux mt-12">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      </div>

      <div className="container-lux prose-xonca mt-14 max-w-2xl space-y-6 font-body text-base leading-relaxed text-charcoal">
        <p>
          The Xonca-da hər bayram yoxlama siyahısı kimi deyil, atmosfer kimi
          başlayır. Biz məkanın memarlığını, mərasimin ritmini və jestlər
          arasındakı sakit emosiyaları öyrənirik.
        </p>
        <p>
          İşıq materiala çevrilir. Boşluq lüksə çevrilir. Çiçəklər heç vaxt
          doldurucu deyil — heykəl kimi bəstələnir. Nəticə, sanki həmişə
          cütlüyə məxsus imiş kimi hiss olunan mühitdir.
        </p>
        <p>
          Bu jurnal yazısı məhdudiyyət, ritm və material səmimiyyətinin
          qonaqların son şam sönəndən sonra da apardığı təcrübələri necə
          yaratdığını araşdırır.
        </p>
        <div className="pt-8">
          <Link
            href="/blog"
            className="font-body text-xs uppercase tracking-[0.25em] text-gold-deep"
          >
            ← Jurnala qayıt
          </Link>
        </div>
      </div>
    </article>
  );
}
