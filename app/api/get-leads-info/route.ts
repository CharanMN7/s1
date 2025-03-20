import { supabaseClient } from "@/lib/supabaseCient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabaseClient
      .from("s1-leads-info")
      .select("*");

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch leads info" },
        { status: 500 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching leads info:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
