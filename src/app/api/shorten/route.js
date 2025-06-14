import { NextResponse } from "next/server";

// This would be replaced with your actual database logic
const urlStorage = new Map();

export async function POST(request) {
  try {
    const { url, customSlug } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Generate a slug - either custom or random
    const slug = customSlug || generateRandomSlug();

    // Check if custom slug is already taken
    if (customSlug && urlStorage.has(customSlug)) {
      return NextResponse.json(
        { error: "This custom URL is already taken" },
        { status: 409 }
      );
    }

    // Store the URL mapping
    urlStorage.set(slug, url);

    // Return the shortened URL
    const shortUrl = `https://linksnip.site/${slug}`;
    return NextResponse.json({ shortUrl });
  } catch (error) {
    console.error("Error shortening URL:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function generateRandomSlug() {
  // Generate a random 6-character string
  return Math.random().toString(36).substring(2, 8);
}
