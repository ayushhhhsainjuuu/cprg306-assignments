const BASE_URL = "https://api.jikan.moe/v4";
const DEFAULT_TIMEOUT_MS = 8000;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1200;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url, retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : RETRY_DELAY_MS * attempt;
        console.warn(`[Jikan] Rate limited. Retrying in ${delay}ms... (attempt ${attempt})`);
        await sleep(delay);
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      const isLastAttempt = attempt === retries;
      const isAbortError = error.name === "AbortError";

      if (isLastAttempt) {
        throw new Error(
          isAbortError
            ? `Request timed out after ${MAX_RETRIES} attempts.`
            : `Failed to fetch after ${MAX_RETRIES} attempts: ${error.message}`
        );
      }

      await sleep(RETRY_DELAY_MS * attempt);
    }
  }
}

export async function searchManga(query, page = 1, limit = 12) {
  if (!query || query.trim().length === 0) {
    throw new Error("Search query cannot be empty.");
  }
  const encodedQuery = encodeURIComponent(query.trim());
  const url = `${BASE_URL}/manga?q=${encodedQuery}&page=${page}&limit=${limit}&order_by=score&sort=desc`;
  const json = await fetchWithRetry(url);
  return {
    data: json.data ?? [],
    pagination: json.pagination ?? {},
  };
}

export async function getMangaById(id) {
  if (!id) throw new Error("Manga ID is required.");
  const json = await fetchWithRetry(`${BASE_URL}/manga/${id}`);
  return json.data ?? null;
}

export async function getTopManga(page = 1, limit = 12) {
  const url = `${BASE_URL}/top/manga?page=${page}&limit=${limit}`;
  console.log("[Jikan] Fetching:", url);
  const json = await fetchWithRetry(url);
  return {
    data: json.data ?? [],
    pagination: json.pagination ?? {},
  };
}