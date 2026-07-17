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
  version: "0.1.0",
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
  const slug = slugify(baby || "goncalo");

  return {
    diapers: `sensor.daily_fraldas_${slug}_counter`,
    xixi: `sensor.daily_xixis_${slug}_counter`,
    coco: `sensor.daily_cocos_${slug}_counter`
  };
};

class BabyDiaryDiaperCard extends HTMLElement {
  setConfig(config) {
    this._config = {
      baby: "goncalo",
      service: "baby_diary.log_diaper_change",
      ...config
    };

    this._renderCard();
  }

  set hass(hass) {
    this._hass = hass;

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
      rows: 6,
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
    const entities = {
      ...diaperEntitiesForBaby(this._config.baby),
      ...(this._config.entities || {})
    };
    const service = this._config.service || "baby_diary.log_diaper_change";

    return {
      type: "grid",
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
          features_position: "bottom",
          grid_options: { columns: 12 }
        },
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
          name: this._config.coco_name || "Cocos",
          icon: this._config.coco_icon || "baby:coco",
          color: this._config.coco_color || "brown",
          vertical: false,
          features: [{ type: "trend-graph" }],
          features_position: "bottom"
        },
        {
          type: "grid",
          columns: 3,
          square: false,
          cards: [
            this._button("Xixi", "baby:xixi", "yellow", "xixi", service),
            this._button("Coco", "baby:coco", "brown", "coco", service),
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

  _button(name, icon, color, type, service) {
    const data = {
      type
    };

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
      type: "custom:baby-diary-diaper-card",
      baby: "goncalo"
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

