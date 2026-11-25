# Flanix Games — site vitrine

Site statique (HTML, CSS, JS) pour présenter les jeux de Flanix (Allan Perez).
Aucune base de données, aucun compte, aucune pub. Prêt pour GitHub Pages.

Ce dossier n’est **pas** en ligne. La publication se fait uniquement avec
l’accord explicite d’Allan, via `scripts/publish-github-pages.sh`
(vers le dépôt `Flanix7/flanix7.github.io`, adresse :
[https://flanix7.github.io/](https://flanix7.github.io/)).


## Aperçu en local

Dans ce dossier :

```bash
python3 -m http.server 8080
```

Puis ouvre [http://localhost:8080](http://localhost:8080).

## Contenu d’EN VISIO

- Logo (proposition C, grille glitch) et bannière officielle.
- Pitch repris de la description Discord.
- Captures : menu v0.3.3, visio, chambre, porte, anomalies, judas.
- Vidéo : `assets/video/EN_VISIO_gameplay.mp4` (gameplay v3).
- Téléchargement Windows :
  [téléchargement Windows](https://github.com/Flanix7/en-visio/releases/latest/download/EN_VISIO_Windows.zip)
  (une copie stable de la dernière release ; les autres versions sont sur GitHub).
- Le jeu se met à jour tout seul : garder le `.exe` et le `.pck` dans le même dossier.

Réseaux : [Twitch flanix7](https://twitch.tv/flanix7) et
[TikTok @flanix7_](https://www.tiktok.com/@flanix7_).

## Ajouter un jeu plus tard

Ajoute une entrée dans `data/games.json` et une page `jeux/…html`,
en t’inspirant de `jeux/en-visio.html`. Les images vont dans `assets/img/…`.

## Crédits typographiques du site

Archivo Black, IBM Plex Sans, IBM Plex Mono, Caveat — SIL Open Font License 1.1,
polices auto-hébergées dans `assets/fonts/`.
