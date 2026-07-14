export default function AdminPage() {
  return (
    <div>
      <p className="font-body text-[10px] uppercase tracking-[0.35em] text-gold-soft">
        Admin
      </p>
      <h1 className="mt-2 font-display text-4xl">Məhsullar</h1>
      <p className="mt-4 max-w-2xl font-body text-sm text-mist">
        Prisma əsaslı CRUD, media iş axınları və CMS idarəetməsi üçün hazır enterprise modul.
      </p>
      <div className="mt-8 rounded-2xl border border-dashed border-ivory/15 bg-charcoal/40 p-10 text-sm text-mist">
        Canlı qeydləri aktivləşdirmək üçün DATABASE_URL qoşun və məlumatları seed edin.
      </div>
    </div>
  );
}
