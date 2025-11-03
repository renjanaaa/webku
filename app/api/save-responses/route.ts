export async function POST(request: Request) {
  try {
    const data = await request.json()

    const gasUrl = process.env.NEXT_PUBLIC_GAS_URL

    if (!gasUrl) {
      return Response.json({ success: false, error: "Google Apps Script URL not configured" }, { status: 400 })
    }

    const response = await fetch(gasUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    return Response.json(result)
  } catch (error) {
    console.error("[v0] Error in save-responses API:", error)
    return Response.json({ success: false, error: "Failed to save responses" }, { status: 500 })
  }
}
