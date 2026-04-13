export async function getManga(page = 1) {
  const res = await fetch(`https://api.jikan.moe/v4/manga?page=${page}`);
  const data = await res.json();
  return data.data;
}

export async function getMangaById(id) {
  const res = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
  const data = await res.json();
  return data.data;
}

export async function searchManga(query, page = 1) {
  const res = await fetch(
    `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(query)}&page=${page}`
  );
  const data = await res.json();
  return data.data;
}