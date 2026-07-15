"use client";

import { catalogItems } from "@/data/collections";

export default function AdminCatalogPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-gold-soft">
          CMS
        </p>
        <h1 className="mt-2 font-display text-4xl">Kataloq faylları</h1>
        <p className="mt-3 max-w-2xl text-sm text-mist">
          PDF kataloq və broşür yükləyin. UploadThing / Cloudinary bağlananda
          fayllar burada idarə olunacaq.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {catalogItems.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-ivory/10 bg-charcoal/60 p-5"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-gold-soft">
              {item.type} · {item.year}
            </p>
            <h2 className="mt-2 font-display text-2xl">{item.title}</h2>
            <p className="mt-2 text-sm text-mist">{item.description}</p>
            <button
              type="button"
              className="mt-4 text-xs uppercase tracking-[0.2em] text-gold-soft"
              onClick={() => alert("Fayl yükləmə tezliklə aktiv olacaq.")}
            >
              PDF / Broşür yüklə
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
