
export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch(process.env.TARGET_SERVER_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.SERVER_API_KEY}`
    },
    body: JSON.stringify(body)
  });

  const text = await response.text();

  return new Response(text, {
    status: response.status
  });
}
