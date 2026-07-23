"use client";

const demo = [
  {
    number: "RSV-204812",
    customer: "Aysel Məmmədova",
    phone: "+994 50 111 22 33",
    collection: "Elizabeth",
    date: "2026-08-12",
    qty: 4,
    tumba: "Bəli (4)",
    delivery: "Bəli",
    restaurant: "Port Baku",
    status: "PENDING",
    notes: "Axşam 18:00",
    created: "2026-07-14",
  },
  {
    number: "RSV-204801",
    customer: "Rauf Quliyev",
    phone: "+994 55 444 55 66",
    collection: "Şahzadə",
    date: "2026-08-20",
    qty: 2,
    tumba: "Daxildir",
    delivery: "Xeyr",
    restaurant: "Flame",
    status: "CONFIRMED",
    notes: "—",
    created: "2026-07-10",
  },
];

const statusLabel: Record<string, string> = {
  PENDING: "Gözləmədə",
  CONFIRMED: "Təsdiqləndi",
  COMPLETED: "Tamamlandı",
  CANCELLED: "Ləğv edildi",
};

export default function AdminReservationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-gold-soft">
          İdarəetmə
        </p>
        <h1 className="mt-2 font-display text-4xl">Rezervasiyalar</h1>
        <p className="mt-3 max-w-2xl text-sm text-mist">
          WhatsApp rezervasiyaları burada toplanır. Status: Gözləmədə, Təsdiqləndi,
          Tamamlandı, Ləğv edildi.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-ivory/10">
        <table className="min-w-[960px] text-left text-sm">
          <thead className="bg-charcoal/80 text-mist">
            <tr>
              {[
                "Nömrə",
                "Müştəri",
                "Telefon",
                "Kolleksiya",
                "Tarix",
                "Say",
                "Tumba",
                "Çatdırılma",
                "Restoran",
                "Status",
                "Qeyd",
                "Yaradılıb",
              ].map((h) => (
                <th
                  key={h}
                  className="px-3 py-3 font-body text-[10px] uppercase tracking-[0.12em]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {demo.map((row) => (
              <tr key={row.number} className="border-t border-ivory/5">
                <td className="px-3 py-3 text-gold-soft">{row.number}</td>
                <td className="px-3 py-3">{row.customer}</td>
                <td className="px-3 py-3 text-mist">{row.phone}</td>
                <td className="px-3 py-3">{row.collection}</td>
                <td className="px-3 py-3">{row.date}</td>
                <td className="px-3 py-3">{row.qty}</td>
                <td className="px-3 py-3">{row.tumba}</td>
                <td className="px-3 py-3">{row.delivery}</td>
                <td className="px-3 py-3">{row.restaurant}</td>
                <td className="px-3 py-3">{statusLabel[row.status]}</td>
                <td className="px-3 py-3 text-mist">{row.notes}</td>
                <td className="px-3 py-3 text-mist">{row.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
