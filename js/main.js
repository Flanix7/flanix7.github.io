/* Flanix Games — rend les jeux depuis data/games.json (ceux déjà dans le HTML ne sont pas doublés)
   et gère la lightbox des captures. */
(function () {
  const root = document.documentElement.dataset.root || ".";

  function join(base, path) {
    if (!path) return path;
    if (/^https?:/i.test(path)) return path;
    return (base.replace(/\/$/, "") + "/" + path.replace(/^\//, "")).replace(/\/\.\//g, "/");
  }

  async function loadGames() {
    const grid = document.getElementById("games-grid");
    if (!grid) return;
    try {
      const res = await fetch(join(root, "data/games.json"));
      if (!res.ok) return;
      const data = await res.json();
      const games = data.games || [];
      games.forEach((game) => {
        if (grid.querySelector('[data-id="' + game.id + '"]')) return;
        grid.insertBefore(cardFor(game), grid.querySelector(".game-card--soon"));
      });
    } catch (err) {
      /* Ouverture en file:// ou JSON manquant : les cartes déjà dans le HTML restent. */
    }
  }

  function cardFor(game) {
    const a = document.createElement("a");
    a.className = "game-card";
    a.href = join(root, game.url);
    a.dataset.id = game.id;
    const tags = (game.tags || [])
      .map((t) => "<li>" + escapeHtml(t) + "</li>")
      .join("");
    a.innerHTML =
      '<div class="game-card-media">' +
      (game.cover
        ? '<img src="' +
          escapeAttr(join(root, game.cover)) +
          '" alt="' +
          escapeAttr(game.title) +
          '" width="640" height="360">'
        : "") +
      (game.statusLabel
        ? '<span class="game-card-status">' + escapeHtml(game.statusLabel) + "</span>"
        : "") +
      "</div><div class=\"game-card-body\"><h3>" +
      escapeHtml(game.title) +
      "</h3><p>" +
      escapeHtml(game.summary || game.tagline || "") +
      "</p><ul class=\"tags\">" +
      tags +
      "</ul></div>";
    return a;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/"/g, "&quot;");
  }

  function setupLightbox() {
    const links = Array.from(document.querySelectorAll("[data-lightbox]"));
    if (!links.length) return;

    const box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Aperçu de la capture");
    box.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Fermer">×</button>' +
      '<button type="button" class="lightbox-nav prev" aria-label="Précédente">‹</button>' +
      '<img alt="">' +
      "<p></p>" +
      '<button type="button" class="lightbox-nav next" aria-label="Suivante">›</button>';
    document.body.appendChild(box);

    const img = box.querySelector("img");
    const cap = box.querySelector("p");
    let index = 0;

    function open(i) {
      index = (i + links.length) % links.length;
      const el = links[index];
      img.src = el.getAttribute("href");
      img.alt = el.querySelector("img") ? el.querySelector("img").alt : "";
      cap.textContent = el.dataset.caption || el.querySelector("img")?.alt || "";
      box.classList.add("is-open");
      box.querySelector(".lightbox-close").focus();
      document.body.style.overflow = "hidden";
    }
    function close() {
      box.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    links.forEach((el, i) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        open(i);
      });
    });
    box.querySelector(".lightbox-close").addEventListener("click", close);
    box.querySelector(".prev").addEventListener("click", () => open(index - 1));
    box.querySelector(".next").addEventListener("click", () => open(index + 1));
    box.addEventListener("click", (e) => {
      if (e.target === box) close();
    });
    document.addEventListener("keydown", (e) => {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") open(index - 1);
      if (e.key === "ArrowRight") open(index + 1);
    });
  }

  loadGames();
  setupLightbox();
})();
