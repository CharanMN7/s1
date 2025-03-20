import { supabaseClient } from "@/lib/supabaseCient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabaseClient
      .from("s1-finishers")
      .select("*");

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch finishers data" },
        { status: 500 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching finishers data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
