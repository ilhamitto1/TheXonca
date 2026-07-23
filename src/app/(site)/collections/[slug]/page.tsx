import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  collections,
  getCollectionBySlug,
  getRelatedCollections,
} from "@/data/collections";
import { CollectionDetailView } from "@/components/collections/collection-detail-view";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Kolleksiya" };
  return {
    title: collection.seoTitle || collection.name,
    description: collection.seoDescription || collection.shortDescription,
    openGraph: {
      title: collection.seoTitle || collection.name,
      description: collection.seoDescription || collection.shortDescription,
      images: collection.images[0] ? [{ url: collection.images[0] }] : undefined,
    },
  };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const related = getRelatedCollections(slug);

  return (
    <CollectionDetailView collection={collection} related={related} />
  );
}
