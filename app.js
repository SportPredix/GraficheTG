const competitionSelect = document.getElementById("competitionSelect");
const matchdayInput = document.getElementById("matchday");
const roundSelect = document.getElementById("roundSelect");
const calendarTagInput = document.getElementById("calendarTag");
const primaryColorInput = document.getElementById("primaryColor");
const secondaryColorInput = document.getElementById("secondaryColor");

const rowsEditor = document.getElementById("rowsEditor");
const matchesList = document.getElementById("matchesList");
const previewLeague = document.getElementById("previewLeague");
const previewMatchday = document.getElementById("previewMatchday");
const graphic = document.getElementById("graphic");

const COMPETITIONS = [
  {
    id: "serie-a-2025-26",
    label: "Serie A 2025/26",
    dataKey: "SERIE_A_2025_26"
  },
  {
    id: "premier-league-2025-26",
    label: "Premier League 2025/26",
    dataKey: "PREMIER_LEAGUE_2025_26"
  },
  {
    id: "la-liga-2025-26",
    label: "La Liga 2025/26",
    dataKey: "LA_LIGA_2025_26"
  },
  {
    id: "bundesliga-2025-26",
    label: "Bundesliga 2025/26",
    dataKey: "BUNDESLIGA_2025_26"
  },
  {
    id: "ligue-1-2025-26",
    label: "Ligue 1 2025/26",
    dataKey: "LIGUE_1_2025_26"
  },
  {
    id: "champions-league-2025-26",
    label: "Champions League 2025/26",
    dataKey: "CHAMPIONS_LEAGUE_2025_26"
  },
  {
    id: "europa-league-2024-25",
    label: "Europa League 2024/25",
    dataKey: "EUROPA_LEAGUE_2024_25"
  },
  {
    id: "conference-league-2024-25",
    label: "Conference League 2024/25",
    dataKey: "CONFERENCE_LEAGUE_2024_25"
  },
  {
    id: "coppa-italia-2024-25",
    label: "Coppa Italia 2024/25",
    dataKey: "COPPA_ITALIA_2024_25"
  },
  {
    id: "fa-cup-2024-25",
    label: "FA Cup 2024/25",
    dataKey: "FA_CUP_2024_25"
  },
  {
    id: "copa-del-rey-2024-25",
    label: "Copa del Rey 2024/25",
    dataKey: "COPA_DEL_REY_2024_25"
  },
  {
    id: "dfb-pokal-2024-25",
    label: "DFB Pokal 2024/25",
    dataKey: "DFB_POKAL_2024_25"
  },
  {
    id: "coupe-de-france-2024-25",
    label: "Coupe de France 2024/25",
    dataKey: "COUPE_DE_FRANCE_2024_25"
  }
];

const state = {
  rows: [],
  currentCompetitionId: COMPETITIONS[0].id,
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

function getCompetitionConfig(competitionId = state.currentCompetitionId) {
  return COMPETITIONS.find((item) => item.id === competitionId) || COMPETITIONS[0];
}

function getCalendarData(competitionId = state.currentCompetitionId) {
  const config = getCompetitionConfig(competitionId);
  return globalThis[config.dataKey] || null;
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
  return `Esiti ${getRoundLabel(calendarData, roundId)}`;
}

function populateCompetitionSelect() {
  competitionSelect.innerHTML = COMPETITIONS
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

  const calendarData = getCalendarData();
  const roundIds = getRoundIds(calendarData);
  if (!roundIds.length) {
    state.rows = [createRow()];
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

  if (!state.rows.length) {
    state.rows = [createRow()];
  }

  if (!keepSubtitle) {
    matchdayInput.value = buildDefaultSubtitle(calendarData, selectedRound);
  }

  renderEditor();
  renderPreview();
  saveCurrentRoundCache();
}

function loadCompetition(competitionId, options = {}) {
  const config = getCompetitionConfig(competitionId);
  state.currentCompetitionId = config.id;
  competitionSelect.value = config.id;

  const calendarData = getCalendarData(config.id);
  if (!calendarData) {
    calendarTagInput.value = config.label;
    roundSelect.innerHTML = "";
    state.rows = [createRow()];
    renderEditor();
    renderPreview();
    return;
  }

  calendarTagInput.value = `${calendarData.league || config.label} ${calendarData.season || ""}`.trim();
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
      removeButton.addEventListener("click", () => {
        state.rows = state.rows.filter((item) => item.id !== id);
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

function renderPreview() {
  const calendarData = getCalendarData();
  const competitionLabel = getCompetitionConfig().label;

  previewLeague.textContent = calendarData?.league || competitionLabel.toUpperCase();

  if (!matchdayInput.value.trim() && state.currentRoundId) {
    previewMatchday.textContent = buildDefaultSubtitle(calendarData, state.currentRoundId);
  } else {
    previewMatchday.textContent = matchdayInput.value || "Esiti";
  }

  graphic.style.setProperty("--primary", primaryColorInput.value);
  graphic.style.setProperty("--secondary", secondaryColorInput.value);

  if (!state.rows.length) {
    matchesList.innerHTML = `
      <div class="block" style="min-height: 76px; font-size: 1rem; font-weight: 700;">
        Nessuna partita inserita
      </div>
    `;
    return;
  }

  matchesList.innerHTML = state.rows.map(matchRowTemplate).join("");
}

async function downloadPng() {
  const button = document.getElementById("downloadPng");

  try {
    button.disabled = true;
    button.textContent = "Creazione PNG...";

    const canvas = await html2canvas(graphic, {
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
    button.disabled = false;
    button.textContent = "Scarica PNG";
  }
}

function boot() {
  populateCompetitionSelect();
  loadCompetition(COMPETITIONS[0].id, { forceFresh: true });

  competitionSelect.addEventListener("change", () => {
    loadCompetition(competitionSelect.value, { forceFresh: false });
  });

  roundSelect.addEventListener("change", () => {
    loadRound(roundSelect.value, { keepSubtitle: false });
  });

  [matchdayInput, primaryColorInput, secondaryColorInput].forEach((input) => {
    input.addEventListener("input", renderPreview);
  });

  document.getElementById("addRow").addEventListener("click", () => {
    state.rows.push(createRow());
    renderEditor();
    renderPreview();
    saveCurrentRoundCache();
  });

  document.getElementById("downloadPng").addEventListener("click", downloadPng);
}

boot();
