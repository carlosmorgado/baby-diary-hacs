"""Config flow for Baby Diary."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.util import slugify

from .const import CONF_BABY_NAME, DEFAULT_BABY_NAME, DOMAIN


class BabyDiaryConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a Baby Diary config flow."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.ConfigFlowResult:
        """Handle the initial step."""
        if user_input is not None:
            baby_name = user_input[CONF_BABY_NAME].strip()
            await self.async_set_unique_id(slugify(baby_name))
            self._abort_if_unique_id_configured()
            return self.async_create_entry(
                title=baby_name,
                data={CONF_BABY_NAME: baby_name},
            )

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required(
                        CONF_BABY_NAME, default=DEFAULT_BABY_NAME
                    ): str,
                }
            ),
        )

