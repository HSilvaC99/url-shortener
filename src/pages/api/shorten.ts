import type { APIRoute } from "astro";
import { nanoid } from "../../utils/shortCode.ts";

const isValidUrl = (url: string) => {
  const urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i;
  return urlRegex.test(url);
};

export const POST: APIRoute = async ({ request }) => {
  const body = (await request.formData()).get("url_input") as string;

  if (!body) {
    return new Response(JSON.stringify("No URL to shorten"), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    });
  }
  if (!isValidUrl(body)) {
    return new Response(JSON.stringify("Invalid URL"), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  const shortCode = nanoid();

  return new Response(JSON.stringify({ "shortCode": shortCode }), {
    headers: {
      "content-type": "application/json",
    },
  });
}