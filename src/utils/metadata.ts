import { load } from "cheerio";

export async function fetchMetadata(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = load(html);

    const metadata = {
      title:
        $("head title").text() ||
        $('meta[property="og:title"]').attr("content") ||
        "",
    };

    return metadata;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null;
  }
}
