import { NextResponse } from "next/server";
import { submitBooking } from "@/actions/booking";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await submitBooking(body);
  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}
