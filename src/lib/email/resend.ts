import { Resend } from "resend";

export function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendBookingConfirmation(input: {
  to: string;
  name: string;
  date: string;
}) {
  const resend = getResend();
  if (!resend) {
    console.info("[email:skipped]", input);
    return { skipped: true as const };
  }

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "atelier@thexonca.com",
    to: input.to,
    subject: "The Xonca konsultasiya sorğunuz",
    html: `<p>Hörmətli ${input.name},</p><p>${input.date} tarixi üçün sorğunuzu aldıq. Beş gün ərzində şəxsi təklif göndəriləcək.</p><p>— The Xonca</p>`,
  });

  return { skipped: false as const };
}
