// src/utils/youtube.js
export function getYoutubeId(url) {
  if (!url || typeof url !== "string") return null;

  try {
    // Essaie de parser proprement l'URL
    const u = new URL(url);

    // 1) ?v=VIDEOID
    const v = u.searchParams.get("v");
    if (v) return v;

    // 2) youtu.be/VIDEOID
    // pathname peut être "/abcd1234" ou "/embed/abcd1234"
    const host = u.hostname.toLowerCase();
    const path = u.pathname.split("/").filter(Boolean); // supprime les vides

    // youtu.be/<id>
    if (host === "youtu.be" && path.length >= 1) return path[0];

    // youtube.com/embed/<id>
    if ((host === "www.youtube.com" || host === "youtube.com") && path[0] === "embed" && path[1]) {
      return path[1];
    }

    // youtube.com/v/<id>
    if ((host === "www.youtube.com" || host === "youtube.com") && path[0] === "v" && path[1]) {
      return path[1];
    }

    // 3) fallback regex — attrape la dernière séquence ressemblant à un id (11 chars alphaNum et -_)
    const idMatch = url.match(/([A-Za-z0-9_-]{11})/);
    return idMatch ? idMatch[1] : null;
  } catch (err) {
    // Si ce n'est pas une URL valide (ex: juste "abcd1234"), essaye le regex aussi
    const idMatch = url.match(/([A-Za-z0-9_-]{11})/);
    return idMatch ? idMatch[1] : null;
  }
}
