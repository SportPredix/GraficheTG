const sportSelect = document.getElementById("sportSelect");
const competitionSelect = document.getElementById("competitionSelect");
const matchdayInput = document.getElementById("matchday");
const roundSelect = document.getElementById("roundSelect");
const calendarTagInput = document.getElementById("calendarTag");
const primaryColorInput = document.getElementById("primaryColor");
const secondaryColorInput = document.getElementById("secondaryColor");
const threeByThreeColorsWrap = document.getElementById("threeByThreeColors");
const accentColorInput = document.getElementById("accentColor");
const cardColorInput = document.getElementById("cardColor");
const customTitleWrap = document.getElementById("customTitleWrap");
const customLeagueTitleInput = document.getElementById("customLeagueTitle");

const rowsEditor = document.getElementById("rowsEditor");
const matchesList = document.getElementById("matchesList");
const previewLeague = document.getElementById("previewLeague");
const previewMatchday = document.getElementById("previewMatchday");
const previewCompetitionLogoWrap = document.getElementById("previewCompetitionLogoWrap");
const previewCompetitionLogo = document.getElementById("previewCompetitionLogo");
const previewWrap = document.getElementById("previewWrap");
const graphicScaleBox = document.getElementById("graphicScaleBox");
const graphic = document.getElementById("graphic");
const addRowButton = document.getElementById("addRow");

const DEFAULT_SUBTITLE = "Pronostici esclusivi t.me/sportpredix";
const GRAPHIC_BASE_WIDTH = 1200;
const PERSONAL_COMPETITION_ID = "personale";

const SPORTS = [
  { id: "calcio", label: "Calcio" },
  { id: "tennis", label: "Tennis" }
];

const COMPETITIONS = [
  {
    sportId: "calcio",
    id: "serie-a-2025-26",
    label: "Serie A 2025/26",
    dataKey: "SERIE_A_2025_26",
    colors: { primary: "#004aac", secondary: "#2ea6ff" }
  },
  {
    sportId: "calcio",
    id: "premier-league-2025-26",
    label: "Premier League 2025/26",
    dataKey: "PREMIER_LEAGUE_2025_26",
    colors: { primary: "#2d0a4b", secondary: "#ff2c8f" }
  },
  {
    sportId: "calcio",
    id: "la-liga-2025-26",
    label: "La Liga 2025/26",
    dataKey: "LA_LIGA_2025_26",
    colors: { primary: "#ff5a00", secondary: "#ffb200" }
  },
  {
    sportId: "calcio",
    id: "bundesliga-2025-26",
    label: "Bundesliga 2025/26",
    dataKey: "BUNDESLIGA_2025_26",
    colors: { primary: "#181818", secondary: "#d90429" }
  },
  {
    sportId: "calcio",
    id: "ligue-1-2025-26",
    label: "Ligue 1 2025/26",
    dataKey: "LIGUE_1_2025_26",
    colors: { primary: "#0a1f44", secondary: "#c6f600" }
  },
  {
    sportId: "calcio",
    id: "champions-league-2025-26",
    label: "Champions League 2025/26",
    dataKey: "CHAMPIONS_LEAGUE_2025_26",
    colors: { primary: "#0a1e5e", secondary: "#2e86ff" }
  },
  {
    sportId: "calcio",
    id: "europa-league-2024-25",
    label: "Europa League 2024/25",
    dataKey: "EUROPA_LEAGUE_2024_25",
    colors: { primary: "#171717", secondary: "#ff7b00" }
  },
  {
    sportId: "calcio",
    id: "conference-league-2024-25",
    label: "Conference League 2024/25",
    dataKey: "CONFERENCE_LEAGUE_2024_25",
    colors: { primary: "#0f1f14", secondary: "#18b56a" }
  },
  {
    sportId: "calcio",
    id: "three-by-three",
    label: "3 x 3",
    dataKey: "THREE_BY_THREE",
    variant: "three-by-three",
    rowLimit: 3,
    rowFixed: true,
    colors: { primary: "#0f1217", secondary: "#1f1d2a", accent: "#f06a1b", card: "#0e1116" }
  },
  {
    sportId: "calcio",
    id: "coppa-italia-2024-25",
    label: "Coppa Italia 2024/25",
    dataKey: "COPPA_ITALIA_2024_25",
    colors: { primary: "#0072ce", secondary: "#00a884" }
  },
  {
    sportId: "calcio",
    id: "fa-cup-2024-25",
    label: "FA Cup 2024/25",
    dataKey: "FA_CUP_2024_25",
    colors: { primary: "#114e96", secondary: "#d71a2f" }
  },
  {
    sportId: "calcio",
    id: "copa-del-rey-2024-25",
    label: "Copa del Rey 2024/25",
    dataKey: "COPA_DEL_REY_2024_25",
    colors: { primary: "#a3121f", secondary: "#f4b400" }
  },
  {
    sportId: "calcio",
    id: "dfb-pokal-2024-25",
    label: "DFB Pokal 2024/25",
    dataKey: "DFB_POKAL_2024_25",
    colors: { primary: "#111111", secondary: "#e4002b" }
  },
  {
    sportId: "calcio",
    id: "coupe-de-france-2024-25",
    label: "Coupe de France 2024/25",
    dataKey: "COUPE_DE_FRANCE_2024_25",
    colors: { primary: "#1f4aa8", secondary: "#de2033" }
  },
  {
    sportId: "tennis",
    id: "indian-wells-2026",
    label: "Indian Wells 2026",
    dataKey: "INDIAN_WELLS_2026",
    colors: { primary: "#1f3b7a", secondary: "#ffb300" }
  },
  {
    sportId: "calcio",
    id: "personale",
    label: "Personale",
    dataKey: "PERSONAL_LEAGUE",
    colors: { primary: "#031211", secondary: "#11b9a8" }
  }
];

const COMPETITION_LOGOS = {
  "serie-a-2025-26": "./loghi campionati/seriea.png",
  "premier-league-2025-26": "./loghi campionati/premierleague.png",
  "la-liga-2025-26": "./loghi campionati/laliga.png",
  "bundesliga-2025-26": "./loghi campionati/bundesliga.png",
  "ligue-1-2025-26": "./loghi campionati/ligue1.png",
  "champions-league-2025-26": "./loghi campionati/championsleague.png",
  "europa-league-2024-25": "./loghi campionati/europaleague.png"
};

const state = {
  rows: [],
  currentSportId: SPORTS[0].id,
  currentCompetitionId: COMPETITIONS.find((item) => item.sportId === SPORTS[0].id)?.id || COMPETITIONS[0].id,
  currentRoundId: "",
  roundCache: {}
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeHexColor(value, fallback = "#000000") {
  if (typeof value !== "string") {
    return fallback;
  }

  const trimmed = value.trim();
  if (/^#[0-9a-f]{6}$/i.test(trimmed)) {
    return trimmed.toLowerCase();
  }

  if (/^#[0-9a-f]{3}$/i.test(trimmed)) {
    const [r, g, b] = trimmed.slice(1).split("");
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }

  return fallback;
}

function hexToRgba(hex, alpha = 1) {
  const normalized = normalizeHexColor(hex);
  const r = parseInt(normalized.slice(1, 3), 16);
  const g = parseInt(normalized.slice(3, 5), 16);
  const b = parseInt(normalized.slice(5, 7), 16);
  const clampedAlpha = Math.min(1, Math.max(0, alpha));
  return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
}

function getReadableTextColor(hex) {
  const normalized = normalizeHexColor(hex);
  const r = parseInt(normalized.slice(1, 3), 16) / 255;
  const g = parseInt(normalized.slice(3, 5), 16) / 255;
  const b = parseInt(normalized.slice(5, 7), 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.62 ? "#0b0f12" : "#ffffff";
}

function createRow(data = {}) {
  return {
    id: data.id ?? ((globalThis.crypto && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`),
    date: data.date ?? "--/--",
    time: data.time ?? "--:--",
    homeTeam: data.homeTeam ?? "Squadra Casa",
    awayTeam: data.awayTeam ?? "Squadra Ospite",
    pick: data.pick ?? ""
  };
}

function cloneRows(rows) {
  return rows.map((row) => createRow(row));
}

function getCompetitionsForSport(sportId = state.currentSportId) {
  return COMPETITIONS.filter((item) => item.sportId === sportId);
}

function getDefaultCompetitionForSport(sportId = state.currentSportId) {
  return getCompetitionsForSport(sportId)[0] || COMPETITIONS[0];
}

function getCompetitionConfig(competitionId = state.currentCompetitionId) {
  return COMPETITIONS.find((item) => item.id === competitionId) || getDefaultCompetitionForSport(state.currentSportId);
}

function getCalendarData(competitionId = state.currentCompetitionId) {
  const config = getCompetitionConfig(competitionId);
  return globalThis[config.dataKey] || null;
}

function isPersonalCompetition(competitionId = state.currentCompetitionId) {
  return competitionId === PERSONAL_COMPETITION_ID;
}

function getCompetitionVariant(competitionId = state.currentCompetitionId) {
  return getCompetitionConfig(competitionId).variant || "default";
}

function getRowLimit(competitionId = state.currentCompetitionId) {
  return getCompetitionConfig(competitionId).rowLimit || 0;
}

function isRowLimitFixed(competitionId = state.currentCompetitionId) {
  return Boolean(getCompetitionConfig(competitionId).rowFixed);
}

function normalizeRowsForCompetition(rows, competitionId = state.currentCompetitionId) {
  const rowLimit = getRowLimit(competitionId);
  if (!rowLimit) {
    return rows;
  }

  let nextRows = rows.slice(0, rowLimit);
  if (isRowLimitFixed(competitionId)) {
    while (nextRows.length < rowLimit) {
      nextRows.push(createRow());
    }
  }

  return nextRows;
}

function getCompetitionLogoUrl(competitionId = state.currentCompetitionId) {
  return COMPETITION_LOGOS[competitionId] || "";
}

function setPreviewLogo(competitionId, leagueTitle) {
  if (!previewCompetitionLogoWrap || !previewCompetitionLogo) {
    return;
  }

  const logoUrl = getCompetitionLogoUrl(competitionId);
  if (!logoUrl) {
    previewCompetitionLogoWrap.classList.remove("has-logo");
    previewCompetitionLogo.removeAttribute("src");
    previewCompetitionLogo.removeAttribute("alt");
    return;
  }

  previewCompetitionLogo.alt = `Logo ${leagueTitle}`;
  const normalizedLogoUrl = encodeURI(logoUrl);

  if (previewCompetitionLogo.getAttribute("src") !== normalizedLogoUrl) {
    previewCompetitionLogo.src = normalizedLogoUrl;
  }

  previewCompetitionLogoWrap.classList.add("has-logo");
}

function updateCustomTitleUi(competitionId = state.currentCompetitionId) {
  if (!customTitleWrap || !customLeagueTitleInput) {
    return;
  }

  const isPersonal = isPersonalCompetition(competitionId);
  customTitleWrap.hidden = !isPersonal;

  if (!isPersonal) {
    return;
  }

  if (!customLeagueTitleInput.value.trim()) {
    customLeagueTitleInput.value = "PERSONALE";
  }

  calendarTagInput.value = customLeagueTitleInput.value.trim();
}

function updateThreeByThreeUi(competitionId = state.currentCompetitionId) {
  if (!threeByThreeColorsWrap) {
    return;
  }

  const isThreeByThree = getCompetitionVariant(competitionId) === "three-by-three";
  threeByThreeColorsWrap.hidden = !isThreeByThree;

  if (!isThreeByThree) {
    return;
  }

  const colors = getCompetitionConfig(competitionId).colors || {};
  if (accentColorInput && colors.accent) {
    accentColorInput.value = colors.accent;
  }
  if (cardColorInput && colors.card) {
    cardColorInput.value = colors.card;
  }
}

function getRoundIds(calendarData) {
  if (!calendarData || !calendarData.rounds) {
    return [];
  }

  if (Array.isArray(calendarData.roundOrder) && calendarData.roundOrder.length > 0) {
    return calendarData.roundOrder.map((value) => String(value));
  }

  const keys = Object.keys(calendarData.rounds);
  if (keys.every((key) => /^\d+$/.test(key))) {
    return keys.sort((a, b) => Number(a) - Number(b));
  }

  return keys.sort((a, b) => a.localeCompare(b, "it", { numeric: true }));
}

function getRoundRows(calendarData, roundId) {
  if (!calendarData || !calendarData.rounds) {
    return [];
  }

  const roundData = calendarData.rounds[String(roundId)];
  const rawRows = Array.isArray(roundData)
    ? roundData
    : (roundData && Array.isArray(roundData.matches) ? roundData.matches : []);

  return rawRows.map((row) => createRow(row));
}

function getRoundLabel(calendarData, roundId) {
  const roundKey = String(roundId);

  if (calendarData && calendarData.roundNames && calendarData.roundNames[roundKey]) {
    return calendarData.roundNames[roundKey];
  }

  if (/^\d+$/.test(roundKey)) {
    const term = calendarData?.roundTerm || "Giornata";
    return `${Number(roundKey)}ª ${term}`;
  }

  const term = calendarData?.roundTerm || "Turno";
  return `${term} ${roundKey}`;
}

function buildDefaultSubtitle(calendarData, roundId) {
  const roundKey = String(roundId || "");
  const roundLabel = getRoundLabel(calendarData, roundKey);
  const roundTerm = calendarData?.roundTerm || "Giornata";

  let suffix = roundKey;
  if (!/^\d+$/.test(suffix)) {
    const labelNumber = String(roundLabel).match(/\d+/);
    suffix = labelNumber ? labelNumber[0] : roundLabel;
  }

  return `${DEFAULT_SUBTITLE} - ${roundTerm} ${suffix}`;
}

function populateSportSelect() {
  sportSelect.innerHTML = SPORTS
    .map((sport) => `<option value="${sport.id}">${escapeHtml(sport.label)}</option>`)
    .join("");
}

function populateCompetitionSelect(sportId = state.currentSportId) {
  const competitions = getCompetitionsForSport(sportId);
  competitionSelect.innerHTML = competitions
    .map((competition) => `<option value="${competition.id}">${escapeHtml(competition.label)}</option>`)
    .join("");
}

function populateRoundSelect(calendarData) {
  const roundIds = getRoundIds(calendarData);

  roundSelect.innerHTML = roundIds
    .map((roundId) => {
      const label = getRoundLabel(calendarData, roundId);
      return `<option value="${escapeHtml(roundId)}">${escapeHtml(label)}</option>`;
    })
    .join("");
}

function getCacheKey(competitionId, roundId) {
  return `${competitionId}::${roundId}`;
}

function saveCurrentRoundCache() {
  if (!state.currentCompetitionId || !state.currentRoundId) {
    return;
  }

  const key = getCacheKey(state.currentCompetitionId, state.currentRoundId);
  state.roundCache[key] = cloneRows(state.rows);
}

function loadRound(roundId, options = {}) {
  const forceFresh = options.forceFresh || false;
  const keepSubtitle = options.keepSubtitle || false;
  const competitionConfig = getCompetitionConfig();

  const calendarData = getCalendarData();
  const roundIds = getRoundIds(calendarData);
  if (!roundIds.length) {
    state.currentRoundId = "";
    state.rows = [];
    renderEditor();
    renderPreview();
    return;
  }

  const requestedRound = String(roundId || roundIds[0]);
  const selectedRound = roundIds.includes(requestedRound) ? requestedRound : roundIds[0];

  state.currentRoundId = selectedRound;
  roundSelect.value = selectedRound;

  const cacheKey = getCacheKey(state.currentCompetitionId, selectedRound);
  if (!forceFresh && state.roundCache[cacheKey]) {
    state.rows = cloneRows(state.roundCache[cacheKey]);
  } else {
    state.rows = getRoundRows(calendarData, selectedRound);
  }

  state.rows = normalizeRowsForCompetition(state.rows, competitionConfig.id);

  if (!keepSubtitle) {
    matchdayInput.value = buildDefaultSubtitle(calendarData, selectedRound);
  }

  renderEditor();
  renderPreview();
  saveCurrentRoundCache();
}

function loadSport(sportId, options = {}) {
  const selectedSport = SPORTS.some((item) => item.id === sportId) ? sportId : SPORTS[0].id;
  const sportCompetitions = getCompetitionsForSport(selectedSport);

  state.currentSportId = selectedSport;
  sportSelect.value = selectedSport;
  populateCompetitionSelect(selectedSport);

  if (!sportCompetitions.length) {
    state.currentCompetitionId = "";
    state.currentRoundId = "";
    state.rows = [];
    competitionSelect.innerHTML = "";
    roundSelect.innerHTML = "";
    calendarTagInput.value = "";
    if (customTitleWrap) {
      customTitleWrap.hidden = true;
    }
    matchdayInput.value = DEFAULT_SUBTITLE;
    renderEditor();
    renderPreview();
    return;
  }

  const targetCompetitionId = options.competitionId && sportCompetitions.some((item) => item.id === options.competitionId)
    ? options.competitionId
    : sportCompetitions[0].id;

  loadCompetition(targetCompetitionId, {
    forceFresh: options.forceFresh || false,
    roundId: options.roundId
  });
}

function loadCompetition(competitionId, options = {}) {
  const config = getCompetitionConfig(competitionId);
  if (config.sportId !== state.currentSportId) {
    state.currentSportId = config.sportId;
    sportSelect.value = config.sportId;
    populateCompetitionSelect(config.sportId);
  }

  state.currentCompetitionId = config.id;
  competitionSelect.value = config.id;

  if (config.colors) {
    primaryColorInput.value = config.colors.primary;
    secondaryColorInput.value = config.colors.secondary;
  }

  updateCustomTitleUi(config.id);
  updateThreeByThreeUi(config.id);

  const calendarData = getCalendarData(config.id);
  if (!calendarData) {
    calendarTagInput.value = config.label;
    roundSelect.innerHTML = "";
    state.currentRoundId = "";
    state.rows = [];
    matchdayInput.value = DEFAULT_SUBTITLE;
    renderEditor();
    renderPreview();
    return;
  }

  if (isPersonalCompetition(config.id)) {
    calendarTagInput.value = customLeagueTitleInput.value.trim() || "PERSONALE";
  } else {
    calendarTagInput.value = `${calendarData.league || config.label} ${calendarData.season || ""}`.trim();
  }

  populateRoundSelect(calendarData);

  const roundIds = getRoundIds(calendarData);
  const targetRound = options.roundId ? String(options.roundId) : roundIds[0];
  loadRound(targetRound, { forceFresh: options.forceFresh || false, keepSubtitle: false });
}

function rowEditorTemplate(row, index) {
  return `
    <article class="row-editor" data-id="${row.id}">
      <div class="row-top">
        <span class="row-index">Partita ${index + 1}</span>
        <button type="button" class="remove" data-action="remove">Elimina</button>
      </div>
      <div class="row-grid main">
        <label>
          Data
          <input data-field="date" type="text" value="${escapeHtml(row.date)}">
        </label>
        <label>
          Ora
          <input data-field="time" type="text" value="${escapeHtml(row.time)}">
        </label>
        <label>
          Squadra Casa
          <input data-field="homeTeam" type="text" value="${escapeHtml(row.homeTeam)}">
        </label>
        <label>
          Squadra Ospite
          <input data-field="awayTeam" type="text" value="${escapeHtml(row.awayTeam)}">
        </label>
      </div>
      <div class="row-grid meta">
        <label>
          Pronostico
          <input data-field="pick" type="text" value="${escapeHtml(row.pick)}">
        </label>
      </div>
    </article>
  `;
}

function renderEditor() {
  rowsEditor.innerHTML = state.rows.map((row, index) => rowEditorTemplate(row, index)).join("");
  const rowLimit = getRowLimit();
  const rowFixed = isRowLimitFixed();

  if (addRowButton) {
    if (rowFixed) {
      addRowButton.hidden = true;
      addRowButton.disabled = true;
    } else if (rowLimit && state.rows.length >= rowLimit) {
      addRowButton.hidden = false;
      addRowButton.disabled = true;
    } else {
      addRowButton.hidden = false;
      addRowButton.disabled = false;
    }
  }

  const cards = rowsEditor.querySelectorAll(".row-editor");
  cards.forEach((card) => {
    const id = card.dataset.id;
    const row = state.rows.find((item) => item.id === id);
    if (!row) {
      return;
    }

    card.querySelectorAll("input[data-field]").forEach((input) => {
      input.addEventListener("input", (event) => {
        const field = event.target.dataset.field;
        row[field] = event.target.value;
        renderPreview();
        saveCurrentRoundCache();
      });
    });

    const removeButton = card.querySelector("button[data-action='remove']");
    if (removeButton) {
      if (rowFixed) {
        removeButton.hidden = true;
      }

      removeButton.addEventListener("click", () => {
        state.rows = state.rows.filter((item) => item.id !== id);
        state.rows = normalizeRowsForCompetition(state.rows);
        renderEditor();
        renderPreview();
        saveCurrentRoundCache();
      });
    }
  });
}

function matchRowTemplate(row) {
  const pickText = escapeHtml((row.pick || "-").toUpperCase());

  return `
    <div class="match-row">
      <div class="block date">${escapeHtml(row.date)}</div>
      <div class="block time">${escapeHtml(row.time)}</div>
      <div class="block team team-home">
        <span class="team-name">${escapeHtml(row.homeTeam)}</span>
      </div>
      <div class="block vs">VS</div>
      <div class="block team team-away">
        <span class="team-name">${escapeHtml(row.awayTeam)}</span>
      </div>
      <div class="block pick">${pickText}</div>
    </div>
  `;
}

function matchRowTemplateThreeByThree(row, index) {
  const pickText = escapeHtml((row.pick || "-").toUpperCase());

  return `
    <div class="match-card">
      <div class="match-card__meta">
        <span class="match-card__tag">Match ${index + 1}</span>
        <span class="match-card__date">${escapeHtml(row.date)}</span>
        <span class="match-card__time">${escapeHtml(row.time)}</span>
      </div>
      <div class="match-card__teams">
        <div class="match-card__team">${escapeHtml(row.homeTeam)}</div>
        <div class="match-card__vs">VS</div>
        <div class="match-card__team">${escapeHtml(row.awayTeam)}</div>
      </div>
      <div class="match-card__pick">${pickText}</div>
    </div>
  `;
}

function renderPreview() {
  const calendarData = getCalendarData();
  const competitionConfig = getCompetitionConfig();
  const competitionLabel = competitionConfig.label;
  const variant = getCompetitionVariant(competitionConfig.id);
  const leagueTitle = isPersonalCompetition(competitionConfig.id)
    ? (customLeagueTitleInput?.value.trim() || "PERSONALE")
    : (calendarData?.league || competitionLabel);

  previewLeague.textContent = leagueTitle.toUpperCase();
  setPreviewLogo(competitionConfig.id, leagueTitle);
  graphic.classList.toggle("graphic--three-by-three", variant === "three-by-three");

  if (!matchdayInput.value.trim() && state.currentRoundId) {
    previewMatchday.textContent = buildDefaultSubtitle(calendarData, state.currentRoundId);
  } else {
    previewMatchday.textContent = matchdayInput.value || DEFAULT_SUBTITLE;
  }

  graphic.style.setProperty("--primary", primaryColorInput.value);
  graphic.style.setProperty("--secondary", secondaryColorInput.value);

  if (variant === "three-by-three") {
    const accentColor = accentColorInput?.value || competitionConfig.colors?.accent || "#f06a1b";
    const cardColor = cardColorInput?.value || competitionConfig.colors?.card || "#0e1116";
    const normalizedAccent = normalizeHexColor(accentColor, "#f06a1b");
    const normalizedCard = normalizeHexColor(cardColor, "#0e1116");

    graphic.style.setProperty("--three-accent", normalizedAccent);
    graphic.style.setProperty("--three-accent-soft", hexToRgba(normalizedAccent, 0.35));
    graphic.style.setProperty("--three-accent-ink", getReadableTextColor(normalizedAccent));
    graphic.style.setProperty("--three-card", hexToRgba(normalizedCard, 0.35));
  }

  if (!state.rows.length) {
    matchesList.innerHTML = `
      <div class="block" style="min-height: 76px; font-size: 1rem; font-weight: 700;">
        Nessuna partita inserita
      </div>
    `;
    updatePreviewScale();
    return;
  }

  const rowTemplate = variant === "three-by-three" ? matchRowTemplateThreeByThree : matchRowTemplate;
  matchesList.innerHTML = state.rows.map((row, index) => rowTemplate(row, index)).join("");
  updatePreviewScale();
}

function updatePreviewScale() {
  if (!previewWrap || !graphicScaleBox || !graphic) {
    return;
  }

  const availableWidth = Math.max(280, previewWrap.clientWidth - 8);
  const scale = Math.min(1, availableWidth / GRAPHIC_BASE_WIDTH);
  const baseHeight = Math.max(680, graphic.scrollHeight || 680);

  graphic.style.transform = `scale(${scale})`;
  graphicScaleBox.style.width = `${GRAPHIC_BASE_WIDTH * scale}px`;
  graphicScaleBox.style.height = `${baseHeight * scale}px`;
}

async function downloadPng() {
  const button = document.getElementById("downloadPng");
  const exportHost = document.createElement("div");
  let exportNode = null;

  try {
    button.disabled = true;
    button.textContent = "Creazione PNG...";

    exportHost.style.position = "fixed";
    exportHost.style.left = "-99999px";
    exportHost.style.top = "0";
    exportHost.style.zIndex = "-1";
    exportHost.style.pointerEvents = "none";
    document.body.appendChild(exportHost);

    exportNode = graphic.cloneNode(true);
    exportNode.style.transform = "none";
    exportNode.style.width = `${GRAPHIC_BASE_WIDTH}px`;
    exportNode.style.minHeight = "680px";
    exportHost.appendChild(exportNode);

    const canvas = await html2canvas(exportNode, {
      scale: 2,
      useCORS: true,
      backgroundColor: null
    });

    const imageUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `grafica-tipster-${Date.now()}.png`;
    link.click();
  } catch (error) {
    console.error(error);
    alert("Errore durante l'esportazione PNG. Riprova.");
  } finally {
    if (exportNode && exportNode.parentNode) {
      exportNode.parentNode.removeChild(exportNode);
    }
    if (exportHost.parentNode) {
      exportHost.parentNode.removeChild(exportHost);
    }
    button.disabled = false;
    button.textContent = "Scarica PNG";
  }
}

function boot() {
  populateSportSelect();
  matchdayInput.value = DEFAULT_SUBTITLE;

  if (previewCompetitionLogo) {
    previewCompetitionLogo.addEventListener("load", () => {
      previewCompetitionLogoWrap?.classList.add("has-logo");
    });

    previewCompetitionLogo.addEventListener("error", () => {
      previewCompetitionLogoWrap?.classList.remove("has-logo");
      previewCompetitionLogo.removeAttribute("src");
      previewCompetitionLogo.removeAttribute("alt");
    });
  }

  loadSport(SPORTS[0].id, { forceFresh: true });

  sportSelect.addEventListener("change", () => {
    loadSport(sportSelect.value, { forceFresh: false });
  });

  competitionSelect.addEventListener("change", () => {
    loadCompetition(competitionSelect.value, { forceFresh: false });
  });

  roundSelect.addEventListener("change", () => {
    loadRound(roundSelect.value, { keepSubtitle: false });
  });

  [matchdayInput, primaryColorInput, secondaryColorInput, accentColorInput, cardColorInput]
    .filter(Boolean)
    .forEach((input) => {
      input.addEventListener("input", renderPreview);
    });

  if (customLeagueTitleInput) {
    customLeagueTitleInput.addEventListener("input", () => {
      if (!isPersonalCompetition()) {
        return;
      }

      calendarTagInput.value = customLeagueTitleInput.value.trim() || "PERSONALE";
      renderPreview();
    });
  }

  addRowButton.addEventListener("click", () => {
    state.rows.push(createRow());
    state.rows = normalizeRowsForCompetition(state.rows);
    renderEditor();
    renderPreview();
    saveCurrentRoundCache();
  });

  document.getElementById("downloadPng").addEventListener("click", downloadPng);
  window.addEventListener("resize", updatePreviewScale);
}

boot();
