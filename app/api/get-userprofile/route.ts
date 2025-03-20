import { supabaseClient } from "@/lib/supabaseCient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Extract the username from query parameters
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 },
      );
    }

    // Get user profile data
    const { data, error } = await supabaseClient
      .from("s1-finishers")
      .select("*")
      .eq("username", username)
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch user profile" },
        { status: 500 },
      );
    }

    // Remove sensitive information before sending response
    const sanitizedData = {
      ...data,
      email: undefined,
      phone: undefined,
      address: undefined,
    };

    return NextResponse.json(sanitizedData);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
