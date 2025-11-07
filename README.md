# Minecraft Seed Finder (Static Website)

This is a single-page, offline-friendly website to **search and rank Minecraft world seeds** based on:
- Edition, version
- Required spawn biomes
- Max distance to structures (Village, Stronghold, Ancient City, Ocean Monument, Trial Chambers, Woodland Mansion)
- Playstyle tags (Speedrun, Hardcore, Builder, Explorer, Challenge, Rare, Scenic)
- A tunable scoring system (Rarity, Structure proximity, Biome match)

## How it works
- The site loads `seeds.json` (included demo list) and merges any **custom seeds** you add (stored in your browser).
- Use filters and the **Apply Filters** button.
- Sort by **Best score**, **Rarity**, **Closest stronghold**, or **Closest village**.
- Add your own seeds via **Add Custom Seed** (paste structure distances as JSON if you have them).
- **Export** your combined dataset to JSON and share it with friends; **Import** to replace the current list.

> ⚠️ Data included here is **sample/demo**. Replace `seeds.json` with authoritative data to make it production-grade.

## Files
- `index.html` — UI layout
- `styles.css` — styling
- `app.js` — logic (filtering, scoring, pagination, favorites, import/export)
- `seeds.json` — demo seeds
- `README.md` — this file

## Run
Just open `index.html` in a browser. No build step or server required.

## Notes
- Scoring assumes structure usefulness decays after ~6000 blocks.
- The demo uses **fabricated** distances for illustration. For real usage, generate a dataset with e.g. world-gen tools or community sources and keep version/edition differences in mind.
- Last generated: 2025-11-07T03:38:59.310680Z
