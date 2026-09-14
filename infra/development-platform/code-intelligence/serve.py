"""Compose the official Serena MCP factory with explicit transport security."""

import logging

from mcp.server.transport_security import TransportSecuritySettings
from serena.mcp import SerenaMCPFactory


def main():
    logging.basicConfig(level=logging.INFO)
    server = SerenaMCPFactory(
        transport="streamable-http",
        context="/opt/serena/readonly-context.yml",
        project="/workspace",
    ).create_mcp_server(
        host="0.0.0.0",
        port=3132,
        enable_web_dashboard=False,
        open_web_dashboard=False,
        enable_gui_log_window=False,
    )
    # FastMCP's constructor supplies transport_security=None to Settings, which
    # overrides the environment setting. Configure the actual server instance.
    server.settings.transport_security = TransportSecuritySettings(
        enable_dns_rebinding_protection=True,
        allowed_hosts=["127.0.0.1:*", "localhost:*"],
        allowed_origins=["http://127.0.0.1:*", "http://localhost:*"],
    )
    server.run(transport="streamable-http")


if __name__ == "__main__":
    main()
