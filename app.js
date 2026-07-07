const API_URL = "https://lootandwaifus.com/api/swordxstaff/treasures.json";
const ICON_BASE = "https://lootandwaifus.com/treasures/swordxstaff/";
const STORAGE_KEY = "sxs-relic-planner-v2";
const LEGACY_STORAGE_KEY = "sxs-relic-planner-v1";

const RU = {
  rarity: {
    Rainbow: "Мифическая",
    SSR: "Легендарная",
    SR: "Эпическая",
    R: "Редкая",
    W: "Обычная"
  },
  element: {
    Dark: "Тьма",
    Fire: "Огонь",
    Light: "Свет",
    Water: "Вода",
    Wind: "Ветер",
    Earth: "Земля"
  },
  stat: {
    ATK: "АТК",
    DEF: "ЗАЩ",
    HP: "ОЗ",
    SPD: "Скорость",
    Accuracy: "Точность",
    "Basic Dispatch Rewards": "Базовые награды отправки",
    "Block Efficiency": "Эффективность блока",
    "Block Rate": "Шанс блока",
    "Bonus DMG against Flamoenix": "Бонус урона по Пламофениксу",
    "Bonus DMG against Primordial Loong": "Бонус урона по Изначальному Луну",
    "Bonus DMG against Storm Griffin": "Бонус урона по Штормовому грифону",
    "Bonus DMG against Yamata no Orochi": "Бонус урона по Ямато-но-Ороти",
    "Crit DMG": "Крит. урон",
    "Crit RES": "Сопр. криту",
    "Crit Rate": "Шанс крита",
    "Destiny Fruit Growth SPD": "Скорость роста плода судьбы",
    "DMG Boost": "Усиление урона",
    "DMG RES": "Снижение урона",
    "Effect Hit Rate": "Шанс эффекта",
    "Effect RES": "Сопр. эффектам",
    "Elemental Mastery": "Мастерство стихий",
    "Physical Mastery": "Физическое мастерство"
  },
  source: {
    Aethyris: "Этерис",
    Aqualis: "Обитель вод",
    "Cinder Ridge": "Пепельный хребет",
    Hapadi: "Зеленая роща",
    Verdantglade: "Зеленая роща"
  },
  name: {
    "Godly Codex": "Божественный кодекс",
    "Pinnacle Radiance": "Вершинное сияние",
    "Horn of Abundance": "Корона освобождения",
    "Skymending Stone": "Камень небесного шва",
    "Lava Fossil": "Лавовый окаменелый череп",
    "Multiverse Key": "Ключ мультивселенной",
    "Colorful Realm": "Цветной мир",
    "Oracle Codex": "Кодекс оракула",
    "Luminous Mushroom Cap": "Шляпка светящегося гриба",
    "Glowing Mushroom Cap": "Шляпка светящегося гриба"
  }
};

const FALLBACK_RELICS = [
  {
    id: "treasure_71222",
    name: "Absurd Rebellion",
    rarity: "Rainbow",
    element: "Dark",
    region: "Hapadi",
    description: "+55",
    stats: ["SPD"],
    set: 68326,
    set_bonus: [["Block Rate"], ["DMG Boost"], ["DMG RES"]],
    icon: "treasure_71222.png"
  },
  {
    id: "treasure_71606",
    name: "Abyssal Crown",
    rarity: "Rainbow",
    element: "Water",
    region: "Aethyris",
    description: "+69",
    stats: ["ATK"],
    set: 68308,
    set_bonus: [["Accuracy"], ["DMG Boost"], ["DMG RES"]],
    icon: "treasure_71606.png"
  },
  {
    id: "treasure_71226",
    name: "Abyssal Dive",
    rarity: "Rainbow",
    element: "Dark",
    region: "Hapadi",
    description: "+6%",
    stats: ["Block Rate"],
    set: 68331,
    set_bonus: [["Crit Rate"], ["DMG Boost"], ["DMG RES"]],
    icon: "treasure_71226.png"
  },
  {
    id: "treasure_71412",
    name: "Aeolian Wings",
    rarity: "Rainbow",
    element: "Wind",
    region: "Aethyris",
    description: "+55",
    stats: ["SPD"],
    set: 68317,
    set_bonus: [["Block Rate"], ["DMG RES"], ["DMG Boost"]],
    icon: "treasure_71412.png"
  },
  {
    id: "treasure_61607",
    name: "Abyssal Glyph Whip",
    rarity: "SSR",
    element: "Dark",
    region: "Cinder Ridge",
    description: "+33",
    stats: ["Elemental Mastery"],
    set: 60201,
    set_bonus: [["SPD"], ["Accuracy"], ["DMG RES"]],
    icon: "treasure_61607.png"
  },
  {
    id: "treasure_61611",
    name: "Abyssal Obsidian",
    rarity: "SSR",
    element: "Dark",
    region: "Aqualis",
    description: "+9%",
    stats: ["ATK"],
    set: 60301,
    set_bonus: [["SPD"], ["Accuracy"], ["DMG RES"]],
    icon: "treasure_61611.png"
  }
];

const CLASS_RULES = {
  Sorcerer: {
    label: "Чародей",
    elements: { Light: 18, Fire: 14 },
    stats: {
      "Elemental Mastery": 34,
      "Crit Rate": 28,
      "Crit DMG": 24,
      "DMG Boost": 22,
      ATK: 18,
      SPD: 14,
      Accuracy: 7
    }
  },
  Duelist: {
    label: "Дуэлянт",
    elements: { Fire: 18, Dark: 14 },
    stats: {
      "Physical Mastery": 34,
      "Crit Rate": 28,
      "Crit DMG": 24,
      "DMG Boost": 22,
      ATK: 18,
      SPD: 16,
      Accuracy: 7
    }
  },
  Knight: {
    label: "Рыцарь",
    elements: { Water: 18, Light: 14 },
    stats: {
      HP: 26,
      DEF: 24,
      "Block Rate": 24,
      "Block Efficiency": 22,
      "DMG RES": 18,
      "DMG Boost": 11,
      ATK: 8
    }
  },
  Sage: {
    label: "Мудрец",
    elements: { Dark: 18 },
    stats: {
      "Effect Hit Rate": 28,
      SPD: 24,
      "Elemental Mastery": 20,
      "DMG Boost": 18,
      "Effect RES": 16,
      HP: 10,
      ATK: 10
    }
  }
};

const RARITY_SCORE = {
  Rainbow: 18,
  SSR: 12,
  SR: 7,
  R: 3,
  W: 1
};

const RARITY_ORDER = {
  Rainbow: 5,
  SSR: 4,
  SR: 3,
  R: 2,
  W: 1
};

const SOURCE_ALIASES = {
  Hapadi: "Verdantglade"
};

const state = {
  relics: [],
  owned: {},
  className: "Sorcerer",
  search: "",
  element: "all",
  stat: "all",
  rarity: "all",
  source: "all",
  sortMode: "score",
  ownedOnly: false
};

const els = {
  dataStatus: document.querySelector("#dataStatus"),
  classButtons: document.querySelector("#classButtons"),
  searchInput: document.querySelector("#searchInput"),
  elementFilter: document.querySelector("#elementFilter"),
  statFilter: document.querySelector("#statFilter"),
  rarityFilter: document.querySelector("#rarityFilter"),
  sourceFilter: document.querySelector("#sourceFilter"),
  sortMode: document.querySelector("#sortMode"),
  ownedOnly: document.querySelector("#ownedOnly"),
  ownedCount: document.querySelector("#ownedCount"),
  visibleCount: document.querySelector("#visibleCount"),
  clearFilters: document.querySelector("#clearFilters"),
  clearOwned: document.querySelector("#clearOwned"),
  recommendTitle: document.querySelector("#recommendTitle"),
  recommendHint: document.querySelector("#recommendHint"),
  recommendations: document.querySelector("#recommendations"),
  relicGrid: document.querySelector("#relicGrid"),
  template: document.querySelector("#relicTemplate")
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY) || "{}");
    state.owned = saved.owned || {};
    state.className = saved.className || state.className;
  } catch {
    state.owned = {};
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    owned: state.owned,
    className: state.className
  }));
}

function normaliseRelic(relic) {
  return {
    ...relic,
    stats: relic.stats || [],
    set_bonus: relic.set_bonus || [],
    source: relic.source || relic.region || ""
  };
}

async function fetchRelics() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);
  const response = await fetch(API_URL, { signal: controller.signal });
  clearTimeout(timeout);
  if (!response.ok) {
    throw new Error(`API ${response.status}`);
  }
  const relics = await response.json();
  state.relics = relics.map(normaliseRelic);
}

function fillSelect(select, values, allLabel, labelFor) {
  select.innerHTML = "";
  select.append(new Option(allLabel, "all"));
  values.forEach((value) => select.append(new Option(labelFor(value), value)));
}

function initFilters() {
  const elements = [...new Set(state.relics.map((relic) => relic.element).filter(Boolean))].sort();
  const stats = [...new Set(state.relics.flatMap((relic) => relic.stats).filter(Boolean))].sort();
  const rarities = [...new Set(state.relics.map((relic) => relic.rarity).filter(Boolean))]
    .sort((a, b) => rarityRank(b) - rarityRank(a));
  const sources = [...new Set(state.relics.map(getSource).filter(Boolean))].sort();
  fillSelect(els.elementFilter, elements, "Все элементы", (value) => localise(value, "element"));
  fillSelect(els.statFilter, stats, "Все статы", (value) => localise(value, "stat"));
  fillSelect(els.rarityFilter, rarities, "Любая редкость", (value) => localise(value, "rarity"));
  fillSelect(els.sourceFilter, sources, "Все места", localiseSource);
}

function initClasses() {
  els.classButtons.innerHTML = "";
  Object.entries(CLASS_RULES).forEach(([key, rule]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `class-button ${key === state.className ? "active" : ""}`;
    button.textContent = rule.label;
    button.addEventListener("click", () => {
      state.className = key;
      saveState();
      render();
    });
    els.classButtons.append(button);
  });
}

function getOwnedRecord(id) {
  return state.owned[id] || null;
}

function setOwned(id, nextOwned) {
  if (!nextOwned) {
    delete state.owned[id];
  } else {
    state.owned[id] = state.owned[id] || { level: 0 };
  }
  saveState();
  render();
}

function setLevel(id, level) {
  state.owned[id] = state.owned[id] || { level: 0 };
  state.owned[id].level = Math.max(0, Math.min(100, Number(level) || 0));
  saveState();
  renderRecommendations();
  updateCounters(getFilteredRelics().length);
}

function localise(value, kind) {
  return RU[kind]?.[value] || value || "Нет данных";
}

function localiseName(relic) {
  return RU.name[relic.name] || relic.name;
}

function getSource(relic) {
  const source = relic.source || relic.region || "";
  return SOURCE_ALIASES[source] || source;
}

function localiseSource(source) {
  if (!source) return "Источник не указан";
  return RU.source[source] || source;
}

function rarityRank(rarity) {
  return RARITY_ORDER[rarity] || 0;
}

function statScore(relic, rule) {
  return relic.stats.reduce((sum, stat) => sum + (rule.stats[stat] || 0), 0);
}

function setBonusScore(relic, rule) {
  return relic.set_bonus
    .flat()
    .reduce((sum, stat) => sum + Math.round((rule.stats[stat] || 0) * 0.45), 0);
}

function scoreRelic(relic) {
  const rule = CLASS_RULES[state.className];
  const owned = getOwnedRecord(relic.id);
  const levelBonus = owned ? Math.min(30, (Number(owned.level) || 0) * 0.45) : 0;
  return Math.round(
    statScore(relic, rule) +
    setBonusScore(relic, rule) +
    (rule.elements[relic.element] || 0) +
    (RARITY_SCORE[relic.rarity] || 0) +
    levelBonus
  );
}

function getFilteredRelics() {
  const query = state.search.trim().toLowerCase();
  return state.relics.filter((relic) => {
    const owned = Boolean(getOwnedRecord(relic.id));
    if (state.ownedOnly && !owned) return false;
    if (state.element !== "all" && relic.element !== state.element) return false;
    if (state.stat !== "all" && !relic.stats.includes(state.stat)) return false;
    if (state.rarity !== "all" && relic.rarity !== state.rarity) return false;
    if (state.source !== "all" && getSource(relic) !== state.source) return false;
    if (!query) return true;

    const setBonus = relic.set_bonus.flat();
    const haystack = [
      relic.name,
      localiseName(relic),
      relic.rarity,
      localise(relic.rarity, "rarity"),
      relic.element,
      localise(relic.element, "element"),
      getSource(relic),
      localiseSource(getSource(relic)),
      relic.stats.join(" "),
      relic.stats.map((stat) => localise(stat, "stat")).join(" "),
      setBonus.join(" "),
      setBonus.map((stat) => localise(stat, "stat")).join(" ")
    ].join(" ").toLowerCase();
    return haystack.includes(query);
  });
}

function makeTag(text, extraClass = "") {
  const tag = document.createElement("span");
  tag.className = `tag ${extraClass}`;
  tag.textContent = text;
  return tag;
}

function renderRelicCard(relic, options = {}) {
  const fragment = els.template.content.cloneNode(true);
  const card = fragment.querySelector(".relic-card");
  const owned = getOwnedRecord(relic.id);

  card.classList.toggle("owned", Boolean(owned));
  card.classList.toggle("recommended", Boolean(options.recommended));
  card.dataset.rarity = relic.rarity || "";

  const img = fragment.querySelector(".relic-art");
  img.src = `${ICON_BASE}${relic.icon}`;
  img.alt = localiseName(relic);
  img.addEventListener("error", () => {
    img.removeAttribute("src");
    img.alt = `${localiseName(relic)}: картинка не загрузилась`;
  });

  fragment.querySelector("h3").textContent = localiseName(relic);
  fragment.querySelector(".score").remove();

  const tags = fragment.querySelector(".tags");
  tags.append(makeTag(localise(relic.rarity, "rarity"), `rarity-tag rarity-${relic.rarity}`));
  tags.append(makeTag(localise(relic.element, "element"), relic.element));
  relic.stats.forEach((stat) => tags.append(makeTag(localise(stat, "stat"))));

  const setline = fragment.querySelector(".setline");
  const bonus = relic.set_bonus.flat().map((stat) => localise(stat, "stat")).join(" / ");
  setline.textContent = bonus ? `Комплект: ${bonus}` : "Комплект: нет данных";
  fragment.querySelector(".source-line").textContent = `Источник: ${localiseSource(getSource(relic))}`;

  const toggle = fragment.querySelector(".owned-toggle");
  toggle.addEventListener("click", () => setOwned(relic.id, !owned));

  const levelInput = fragment.querySelector(".level-input");
  levelInput.value = owned?.level ?? 0;
  levelInput.disabled = !owned;
  levelInput.addEventListener("change", () => setLevel(relic.id, levelInput.value));

  return fragment;
}

function getRecommendedRelics() {
  return state.relics
    .filter((relic) => getOwnedRecord(relic.id))
    .sort((a, b) => scoreRelic(b) - scoreRelic(a))
    .slice(0, 8);
}

function renderRecommendations() {
  const rule = CLASS_RULES[state.className];
  const hasOwned = Object.keys(state.owned).length > 0;
  els.recommendTitle.textContent = `${rule.label}: что качать из отмеченного`;
  els.recommendHint.textContent = hasOwned
    ? "Сортировка по статам, стихии, комплекту и прокачке"
    : "Сначала отметь реликвии, которые есть";
  els.recommendations.innerHTML = "";

  if (!hasOwned) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "Отмеченных реликвий пока нет, поэтому подбор не строится.";
    els.recommendations.append(empty);
    return;
  }

  getRecommendedRelics().forEach((relic) => {
    els.recommendations.append(renderRelicCard(relic, { recommended: true }));
  });
}

function updateCounters(visibleCount) {
  els.ownedCount.textContent = Object.keys(state.owned).length;
  els.visibleCount.textContent = visibleCount;
}

function groupBySource(relics) {
  const groups = new Map();
  relics.forEach((relic) => {
    const source = getSource(relic);
    if (!groups.has(source)) groups.set(source, []);
    groups.get(source).push(relic);
  });
  return groups;
}

function compareRelics(a, b) {
  if (state.sortMode === "rarity") {
    return rarityRank(b.rarity) - rarityRank(a.rarity) || scoreRelic(b) - scoreRelic(a) || localiseName(a).localeCompare(localiseName(b), "ru");
  }
  if (state.sortMode === "name") {
    return localiseName(a).localeCompare(localiseName(b), "ru") || rarityRank(b.rarity) - rarityRank(a.rarity);
  }
  return scoreRelic(b) - scoreRelic(a) || rarityRank(b.rarity) - rarityRank(a.rarity) || localiseName(a).localeCompare(localiseName(b), "ru");
}

function renderRelics() {
  const filtered = getFilteredRelics().sort(compareRelics);
  els.relicGrid.innerHTML = "";
  const groups = groupBySource(filtered);

  if (!filtered.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "По текущим фильтрам ничего не найдено.";
    els.relicGrid.append(empty);
    updateCounters(0);
    return;
  }

  groups.forEach((relics, source) => {
    const group = document.createElement("section");
    group.className = "source-group";
    const title = document.createElement("h3");
    title.textContent = localiseSource(source);
    group.append(title);
    const grid = document.createElement("div");
    grid.className = "group-grid";
    relics.forEach((relic) => grid.append(renderRelicCard(relic)));
    group.append(grid);
    els.relicGrid.append(group);
  });
  updateCounters(filtered.length);
}

function render() {
  initClasses();
  renderRecommendations();
  renderRelics();
}

function bindEvents() {
  els.searchInput.addEventListener("input", () => {
    state.search = els.searchInput.value;
    renderRelics();
  });
  els.elementFilter.addEventListener("change", () => {
    state.element = els.elementFilter.value;
    renderRelics();
  });
  els.statFilter.addEventListener("change", () => {
    state.stat = els.statFilter.value;
    renderRelics();
  });
  els.rarityFilter.addEventListener("change", () => {
    state.rarity = els.rarityFilter.value;
    renderRelics();
  });
  els.sourceFilter.addEventListener("change", () => {
    state.source = els.sourceFilter.value;
    renderRelics();
  });
  els.sortMode.addEventListener("change", () => {
    state.sortMode = els.sortMode.value;
    renderRelics();
  });
  els.ownedOnly.addEventListener("change", () => {
    state.ownedOnly = els.ownedOnly.checked;
    renderRelics();
  });
  els.clearFilters.addEventListener("click", () => {
    state.search = "";
    state.element = "all";
    state.stat = "all";
    state.rarity = "all";
    state.source = "all";
    state.sortMode = "score";
    state.ownedOnly = false;
    els.searchInput.value = "";
    els.elementFilter.value = "all";
    els.statFilter.value = "all";
    els.rarityFilter.value = "all";
    els.sourceFilter.value = "all";
    els.sortMode.value = "score";
    els.ownedOnly.checked = false;
    renderRelics();
  });
  els.clearOwned.addEventListener("click", () => {
    state.owned = {};
    saveState();
    render();
  });
}

async function boot() {
  loadState();
  initClasses();
  bindEvents();
  try {
    await fetchRelics();
    initFilters();
    els.dataStatus.textContent = `Загружено ${state.relics.length} реликвий`;
    render();
  } catch (error) {
    state.relics = FALLBACK_RELICS.map(normaliseRelic);
    initFilters();
    els.dataStatus.textContent = `API не ответил, открыт демо-набор: ${state.relics.length}`;
    render();
  }
}

boot();
