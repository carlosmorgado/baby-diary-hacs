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
  version: "0.3.4",
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

class BabyDiaryDiaperCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  setConfig(config) {
    this._config = {
      service: "baby_diary.log_diaper_change",
      ...config
    };

    if (this._hass) {
      this._render();
    }
  }

  set hass(hass) {
    this._hass = hass;

    if (!this._config) {
      return;
    }

    const signature = this._getRenderSignature();

    if (signature !== this._lastRenderSignature) {
      this._lastRenderSignature = signature;
      this._render();
    }
  }

  getCardSize() {
    return 4;
  }

  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: 6,
      min_rows: 4
    };
  }

  _render() {
    const resolved = this._resolveDiaperEntities();

    if (resolved.missing.length > 0) {
      this._renderMissingEntitiesCard(resolved);
      return;
    }

    const babyName = this._config.baby || this._inferBabyName(resolved.entities);
    const stats = [
      this._stat("diapers", "Fraldas", "baby:diaper", "diaper", resolved.entities.diapers),
      this._stat("xixi", "Xixi", "baby:xixi", "xixi", resolved.entities.xixi),
      this._stat("coco", "Cocó", "baby:coco", "coco", resolved.entities.coco)
    ];

    this.shadowRoot.innerHTML = `
      ${this._styles()}
      <ha-card>
        <div class="card">
          <div class="header">
            <div>
              <div class="title">Fraldas</div>
              ${babyName ? `<div class="subtitle">${this._escape(babyName)}</div>` : ""}
            </div>
          </div>
          <div class="stats">
            ${stats.map((stat) => this._statTemplate(stat)).join("")}
          </div>
          <div class="actions">
            ${this._buttonTemplate("xixi", "Xixi", "baby:xixi")}
            ${this._buttonTemplate("coco", "Cocó", "baby:coco")}
            ${this._buttonTemplate("ambos", "Ambos", "baby:ambos")}
          </div>
        </div>
      </ha-card>
    `;

    this._wireButtons();
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

  _renderMissingEntitiesCard(resolved) {
    const configuredBaby = this._config.baby
      ? `O cartão está configurado para ${this._config.baby}.`
      : "O cartão tenta detectar automaticamente quando só existe um bebé.";
    const missing = resolved.missing
      .map((item) => `<li>${this._escape(item.label)}${item.entityId ? `: <code>${this._escape(item.entityId)}</code>` : ""}</li>`)
      .join("");

    this.shadowRoot.innerHTML = `
      ${this._styles()}
      <ha-card>
        <div class="card missing">
          <div class="title">Baby Diary</div>
          <p>Não encontrei os sensores diários das fraldas.</p>
          <p>${this._escape(configuredBaby)}</p>
          <ul>${missing}</ul>
          <p class="hint">Confirma que existe uma entrada Baby Diary em Definições > Dispositivos e serviços e reinicia o Home Assistant depois de atualizar pelo HACS.</p>
        </div>
      </ha-card>
    `;
  }

  _getRenderSignature() {
    const resolved = this._resolveDiaperEntities();

    return JSON.stringify({
      baby: this._config?.baby || "",
      entities: resolved.entities,
      missing: resolved.missing.map((item) => item.metric),
      states: Object.values(resolved.entities).map((entityId) => this._state(entityId))
    });
  }

  _stat(metric, label, icon, variant, entityId) {
    return {
      metric,
      label,
      icon,
      variant,
      entityId,
      value: this._state(entityId)
    };
  }

  _statTemplate(stat) {
    return `
      <div class="stat ${stat.variant}">
        <div class="stat-label">
          <ha-icon icon="${stat.icon}"></ha-icon>
          <span>${this._escape(stat.label)}</span>
        </div>
        <div class="stat-value">${this._escape(stat.value)}</div>
      </div>
    `;
  }

  _buttonTemplate(type, label, icon) {
    return `
      <button class="action ${type}" type="button" data-type="${type}">
        <ha-icon icon="${icon}"></ha-icon>
        <span>${this._escape(label)}</span>
      </button>
    `;
  }

  _wireButtons() {
    for (const button of this.shadowRoot.querySelectorAll("button[data-type]")) {
      button.addEventListener("click", () => this._logDiaper(button.dataset.type));
    }
  }

  async _logDiaper(type) {
    if (!this._hass) {
      return;
    }

    const service = this._config.service || "baby_diary.log_diaper_change";
    const [domain, serviceName] = service.split(".");
    const data = { type };

    if (this._config.baby) {
      data.baby_name = this._config.baby;
    }

    if (this._config.entry_id) {
      data.entry_id = this._config.entry_id;
    }

    await this._hass.callService(domain, serviceName, data);
  }

  _state(entityId) {
    const state = this._hass?.states?.[entityId]?.state;

    return state ?? "0";
  }

  _inferBabyName(entities) {
    const names = Object.values(entities)
      .map((entityId) => this._hass?.states?.[entityId]?.attributes?.friendly_name)
      .filter(Boolean);
    const name = names[0] || "";
    const match = name.match(/(?:Fraldas|Xixis|Cocos)\s+(.+?)\s+Counter/i);

    return match?.[1];
  }

  _escape(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  _styles() {
    return `
      <style>
        ha-card {
          overflow: hidden;
        }

        .card {
          padding: 16px;
        }

        .header {
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .title {
          color: var(--primary-text-color);
          font-size: 18px;
          font-weight: 700;
          line-height: 1.2;
        }

        .subtitle,
        .hint {
          color: var(--secondary-text-color);
          font-size: 13px;
          line-height: 1.4;
          margin-top: 4px;
        }

        .stats,
        .actions {
          display: grid;
          gap: 10px;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .stats {
          margin-bottom: 12px;
        }

        .stat {
          border: 1px solid var(--divider-color);
          border-radius: 12px;
          box-sizing: border-box;
          min-width: 0;
          padding: 12px;
        }

        .stat.diaper {
          background: color-mix(in srgb, ${COLORS.diaper} 14%, transparent);
        }

        .stat.xixi {
          background: color-mix(in srgb, ${COLORS.xixi} 18%, transparent);
          border-color: color-mix(in srgb, ${COLORS.xixi} 45%, var(--divider-color));
        }

        .stat.coco {
          background: color-mix(in srgb, ${COLORS.coco} 22%, transparent);
          border-color: color-mix(in srgb, ${COLORS.coco} 45%, var(--divider-color));
        }

        .stat-label {
          align-items: center;
          color: var(--secondary-text-color);
          display: flex;
          font-size: 13px;
          font-weight: 700;
          gap: 6px;
          min-width: 0;
          white-space: nowrap;
        }

        .stat-label ha-icon {
          --mdc-icon-size: 18px;
          flex: 0 0 auto;
        }

        .stat-value {
          color: var(--primary-text-color);
          font-size: 28px;
          font-weight: 800;
          line-height: 1;
          margin-top: 10px;
        }

        .action {
          align-items: center;
          appearance: none;
          background: var(--secondary-background-color);
          border: 1px solid var(--divider-color);
          border-radius: 12px;
          box-sizing: border-box;
          color: var(--primary-text-color);
          cursor: pointer;
          display: flex;
          font: inherit;
          font-size: 14px;
          font-weight: 800;
          gap: 8px;
          justify-content: center;
          min-height: 56px;
          min-width: 0;
          padding: 10px 8px;
          width: 100%;
        }

        .action ha-icon {
          --mdc-icon-size: 20px;
          flex: 0 0 auto;
        }

        .action span {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .action.xixi {
          border-color: ${COLORS.xixi};
          color: ${COLORS.xixi};
        }

        .action.coco {
          border-color: ${COLORS.coco};
          color: ${COLORS.coco};
        }

        .action.ambos {
          border-color: ${COLORS.ambos};
          color: ${COLORS.ambos};
        }

        .action:active {
          transform: translateY(1px);
        }

        .missing p {
          color: var(--primary-text-color);
          margin: 10px 0;
        }

        .missing ul {
          margin: 10px 0;
          padding-left: 18px;
        }

        .missing code {
          background: var(--secondary-background-color);
          border-radius: 4px;
          padding: 1px 4px;
        }

        @media (max-width: 360px) {
          .card {
            padding: 12px;
          }

          .stats {
            grid-template-columns: 1fr;
          }

          .actions {
            gap: 8px;
          }

          .action {
            font-size: 13px;
            min-height: 52px;
          }
        }
      </style>
    `;
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

if (!customElements.get("baby-diary-diaper-card")) {
  customElements.define("baby-diary-diaper-card", BabyDiaryDiaperCard);
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

