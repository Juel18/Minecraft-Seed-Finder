// Minecraft Seed Finder — works offline from file:// too
const SEEDS_FALLBACK = [
  {
    "seed": "770405633",
    "edition": "Java",
    "version": "1.21",
    "tags": [
      "Speedrun",
      "Rare"
    ],
    "rarity": 88,
    "spawn": {
      "biomes": [
        "Plains",
        "Cherry Grove"
      ],
      "x": 0,
      "z": 0
    },
    "features": {
      "village": [
        {
          "distance": 420,
          "x": 280,
          "z": -320
        }
      ],
      "stronghold": [
        {
          "distance": 1250,
          "x": -1200,
          "z": 350
        }
      ],
      "ancient_city": [
        {
          "distance": 2100,
          "x": 200,
          "z": -400
        }
      ],
      "ocean_monument": [
        {
          "distance": 2800,
          "x": 2000,
          "z": 1900
        }
      ],
      "trial_chambers": [
        {
          "distance": 1500,
          "x": 1400,
          "z": 200
        }
      ],
      "mansion": []
    },
    "description": "Fast start: village near spawn, stronghold within first ring, scenic cherry ridges."
  },
  {
    "seed": "-1843486597",
    "edition": "Java",
    "version": "1.21",
    "tags": [
      "Scenic",
      "Builder"
    ],
    "rarity": 76,
    "spawn": {
      "biomes": [
        "Meadow",
        "Cherry Grove"
      ],
      "x": 0,
      "z": 0
    },
    "features": {
      "village": [
        {
          "distance": 960,
          "x": -900,
          "z": 500
        }
      ],
      "stronghold": [
        {
          "distance": 2300,
          "x": -2300,
          "z": 200
        }
      ],
      "ancient_city": [
        {
          "distance": 1800,
          "x": 400,
          "z": -1400
        }
      ],
      "ocean_monument": [
        {
          "distance": 3500,
          "x": 3100,
          "z": -1800
        }
      ],
      "trial_chambers": [
        {
          "distance": 2200,
          "x": 2200,
          "z": 300
        }
      ],
      "mansion": [
        {
          "distance": 5600,
          "x": 5600,
          "z": -1200
        }
      ]
    },
    "description": "Builder\u2019s paradise with cherry + meadow combo and mountains. Solid progression path."
  },
  {
    "seed": "892374982347",
    "edition": "Bedrock",
    "version": "1.20",
    "tags": [
      "Explorer",
      "Rare"
    ],
    "rarity": 92,
    "spawn": {
      "biomes": [
        "Jungle",
        "Dark Forest"
      ],
      "x": 0,
      "z": 0
    },
    "features": {
      "village": [
        {
          "distance": 1400,
          "x": 1000,
          "z": -900
        }
      ],
      "stronghold": [
        {
          "distance": 2700,
          "x": -2700,
          "z": 150
        }
      ],
      "ancient_city": [
        {
          "distance": 2400,
          "x": 1800,
          "z": -600
        }
      ],
      "ocean_monument": [
        {
          "distance": 1200,
          "x": 1000,
          "z": 700
        }
      ],
      "trial_chambers": [
        {
          "distance": 3000,
          "x": -800,
          "z": 2900
        }
      ],
      "mansion": [
        {
          "distance": 6100,
          "x": -6100,
          "z": -1600
        }
      ],
      "mushroom_island": [
        {
          "distance": 3400,
          "x": 2800,
          "z": -2000
        }
      ]
    },
    "description": "Rare biome mashup at spawn, quick monument, and a distant but reachable mushroom island."
  },
  {
    "seed": "457645764576",
    "edition": "Java",
    "version": "1.19",
    "tags": [
      "Hardcore",
      "Challenge"
    ],
    "rarity": 69,
    "spawn": {
      "biomes": [
        "Snowy Plains",
        "Taiga"
      ],
      "x": 0,
      "z": 0
    },
    "features": {
      "village": [
        {
          "distance": 1800,
          "x": -1700,
          "z": -900
        }
      ],
      "stronghold": [
        {
          "distance": 3000,
          "x": -3000,
          "z": 800
        }
      ],
      "ancient_city": [
        {
          "distance": 900,
          "x": 700,
          "z": -500
        }
      ],
      "ocean_monument": [
        {
          "distance": 3800,
          "x": 3600,
          "z": -1100
        }
      ],
      "trial_chambers": [
        {
          "distance": 4200,
          "x": 4200,
          "z": 1000
        }
      ]
    },
    "description": "Harsh cold start, nearby ancient city for early loot if you dare. Great for Hardcore aficionados."
  },
  {
    "seed": "918273645",
    "edition": "Java",
    "version": "1.18",
    "tags": [
      "Scenic",
      "Explorer"
    ],
    "rarity": 73,
    "spawn": {
      "biomes": [
        "Savanna",
        "Desert"
      ],
      "x": 0,
      "z": 0
    },
    "features": {
      "village": [
        {
          "distance": 320,
          "x": 300,
          "z": 80
        }
      ],
      "stronghold": [
        {
          "distance": 1700,
          "x": -1700,
          "z": -100
        }
      ],
      "ancient_city": [],
      "ocean_monument": [
        {
          "distance": 4200,
          "x": -4100,
          "z": 700
        }
      ],
      "trial_chambers": []
    },
    "description": "Desert/Savanna spawn with a village in view; classic 1.18 exploration and early stronghold."
  }
];

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

const state = {
  seeds: [],
  userSeeds: [],
  filtered: [],
  page: 1,
  perPage: 24,
  sortBy: 'score',
  weights: { rarity: 0.6, struct: 0.3, biome: 0.1 },
};

async function loadSeeds() {
  let base = [];
  try {
    const res = await fetch('./seeds.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    base = await res.json();
  } catch (e) {
    console.warn('Could not fetch seeds.json, using embedded fallback. Reason:', e?.message || e);
    base = SEEDS_FALLBACK;
  }
  const local = JSON.parse(localStorage.getItem('userSeeds') || '[]');
  state.seeds = base.concat(local);
  state.userSeeds = local;
}

function getSelectedMulti(selectEl) {
  return Array.from(selectEl.selectedOptions).map(o => o.value);
}

function getCheckedTags() {
  return $$('#tags input[type="checkbox"]').filter(c => c.checked).map(c => c.value);
}

function withinMax(list, max) {
  if (!max || max <= 0) return true;
  if (!list || list.length === 0) return false;
  const min = Math.min(...list.map(it => it.distance ?? 9e9));
  return min <= max;
}

function biomeMatch(seedBiomes, requiredBiomes) {
  if (requiredBiomes.length === 0) return true;
  if (!seedBiomes) return false;
  return requiredBiomes.every(b => seedBiomes.includes(b));
}

function tagsMatch(seedTags, requiredTags) {
  if (requiredTags.length === 0) return true;
  const s = new Set(seedTags || []);
  return requiredTags.every(t => s.has(t));
}

function minDistance(featureList) {
  if (!featureList || featureList.length === 0) return Infinity;
  return Math.min(...featureList.map(f => f.distance ?? Infinity));
}

function scoreSeed(seed, weights, requiredBiomes) {
  const rScore = (seed.rarity ?? 0) / 100;
  const v = [
    minDistance(seed.features?.village),
    minDistance(seed.features?.stronghold),
    minDistance(seed.features?.ancient_city),
    minDistance(seed.features?.ocean_monument),
    minDistance(seed.features?.trial_chambers),
  ].map(x => (Number.isFinite(x) ? x : 99999));
  const norm = v.map(d => 1 - Math.min(d, 6000) / 6000);
  const structScore = norm.reduce((a,b)=>a+b,0) / norm.length;
  const biomeScore = biomeMatch(seed.spawn?.biomes || [], requiredBiomes) ? 1 : 0;
  const total = (weights.rarity * rScore) + (weights.struct * structScore) + (weights.biome * biomeScore);
  return Number(total.toFixed(4));
}

function applyFilters() {
  const editions = getSelectedMulti($('#edition'));
  const versions = getSelectedMulti($('#version'));
  const biomes = getSelectedMulti($('#biomes'));
  const tags = getCheckedTags();

  const maxVillage = parseInt($('#maxVillage').value || '0', 10);
  const maxStronghold = parseInt($('#maxStronghold').value || '0', 10);
  const maxAncient = parseInt($('#maxAncientCity').value || '0', 10);
  const maxMonument = parseInt($('#maxMonument').value || '0', 10);
  const maxTrials = parseInt($('#maxTrials').value || '0', 10);
  const maxMansion = parseInt($('#maxMansion').value || '0', 10);

  state.filtered = state.seeds.filter(s => {
    const edOk = editions.length ? editions.includes(s.edition) : true;
    const verOk = versions.length ? versions.includes(s.version) : true;
    const bioOk = biomeMatch(s.spawn?.biomes || [], biomes);
    const tagOk = tagsMatch(s.tags || [], tags);
    const vOk = withinMax(s.features?.village, maxVillage);
    const shOk = withinMax(s.features?.stronghold, maxStronghold);
    const acOk = withinMax(s.features?.ancient_city, maxAncient);
    const omOk = withinMax(s.features?.ocean_monument, maxMonument);
    const tcOk = withinMax(s.features?.trial_chambers, maxTrials);
    const wmOk = withinMax(s.features?.mansion, maxMansion);
    return edOk && verOk && bioOk && tagOk && vOk && shOk && acOk && omOk && tcOk && wmOk;
  });

  const weights = state.weights;
  state.filtered = state.filtered.map(s => ({ ...s, _score: scoreSeed(s, weights, biomes) }));

  sortResults();
  state.page = 1;
  render();
}

function sortResults() {
  const by = $('#sortBy').value;
  state.sortBy = by;
  state.filtered.sort((a,b)=>{
    if (by === 'rarity') return (b.rarity||0) - (a.rarity||0);
    if (by === 'stronghold') return minDistance(a.features?.stronghold) - minDistance(b.features?.stronghold);
    if (by === 'village') return minDistance(a.features?.village) - minDistance(b.features?.village);
    return (b._score || 0) - (a._score || 0);
  });
}

function paginate(list, page, perPage) {
  const start = (page-1) * perPage;
  return list.slice(start, start + perPage);
}

function badge(text, cls='') { return `<span class="badge ${cls}">${text}</span>`; }
function featureBadge(name, items) {
  if (!items || !items.length) return '';
  const d = Math.round(minDistance(items));
  return `<span class="feature">${name}: ~${d}m</span>`;
}

function toggleFavorite(seed) {
  const fav = JSON.parse(localStorage.getItem('favorites') || '[]');
  const key = String(seed.seed) + '|' + seed.version + '|' + seed.edition;
  const idx = fav.indexOf(key);
  if (idx >= 0) fav.splice(idx,1); else fav.push(key);
  localStorage.setItem('favorites', JSON.stringify(fav));
  render();
}

function isFavorite(seed) {
  const fav = JSON.parse(localStorage.getItem('favorites') || '[]');
  const key = String(seed.seed) + '|' + seed.version + '|' + seed.edition;
  return fav.includes(key);
}

function render() {
  state.perPage = parseInt($('#perPage').value, 10);
  const pageItems = paginate(state.filtered, state.page, state.perPage);
  const out = pageItems.map(seed => {
    const fav = isFavorite(seed);
    const tags = (seed.tags||[]).map(t => badge(t, t==='Rare'?'rare':'' )).join(' ');
    const biomes = (seed.spawn?.biomes||[]).join(', ') || '—';
    const features = ['Village','Stronghold','Ancient City','Monument','Trial','Mansion','Mushroom']
      .map((n,i)=>{
        const map = ['village','stronghold','ancient_city','ocean_monument','trial_chambers','mansion','mushroom_island'];
        return featureBadge(n, seed.features?.[map[i]]);
      }).filter(Boolean).join(' ');

    const score = Number(seed._score ?? 0).toFixed(2);

    return `
    <article class="card seed-card">
      <div class="seed-header">
        <div class="seed-title">${seed.seed}</div>
        <div class="badges">${tags}</div>
      </div>
      <div class="meta">Edition: ${seed.edition} • Version: ${seed.version} • Rarity: ${seed.rarity ?? 0}/100</div>
      <div class="features">${features}</div>
      <div class="desc">${seed.description || ''}</div>
      <div class="row">
        <div class="meta">Spawn biomes: ${biomes}</div>
        <div class="score">Score: ${score}</div>
      </div>
      <div class="actions">
        <button class="action" data-copy="${seed.seed}">Copy seed</button>
        <button class="action ${fav?'fav':''}" data-fav="${seed.seed}">${fav?'★':'☆'} Favorite</button>
      </div>
    </article>`
  }).join('');

  $('#results').innerHTML = out || '<div class="card">No seeds loaded. Try Apply Filters, or add/import seeds.</div>';

  const total = state.filtered.length;
  const pages = Math.max(1, Math.ceil(total / state.perPage));
  const pager = [];
  for (let p=1; p<=pages; p++) { pager.push(`<button class="page-btn ${p===state.page?'active':''}" data-page="${p}">${p}</button>`); }
  $('#pager').innerHTML = pager.join(' ');

  $$('#results .action[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const v = btn.getAttribute('data-copy');
      try { await navigator.clipboard.writeText(v); btn.textContent = 'Copied!'; setTimeout(()=>btn.textContent='Copy seed', 1000);} catch(e) {}
    });
  });
  $$('#results .action[data-fav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const seedVal = btn.getAttribute('data-fav');
      const seed = state.filtered.find(s => String(s.seed) === seedVal);
      if (seed) toggleFavorite(seed);
    });
  });
  $$('#pager .page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.page = parseInt(btn.getAttribute('data-page'), 10);
      render();
    });
  });
}

function bindUI() {
  $('#applyBtn').addEventListener('click', applyFilters);
  $('#resetBtn').addEventListener('click', () => {
    $$('select').forEach(s => s.selectedIndex = -1);
    $$('#tags input[type="checkbox"]').forEach(c => c.checked = false);
    $('#maxVillage').value = 800;
    $('#maxStronghold').value = 1600;
    $('#maxAncientCity').value = 2500;
    $('#maxMonument').value = 2500;
    $('#maxTrials').value = 2500;
    $('#maxMansion').value = 6000;
    $('#sortBy').value = 'score';
    $('#perPage').value = '24';
    $('#wRarity').value = 0.6; $('#wRarityOut').textContent = '0.6';
    $('#wStruct').value = 0.3; $('#wStructOut').textContent = '0.3';
    $('#wBiome').value = 0.1; $('#wBiomeOut').textContent = '0.1';
    applyFilters();
  });

  $('#wRarity').addEventListener('input', e => { state.weights.rarity = parseFloat(e.target.value); $('#wRarityOut').textContent = e.target.value; applyFilters(); });
  $('#wStruct').addEventListener('input', e => { state.weights.struct = parseFloat(e.target.value); $('#wStructOut').textContent = e.target.value; applyFilters(); });
  $('#wBiome').addEventListener('input', e => { state.weights.biome = parseFloat(e.target.value); $('#wBiomeOut').textContent = e.target.value; applyFilters(); });

  $('#sortBy').addEventListener('change', () => { sortResults(); render(); });
  $('#perPage').addEventListener('change', render);

  $$('.preset-row .btn').forEach(b => {
    b.addEventListener('click', () => {
      const p = b.getAttribute('data-preset');
      $$('select').forEach(s => s.selectedIndex = -1);
      $$('#tags input[type="checkbox"]').forEach(c => c.checked = false);

      if (p === 'speedrun') {
        selectOptions($('#biomes'), ['Plains']);
        $('#maxVillage').value = 600;
        $('#maxStronghold').value = 1600;
        $('#sortBy').value = 'stronghold';
        checkTags(['Speedrun']);
      } else if (p === 'hardcore') {
        selectOptions($('#biomes'), ['Taiga','Snowy Plains']);
        $('#maxVillage').value = 1200;
        $('#maxStronghold').value = 2500;
        checkTags(['Hardcore','Challenge']);
      } else if (p === 'builder') {
        selectOptions($('#biomes'), ['Plains','Meadow','Cherry Grove']);
        $('#maxVillage').value = 1000;
        $('#maxStronghold').value = 2500;
        checkTags(['Builder','Scenic']);
      } else if (p === 'scenic') {
        selectOptions($('#biomes'), ['Cherry Grove','Meadow','Jungle','Dark Forest']);
        $('#maxVillage').value = 2000;
        $('#maxStronghold').value = 3000;
        checkTags(['Scenic','Explorer']);
      }
      applyFilters();
    });
  });

  $('#customSeedForm').addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const seed = (fd.get('seed') || '').trim();
    const edition = fd.get('edition');
    const version = (fd.get('version') || '').trim();
    const biomes = (fd.get('biomes') || '').split(',').map(s => s.trim()).filter(Boolean);
    const tags = (fd.get('tags') || '').split(',').map(s => s.trim()).filter(Boolean);
    const description = (fd.get('description') || '').trim();
    let features = {};
    try { features = JSON.parse(fd.get('features') || '{}'); }
    catch { alert('Features JSON is invalid.'); return; }
    const rarity = 50;
    const obj = { seed, edition, version, spawn:{biomes, x:0, z:0}, tags, rarity, features, description, _user: true };
    state.seeds.push(obj);
    state.userSeeds.push(obj);
    localStorage.setItem('userSeeds', JSON.stringify(state.userSeeds));
    e.target.reset();
    applyFilters();
  });

  $('#exportBtn').addEventListener('click', () => {
    const payload = JSON.stringify(state.seeds, null, 2);
    const blob = new Blob([payload], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'minecraft-seeds-export.json'; a.click();
    setTimeout(()=>URL.revokeObjectURL(url), 1000);
  });
  $('#importFile').addEventListener('change', async (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    const text = await f.text();
    try {
      const arr = JSON.parse(text);
      if (!Array.isArray(arr)) throw new Error('Invalid JSON');
      state.seeds = arr;
      state.userSeeds = arr.filter(s => s._user === true);
      localStorage.setItem('userSeeds', JSON.stringify(state.userSeeds));
      applyFilters();
    } catch (err) {
      alert('Could not import JSON: ' + err.message);
    }
  });
}

function selectOptions(selectEl, values) {
  const map = new Set(values);
  Array.from(selectEl.options).forEach(o => { o.selected = map.has(o.value); });
}
function checkTags(values) {
  const set = new Set(values);
  $$('#tags input[type="checkbox"]').forEach(c => c.checked = set.has(c.value));
}

async function init() {
  bindUI();
  await loadSeeds();
  applyFilters();
}

init();
