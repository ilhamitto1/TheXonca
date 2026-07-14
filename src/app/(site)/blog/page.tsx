import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/content";

export const metadata: Metadata = {
  title: "Jurnal",
  description: "Toy dizaynı, çiçəklər və atmosfer haqqında editorial yazılar.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="bg-ivory pb-24 pt-36">
      <div className="container-lux">
        <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
          Jurnal
        </p>
        <h1 className="mt-4 font-display text-[clamp(2.8rem,7vw,5rem)] text-ink">
          Atelyedən editorial qeydlər
        </h1>

        <Link
          href={`/blog/${featured.slug}`}
          className="mt-14 grid gap-8 overflow-hidden border border-ink/8 lg:grid-cols-2"
        >
          <div className="relative min-h-[20rem]">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover"
              sizes="50vw"
              priority
            />
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-stone">
              {featured.category} · {featured.readTime}
            </p>
            <h2 className="mt-4 font-display text-4xl text-ink">
              {featured.title}
            </h2>
            <p className="mt-4 font-body text-stone">{featured.excerpt}</p>
          </div>
        </Link>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="50vw"
                />
              </div>
              <p className="mt-5 font-body text-[10px] uppercase tracking-[0.25em] text-stone">
                {post.category} · {post.readTime}
              </p>
              <h2 className="mt-2 font-display text-3xl text-ink group-hover:text-gold-deep">
                {post.title}
              </h2>
              <p className="mt-3 font-body text-sm text-stone">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
