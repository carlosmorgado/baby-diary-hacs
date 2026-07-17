const COLORS = Object.freeze({
  app: "#F8FAFC",
  diaper: "#CBD5E1",
  xixi: "#FACC15",
  pee: "#FACC15",
  coco: "#92400E",
  poo: "#92400E",
  ambos: "#A855F7",
  both: "#A855F7",
  mamada: "#F9A8D4",
  feeding: "#F9A8D4",
  mint: "#6EE7B7"
});

const ICONS = Object.freeze({
  app: {
    viewBox: "0 0 24 24",
    path: "M4 3h8c2.2 0 4 1.8 4 4v14H8c-2.2 0-4-1.8-4-4V3zm2 2v12c0 1.1.9 2 2 2h6V7c0-1.1-.9-2-2-2H6zm12-2h2v18h-2V3zM8 8h4v2H8V8zm0 4h4v2H8v-2zm0 4h4v2H8v-2z"
  },
  diaper: {
    viewBox: "0 0 24 24",
    path: "M4 3h16v7c0 6.1-3.5 11-8 11s-8-4.9-8-11V3zm2 2v4.8C6 14.6 8.5 19 12 19s6-4.4 6-9.2V5h-2.1C14.9 7.3 13.5 8.5 12 8.5S9.1 7.3 8.1 5H6zm3.8 0c.6 1 1.3 1.5 2.2 1.5s1.6-.5 2.2-1.5H9.8zM8 14h2v2H8v-2zm6 0h2v2h-2v-2z"
  },
  xixi: {
    viewBox: "0 0 24 24",
    path: "M12 2C8.7 6.5 6 10.3 6 14a6 6 0 0 0 12 0c0-3.7-2.7-7.5-6-12zm0 18a4 4 0 0 1-4-4c0-2.3 1.6-5.1 4-8.7 2.4 3.6 4 6.4 4 8.7a4 4 0 0 1-4 4zm-2.2-4.3h2c0 .9.6 1.5 1.5 1.5v2c-2 0-3.5-1.5-3.5-3.5z"
  },
  coco: {
    viewBox: "0 0 24 24",
    path: "M8.4 7.5c.3-2.1 2.1-3.7 4.3-3.7h.8l-.6 2.2h.8c2.3 0 4.1 1.8 4.1 4.1 0 .7-.2 1.4-.5 2 2.1.5 3.7 2.1 3.7 4 0 2.5-2.8 4.4-6.4 4.4H7.7C4.5 20.5 2 18.8 2 16.4c0-1.8 1.5-3.3 3.4-3.8.1-2.4 1.1-4.3 3-5.1zm1.9 1.5-.7.2c-1.4.5-2.2 1.8-2.2 3.8v1.4l-1.4.2c-1.2.2-2 .9-2 1.8 0 1.1 1.5 2.1 3.7 2.1h6.9c2.5 0 4.4-1.1 4.4-2.4 0-1.1-1.5-2.1-3.4-2.3l-1.8-.2 1.1-1.5c.5-.7.8-1.4.8-2 0-1.2-.9-2.1-2.1-2.1h-3.3l.8-2.2c-.5.4-.8 1.1-.8 1.9V9z"
  },
  ambos: {
    viewBox: "0 0 24 24",
    path: "M9 2c-2.4 3.3-4 5.8-4 8.2C5 13.1 6.8 15 9 15s4-1.9 4-4.8C13 7.8 11.4 5.3 9 2zm0 10.8c-1.1 0-2-.9-2-2.6 0-1.1.7-2.6 2-4.6 1.3 2 2 3.5 2 4.6 0 1.7-.9 2.6-2 2.6zm6.7 7.2H9.5c-1.7 0-3-1.1-3-2.5 0-1.1.8-2.1 2-2.4.1-1.7 1.5-3.1 3.3-3.1.8-1.4 2.7-2.1 4.2-1.3 1.4.8 2 2.5 1.4 3.9 1.7.4 3.1 1.6 3.1 3.1 0 1.3-1.6 2.3-3.8 2.3zm-6.8-2h7c1.3 0 2.3-.4 2.3-.9 0-.6-1-1.1-2.3-1.1h-1.5l.8-1.2c.5-.8.3-1.7-.4-2.1-.8-.5-1.8-.1-2.1.8l-.3.8h-1c-1 0-1.8.8-1.8 1.7v.8l-.8.2c-.8.1-1.3.5-1.3 1s.6.8 1.4.8z"
  },
  mamada: {
    viewBox: "0 0 24 24",
    path: "M8 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM7.2 9.2c1.6 3.1 3.9 4.4 7.1 4.8l-.2 2c-2.8-.3-5.2-1.4-7-3.4C5.8 14.5 5 17 5 20H3c0-4.9 1.6-8.4 4.2-10.8zm8.3 2.3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-.5 5.2c2.3-.2 4-.8 5.3-1.8l1.2 1.6c-1.6 1.2-3.6 1.9-6 2.1-2.1.2-3.9 1-5.2 2.4H7.8c1.7-2.4 4.2-3.9 7.2-4.3z"
  }
});

const ALIASES = Object.freeze({
  "baby-diary": "app",
  diary: "app",
  fralda: "diaper",
  pee: "xixi",
  poo: "coco",
  both: "ambos",
  feeding: "mamada"
});

const getIcon = async (name) => {
  const normalized = String(name || "").toLowerCase();
  const iconName = ALIASES[normalized] || normalized;
  return ICONS[iconName];
};

window.customIconsets = window.customIconsets || {};
window.customIconsets.baby = getIcon;

window.babyDiaryHacs = Object.freeze({
  version: "0.4.0",
  iconPrefix: "baby",
  colors: COLORS,
  icons: Object.freeze(Object.keys(ICONS))
});

const slugify = (value) =>
  String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const diaperEntitiesForBaby = (baby) => {
  const slug = slugify(baby || "");

  if (!slug) {
    return {};
  }

  return {
    diapers: `sensor.daily_fraldas_${slug}_counter`,
    xixi: `sensor.daily_xixis_${slug}_counter`,
    coco: `sensor.daily_cocos_${slug}_counter`
  };
};

const feedingEntitiesForBaby = (baby) => {
  const slug = slugify(baby || "");

  if (!slug) {
    return {};
  }

  return {
    feedings: `sensor.daily_mamadas_${slug}_counter`,
    currentDuration: `sensor.current_mamada_${slug}_duration`
  };
};

const DAILY_SENSOR_MATCHERS = Object.freeze({
  diapers: {
    label: "Fraldas",
    icon: "baby:diaper",
    tokens: ["fraldas", "diapers"]
  },
  xixi: {
    label: "Xixi",
    icon: "baby:xixi",
    tokens: ["xixis", "xixi"]
  },
  coco: {
    label: "Coco",
    icon: "baby:coco",
    tokens: ["cocos", "coco"]
  }
});

const FEEDING_SENSOR_MATCHERS = Object.freeze({
  feedings: {
    label: "Mamadas",
    tokens: ["mamadas", "mamada", "feedings", "feeding"],
    requiredTokens: ["daily", "counter"]
  },
  currentDuration: {
    label: "Duração da mamada",
    tokens: ["mamada", "feeding"],
    requiredTokens: ["current", "duration"]
  }
});

const entityExists = (hass, entityId) => Boolean(entityId && hass?.states?.[entityId]);

const stateMatchesDailySensor = (entityId, state, matcher) => {
  const friendlyName = slugify(state?.attributes?.friendly_name || "");
  const normalizedEntityId = slugify(entityId);
  const hasDaily = friendlyName.includes("daily") || normalizedEntityId.includes("daily");
  const hasMetric = matcher.tokens.some(
    (token) => friendlyName.includes(token) || normalizedEntityId.includes(token)
  );

  return (
    entityId.startsWith("sensor.") &&
    hasDaily &&
    hasMetric
  );
};

const findDailyEntity = (hass, metric, baby) => {
  const matcher = DAILY_SENSOR_MATCHERS[metric];
  const babySlug = slugify(baby || "");

  if (!hass?.states || !matcher) {
    return undefined;
  }

  const candidates = Object.entries(hass.states)
    .filter(([entityId, state]) => stateMatchesDailySensor(entityId, state, matcher))
    .map(([entityId, state]) => ({
      entityId,
      searchText: `${slugify(entityId)} ${slugify(state.attributes?.friendly_name || "")}`
    }));

  const babyCandidates = babySlug
    ? candidates.filter((candidate) => candidate.searchText.includes(babySlug))
    : candidates;
  const matches = babyCandidates.length > 0 ? babyCandidates : candidates;

  if (matches.length === 1) {
    return matches[0].entityId;
  }

  if (babySlug && matches.length > 1) {
    return matches
      .map((candidate) => ({
        ...candidate,
        score:
          (candidate.searchText.includes(`baby_diary_${babySlug}`) ? 4 : 0) +
          (candidate.searchText.includes(`daily_${matcher.tokens[0]}_${babySlug}`) ? 3 : 0) +
          (candidate.searchText.includes(`${babySlug}_daily`) ? 2 : 0) +
          (candidate.searchText.includes(babySlug) ? 1 : 0)
      }))
      .sort((left, right) => right.score - left.score)[0]?.entityId;
  }

  return undefined;
};

const stateMatchesFeedingSensor = (entityId, state, matcher) => {
  const friendlyName = slugify(state?.attributes?.friendly_name || "");
  const normalizedEntityId = slugify(entityId);
  const searchText = `${normalizedEntityId} ${friendlyName}`;
  const hasAnyMetricToken = matcher.tokens.some((token) => searchText.includes(token));
  const hasRequiredTokens = matcher.requiredTokens.every((token) =>
    searchText.includes(token)
  );

  return entityId.startsWith("sensor.") && hasAnyMetricToken && hasRequiredTokens;
};

const findFeedingEntity = (hass, metric, baby) => {
  const matcher = FEEDING_SENSOR_MATCHERS[metric];
  const babySlug = slugify(baby || "");

  if (!hass?.states || !matcher) {
    return undefined;
  }

  const candidates = Object.entries(hass.states)
    .filter(([entityId, state]) => stateMatchesFeedingSensor(entityId, state, matcher))
    .map(([entityId, state]) => ({
      entityId,
      searchText: `${slugify(entityId)} ${slugify(state.attributes?.friendly_name || "")}`
    }));

  const babyCandidates = babySlug
    ? candidates.filter((candidate) => candidate.searchText.includes(babySlug))
    : candidates;
  const matches = babyCandidates.length > 0 ? babyCandidates : candidates;

  if (matches.length === 1) {
    return matches[0].entityId;
  }

  if (babySlug && matches.length > 1) {
    return matches
      .map((candidate) => ({
        ...candidate,
        score:
          (candidate.searchText.includes(`baby_diary_${babySlug}`) ? 4 : 0) +
          (candidate.searchText.includes(`${babySlug}_${metric}`) ? 3 : 0) +
          (candidate.searchText.includes(babySlug) ? 1 : 0)
      }))
      .sort((left, right) => right.score - left.score)[0]?.entityId;
  }

  return undefined;
};

const numberValue = (state) => {
  const parsed = Number(state?.state);
  return Number.isFinite(parsed) ? parsed : 0;
};

const hassLocale = (hass) =>
  hass?.locale?.language || hass?.selectedLanguage || navigator.language || "pt-PT";

const formatTime = (hass, value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(hassLocale(hass), {
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
};

const formatDuration = (minutes) => {
  const value = Math.max(0, Math.round(Number(minutes) || 0));

  if (value === 0) {
    return "0 min";
  }

  if (value === 1) {
    return "1 min";
  }

  return `${value} min`;
};

const formatFeedingCount = (count) => {
  const value = Math.max(0, Math.round(Number(count) || 0));

  if (value === 1) {
    return "1 mamada";
  }

  return `${value} mamadas`;
};

const splitService = (service) => {
  const [domain, action] = String(service || "").split(".");
  return { domain, action };
};

class BabyDiaryDiaperCard extends HTMLElement {
  setConfig(config) {
    this._config = {
      service: "baby_diary.log_diaper_change",
      ...config
    };

    this._lastRenderSignature = undefined;

    if (this._hass) {
      this._renderCard();
    }
  }

  set hass(hass) {
    this._hass = hass;

    if (!this._config) {
      return;
    }

    const signature = this._getRenderSignature();

    if (!this._card || signature !== this._lastRenderSignature) {
      this._lastRenderSignature = signature;
      this._renderCard();
      return;
    }

    if (this._card) {
      this._card.hass = hass;
    }
  }

  getCardSize() {
    if (this._card?.getCardSize) {
      return this._card.getCardSize();
    }

    return 6;
  }

  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: 7,
      min_rows: 4
    };
  }

  async _renderCard() {
    const helpers = await window.loadCardHelpers?.();

    if (!helpers) {
      throw new Error("Home Assistant card helpers are not available.");
    }

    const cardConfig = this._buildCardConfig();
    const card = helpers.createCardElement(cardConfig);

    if (this._hass) {
      card.hass = this._hass;
    }

    this.replaceChildren(card);
    this._card = card;
  }

  _buildCardConfig() {
    const resolved = this._resolveDiaperEntities();

    if (resolved.missing.length > 0) {
      return this._buildMissingEntitiesCard(resolved);
    }

    const entities = resolved.entities;
    const service = this._config.service || "baby_diary.log_diaper_change";

    return {
      type: "grid",
      columns: 1,
      square: false,
      cards: [
        {
          type: "tile",
          entity: entities.diapers,
          name: this._config.diapers_name || "Fraldas",
          icon: this._config.diapers_icon || "baby:diaper",
          color: this._config.diapers_color || "white",
          show_entity_picture: false,
          hide_state: false,
          vertical: false,
          features: [{ type: "trend-graph" }],
          features_position: "bottom"
        },
        {
          type: "grid",
          columns: 2,
          square: false,
          cards: [
            {
              type: "tile",
              entity: entities.xixi,
              name: this._config.xixi_name || "Xixis",
              icon: this._config.xixi_icon || "baby:xixi",
              color: this._config.xixi_color || "yellow",
              vertical: false,
              features: [{ type: "trend-graph" }],
              features_position: "bottom"
            },
            {
              type: "tile",
              entity: entities.coco,
              name: this._config.coco_name || "Cocós",
              icon: this._config.coco_icon || "baby:coco",
              color: this._config.coco_color || "brown",
              vertical: false,
              features: [{ type: "trend-graph" }],
              features_position: "bottom"
            }
          ]
        },
        {
          type: "grid",
          columns: 3,
          square: false,
          cards: [
            this._button("Xixi", "baby:xixi", "yellow", "xixi", service),
            this._button("Cocó", "baby:coco", "brown", "coco", service),
            this._button("Ambos", "baby:ambos", "purple", "ambos", service)
          ]
        }
      ],
      column_span: this._config.column_span || 1,
      background: this._config.background || {
        color: "primary",
        opacity: 20
      }
    };
  }

  _resolveDiaperEntities() {
    const configuredEntities = this._config.entities || {};
    const expectedEntities = diaperEntitiesForBaby(this._config.baby);
    const entities = {};
    const missing = [];

    for (const metric of Object.keys(DAILY_SENSOR_MATCHERS)) {
      const configuredEntity = configuredEntities[metric];
      const expectedEntity = expectedEntities[metric];
      const discoveredEntity = findDailyEntity(this._hass, metric, this._config.baby);

      entities[metric] =
        configuredEntity ||
        (entityExists(this._hass, expectedEntity) ? expectedEntity : discoveredEntity) ||
        expectedEntity;

      if (!entityExists(this._hass, entities[metric])) {
        missing.push({
          metric,
          label: DAILY_SENSOR_MATCHERS[metric].label,
          entityId: entities[metric]
        });
      }
    }

    return { entities, missing };
  }

  _buildMissingEntitiesCard(resolved) {
    const configuredBaby = this._config.baby
      ? `The card is configured for \`${this._config.baby}\`.`
      : "The card will auto-detect entities when exactly one Baby Diary baby exists.";
    const missing = resolved.missing
      .map((item) => `- ${item.label}${item.entityId ? `: \`${item.entityId}\`` : ""}`)
      .join("\n");

    return {
      type: "markdown",
      content: [
        "### Baby Diary",
        "",
        "Daily diaper entities were not found yet.",
        "",
        configuredBaby,
        "",
        "Check that **Settings > Devices & services > Baby Diary** has a configured baby and restart Home Assistant after installing or updating from HACS.",
        "",
        "Missing:",
        missing
      ].join("\n")
    };
  }

  _getRenderSignature() {
    const resolved = this._resolveDiaperEntities();

    return JSON.stringify({
      baby: this._config?.baby || "",
      entities: resolved.entities,
      missing: resolved.missing.map((item) => item.metric)
    });
  }

  _button(name, icon, color, type, service) {
    const data = { type };

    if (this._config.baby) {
      data.baby_name = this._config.baby;
    }

    if (this._config.entry_id) {
      data.entry_id = this._config.entry_id;
    }

    return {
      show_name: true,
      show_icon: true,
      type: "button",
      name,
      icon,
      tap_action: {
        action: "perform-action",
        perform_action: service,
        data
      },
      color
    };
  }

  static getStubConfig() {
    return {
      type: "custom:baby-diary-diaper-card"
    };
  }

  static getConfigForm() {
    return {
      schema: [
        {
          name: "baby",
          required: true,
          selector: { text: {} }
        },
        {
          name: "service",
          selector: { text: {} }
        },
        {
          name: "entry_id",
          selector: { text: {} }
        }
      ]
    };
  }
}

class BabyDiaryFeedingCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  setConfig(config) {
    this._config = {
      service: "baby_diary.toggle_feeding",
      ...config
    };
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  getCardSize() {
    return 4;
  }

  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: 5,
      min_rows: 4
    };
  }

  _render() {
    if (!this._config || !this._hass) {
      return;
    }

    const resolved = this._resolveFeedingEntities();
    const content =
      resolved.missing.length > 0
        ? this._missingTemplate(resolved)
        : this._cardTemplate(resolved.entities);

    this.shadowRoot.innerHTML = `${this._styles()}${content}`;
    this.shadowRoot
      .querySelector("[data-toggle-feeding]")
      ?.addEventListener("click", () => this._toggleFeeding());
  }

  _cardTemplate(entities) {
    const dailyState = this._hass.states[entities.feedings];
    const currentState = this._hass.states[entities.currentDuration];
    const count = numberValue(dailyState);
    const totalMinutes = Number(dailyState?.attributes?.duration_minutes) || 0;
    const currentMinutes = numberValue(currentState);
    const active = currentState?.attributes?.active === true;
    const sessions = this._sessionsFromState(dailyState, currentState);
    const sessionChart = this._sessionChart(sessions);
    const buttonTitle = active ? "Parar mamada" : "Iniciar mamada";
    const buttonSubtitle = active
      ? `Em curso · ${formatDuration(currentMinutes)}`
      : "Tocar para começar";

    return `
      <ha-card>
        <div class="baby-feeding">
          <header class="header">
            <div class="title-block">
              <div class="eyebrow">
                <ha-icon icon="${this._config.icon || "baby:mamada"}"></ha-icon>
                <span>${this._config.name || "Mamadas"}</span>
              </div>
              <div class="total">${formatFeedingCount(count)}</div>
              <div class="subtitle">${formatDuration(totalMinutes)} hoje</div>
            </div>
            <div class="status ${active ? "active" : ""}">
              ${active ? "Em curso" : "Em pausa"}
            </div>
          </header>

          <section class="timeline" aria-label="Mamadas de hoje">
            ${sessionChart}
          </section>

          <button class="toggle ${active ? "active" : ""}" type="button" data-toggle-feeding>
            <ha-icon icon="${this._config.icon || "baby:mamada"}"></ha-icon>
            <span class="toggle-text">
              <strong>${buttonTitle}</strong>
              <small>${buttonSubtitle}</small>
            </span>
          </button>
        </div>
      </ha-card>
    `;
  }

  _sessionChart(sessions) {
    if (sessions.length === 0) {
      return `
        <div class="empty-chart">
          <div class="chart-line"></div>
        </div>
      `;
    }

    const maxDuration = Math.max(
      ...sessions.map((session) => session.durationMinutes),
      1
    );
    const bars = sessions
      .map((session) => {
        const left = Math.min(98, Math.max(0, (session.startMinute / 1440) * 100));
        const width = Math.max(2.8, (session.durationMinutes / 1440) * 100);
        const height = 28 + (session.durationMinutes / maxDuration) * 54;
        const label = `${formatTime(this._hass, session.startedAt)} · ${formatDuration(
          session.durationMinutes
        )}`;

        return `
          <div
            class="session ${session.active ? "active" : ""}"
            style="left:${left}%;width:${width}%;height:${height}px"
            title="${label}"
          >
            <span>${formatDuration(session.durationMinutes)}</span>
          </div>
        `;
      })
      .join("");

    return `
      <div class="chart-line"></div>
      <div class="axis-label start">00:00</div>
      <div class="axis-label end">24:00</div>
      ${bars}
    `;
  }

  _sessionsFromState(dailyState, currentState) {
    const completedSessions = Array.isArray(dailyState?.attributes?.sessions)
      ? dailyState.attributes.sessions
      : [];
    const sessions = completedSessions
      .map((session) => this._normalizeSession(session))
      .filter(Boolean);
    const active = currentState?.attributes?.active === true;
    const startedAt = currentState?.attributes?.started_at;

    if (active && startedAt) {
      const activeSession = this._normalizeSession({
        started_at: startedAt,
        ended_at: new Date().toISOString(),
        duration_minutes: Math.max(1, numberValue(currentState)),
        active: true
      });

      if (activeSession) {
        sessions.push(activeSession);
      }
    }

    return sessions;
  }

  _normalizeSession(session) {
    const startedAt = new Date(session.started_at);
    if (Number.isNaN(startedAt.getTime())) {
      return undefined;
    }

    const durationMinutes = Math.max(
      1,
      Math.round(Number(session.duration_minutes) || 0)
    );

    return {
      startedAt: startedAt.toISOString(),
      startMinute: startedAt.getHours() * 60 + startedAt.getMinutes(),
      durationMinutes,
      active: session.active === true
    };
  }

  _resolveFeedingEntities() {
    const configuredEntities = this._config.entities || {};
    const expectedEntities = feedingEntitiesForBaby(this._config.baby);
    const entities = {};
    const missing = [];

    for (const metric of Object.keys(FEEDING_SENSOR_MATCHERS)) {
      const configuredEntity = configuredEntities[metric];
      const expectedEntity = expectedEntities[metric];
      const discoveredEntity = findFeedingEntity(this._hass, metric, this._config.baby);

      entities[metric] =
        configuredEntity ||
        (entityExists(this._hass, expectedEntity) ? expectedEntity : discoveredEntity) ||
        expectedEntity;

      if (!entityExists(this._hass, entities[metric])) {
        missing.push({
          metric,
          label: FEEDING_SENSOR_MATCHERS[metric].label,
          entityId: entities[metric]
        });
      }
    }

    return { entities, missing };
  }

  _missingTemplate(resolved) {
    const missing = resolved.missing
      .map((item) => `<li>${item.label}${item.entityId ? `: <code>${item.entityId}</code>` : ""}</li>`)
      .join("");

    return `
      <ha-card>
        <div class="baby-feeding missing">
          <h3>Baby Diary</h3>
          <p>As entidades de mamadas ainda não foram encontradas.</p>
          <ul>${missing}</ul>
          <p>Reinicia o Home Assistant depois de atualizar o Baby Diary HACS.</p>
        </div>
      </ha-card>
    `;
  }

  async _toggleFeeding() {
    const { domain, action } = splitService(
      this._config.service || "baby_diary.toggle_feeding"
    );
    const data = {};

    if (!domain || !action) {
      return;
    }

    if (this._config.baby) {
      data.baby_name = this._config.baby;
    }

    if (this._config.entry_id) {
      data.entry_id = this._config.entry_id;
    }

    await this._hass.callService(domain, action, data);
  }

  _styles() {
    return `
      <style>
        :host {
          display: block;
        }

        ha-card {
          overflow: hidden;
        }

        .baby-feeding {
          color: var(--primary-text-color);
          padding: 18px;
        }

        .header {
          align-items: flex-start;
          display: flex;
          gap: 16px;
          justify-content: space-between;
        }

        .eyebrow {
          align-items: center;
          color: var(--secondary-text-color);
          display: flex;
          font-weight: 700;
          gap: 8px;
        }

        .eyebrow ha-icon {
          color: ${COLORS.mamada};
          height: 22px;
          width: 22px;
        }

        .total {
          font-size: 42px;
          font-weight: 800;
          line-height: 1;
          margin-top: 14px;
        }

        .subtitle {
          color: var(--secondary-text-color);
          font-size: 14px;
          margin-top: 6px;
        }

        .status {
          background: color-mix(in srgb, var(--secondary-background-color) 70%, transparent);
          border: 1px solid var(--divider-color);
          border-radius: 999px;
          color: var(--secondary-text-color);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.02em;
          padding: 7px 10px;
          text-transform: uppercase;
        }

        .status.active {
          background: color-mix(in srgb, ${COLORS.mamada} 18%, transparent);
          border-color: color-mix(in srgb, ${COLORS.mamada} 65%, transparent);
          color: ${COLORS.mamada};
        }

        .timeline {
          height: 128px;
          margin: 18px 0 14px;
          position: relative;
        }

        .chart-line {
          background: color-mix(in srgb, var(--secondary-text-color) 18%, transparent);
          bottom: 28px;
          height: 1px;
          left: 0;
          position: absolute;
          right: 0;
        }

        .empty-chart {
          height: 100%;
          position: relative;
        }

        .axis-label {
          bottom: 2px;
          color: var(--secondary-text-color);
          font-size: 11px;
          position: absolute;
        }

        .axis-label.end {
          right: 0;
        }

        .session {
          background: linear-gradient(
            180deg,
            color-mix(in srgb, ${COLORS.mamada} 88%, white 12%),
            color-mix(in srgb, ${COLORS.mamada} 42%, transparent)
          );
          border: 1px solid color-mix(in srgb, ${COLORS.mamada} 82%, transparent);
          border-radius: 10px 10px 4px 4px;
          bottom: 28px;
          min-width: 12px;
          position: absolute;
        }

        .session.active {
          box-shadow: 0 0 0 3px color-mix(in srgb, ${COLORS.mamada} 20%, transparent);
        }

        .session span {
          background: color-mix(
            in srgb,
            ${COLORS.mamada} 72%,
            var(--card-background-color, var(--ha-card-background, #1f1f1f))
          );
          border-radius: 999px;
          color: var(--primary-text-color);
          font-size: 11px;
          font-weight: 800;
          left: 50%;
          padding: 3px 7px;
          position: absolute;
          top: -26px;
          transform: translateX(-50%);
          white-space: nowrap;
        }

        .toggle {
          align-items: center;
          background: color-mix(
            in srgb,
            ${COLORS.mamada} 14%,
            var(--card-background-color, var(--ha-card-background, #1f1f1f))
          );
          border: 1px solid color-mix(in srgb, ${COLORS.mamada} 48%, transparent);
          border-radius: 14px;
          color: var(--primary-text-color);
          cursor: pointer;
          display: flex;
          gap: 14px;
          min-height: 76px;
          padding: 14px 16px;
          text-align: left;
          width: 100%;
        }

        .toggle.active {
          background: color-mix(
            in srgb,
            ${COLORS.mamada} 26%,
            var(--card-background-color, var(--ha-card-background, #1f1f1f))
          );
        }

        .toggle ha-icon {
          color: ${COLORS.mamada};
          height: 36px;
          width: 36px;
        }

        .toggle-text {
          display: grid;
          gap: 4px;
        }

        .toggle-text strong {
          font-size: 18px;
          line-height: 1.1;
        }

        .toggle-text small {
          color: var(--secondary-text-color);
          font-size: 13px;
        }

        .missing h3 {
          margin: 0 0 8px;
        }

        .missing p,
        .missing li {
          color: var(--secondary-text-color);
        }

        .missing code {
          color: var(--primary-text-color);
        }
      </style>
    `;
  }

  static getStubConfig() {
    return {
      type: "custom:baby-diary-feeding-card"
    };
  }

  static getConfigForm() {
    return {
      schema: [
        {
          name: "baby",
          required: true,
          selector: { text: {} }
        },
        {
          name: "service",
          selector: { text: {} }
        },
        {
          name: "entry_id",
          selector: { text: {} }
        }
      ]
    };
  }
}

if (!customElements.get("baby-diary-diaper-card")) {
  customElements.define("baby-diary-diaper-card", BabyDiaryDiaperCard);
}

if (!customElements.get("baby-diary-feeding-card")) {
  customElements.define("baby-diary-feeding-card", BabyDiaryFeedingCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "baby-diary-diaper-card")) {
  window.customCards.push({
    type: "baby-diary-diaper-card",
    name: "Baby Diary Diaper Card",
    preview: true,
    description: "Daily diaper counters and quick log buttons.",
    documentationURL: "https://github.com/carlosmorgado/baby-diary-hacs"
  });
}

if (!window.customCards.some((card) => card.type === "baby-diary-feeding-card")) {
  window.customCards.push({
    type: "baby-diary-feeding-card",
    name: "Baby Diary Feeding Card",
    preview: true,
    description: "Daily feeding timeline and one-button start/stop control.",
    documentationURL: "https://github.com/carlosmorgado/baby-diary-hacs"
  });
}
