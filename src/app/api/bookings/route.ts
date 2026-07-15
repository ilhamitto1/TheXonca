import { NextResponse } from "next/server";
import { submitReservation } from "@/actions/reservation";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await submitReservation(body);
  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}
