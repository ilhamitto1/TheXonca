import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.email(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  console.info("[newsletter]", parsed.data.email);
  return NextResponse.json({ success: true });
}
