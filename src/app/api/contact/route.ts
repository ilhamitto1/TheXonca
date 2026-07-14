import { NextResponse } from "next/server";
import { submitContact } from "@/actions/contact";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await submitContact(body);
  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}
