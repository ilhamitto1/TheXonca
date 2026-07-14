"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE } from "@/lib/constants/site";
import { submitContact } from "@/actions/contact";

const schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

type FormValues = z.infer<typeof schema>;

const faqs = [
  {
    q: "Nə qədər əvvəldən rezerv etməliyik?",
    a: "Pik mövsümlər 10–14 ay əvvəldən rezerv edilir. Kiçik bayramlar isə 8 həftə ərzində hazırlana bilər.",
  },
  {
    q: "Beynəlxalq səyahət edirsinizmi?",
    a: "Bəli. The Xonca dünyanın hər yerində atmosferlər dizayn edir — təyinat haqları təklifinizdə göstərilir.",
  },
  {
    q: "Paketi fərdiləşdirə bilərikmi?",
    a: "Hər əməkdaşlıq unikaldır. Paketlər başlanğıc çərçivələridir, hazır şablonlar deyil.",
  },
];

export function ContactPage() {
  const [pending, setPending] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setPending(true);
    try {
      const result = await submitContact(values);
      if (result.success) {
        toast.success("Mesaj göndərildi");
        form.reset();
      } else {
        toast.error(result.error || "Göndərmək mümkün olmadı");
      }
    } finally {
      setPending(false);
    }
  });

  return (
    <div className="bg-ivory pb-24 pt-36">
      <div className="container-lux grid gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
              Əlaqə
            </p>
          </Reveal>
          <TextReveal
            text="Atelyeyə yazın"
            as="h1"
            className="mt-4 font-display text-[clamp(2.8rem,6vw,4.8rem)] text-ink"
          />
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-3 font-body text-sm text-stone">
              <p>{SITE.address.line1}</p>
              <p>
                {SITE.address.city}, {SITE.address.region} {SITE.address.postal}
              </p>
              <a href={`mailto:${SITE.email}`} className="block text-gold-deep">
                {SITE.email}
              </a>
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
            </div>
          </Reveal>

          <div className="mt-12 overflow-hidden border border-ink/10">
            <iframe
              title="The Xonca atelye xəritəsi"
              src="https://maps.google.com/maps?q=48%20Nizami%20Street%20Baku&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="h-64 w-full grayscale contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <Reveal>
          <form
            onSubmit={onSubmit}
            className="space-y-5 border border-ink/8 bg-pearl p-6 sm:p-10"
          >
            <div className="space-y-3">
              <Label htmlFor="name">Ad</Label>
              <Input id="name" {...form.register("name")} />
            </div>
            <div className="space-y-3">
              <Label htmlFor="email">E-poçt</Label>
              <Input id="email" type="email" {...form.register("email")} />
            </div>
            <div className="space-y-3">
              <Label htmlFor="subject">Mövzu</Label>
              <Input id="subject" {...form.register("subject")} />
            </div>
            <div className="space-y-3">
              <Label htmlFor="message">Mesaj</Label>
              <Textarea id="message" {...form.register("message")} />
            </div>
            <Button type="submit" variant="gold" disabled={pending}>
              {pending ? "Göndərilir..." : "Mesaj göndər"}
            </Button>
          </form>
        </Reveal>
      </div>

      <div className="container-lux mt-24 max-w-3xl">
        <h2 className="font-display text-3xl text-ink">
          Tez-tez verilən suallar
        </h2>
        <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="cursor-pointer list-none font-display text-xl text-ink">
                {faq.q}
              </summary>
              <p className="mt-3 font-body text-sm leading-relaxed text-stone">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
