"""Use the three read-only tools over the standard MCP transport."""

import argparse
import asyncio
from pathlib import PurePosixPath
import sys

from mcp import ClientSession
from mcp.client.streamable_http import streamable_http_client


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("operation", choices=["overview", "find", "references"])
    parser.add_argument("path")
    parser.add_argument("symbol", nargs="?")
    arguments = parser.parse_args()
    path = PurePosixPath(arguments.path)
    if path.is_absolute() or ".." in path.parts:
        parser.error("Use a path relative to the source snapshot")
    if arguments.operation != "overview" and not arguments.symbol:
        parser.error("The find and references operations require a symbol name")
    params = {"relative_path": str(path), "max_answer_chars": 20000}
    if arguments.operation == "overview":
        tool = "get_symbols_overview"
        params["depth"] = 1
    elif arguments.operation == "find":
        tool = "find_symbol"
        params.update({"name_path_pattern": arguments.symbol, "include_body": False})
    else:
        tool = "find_referencing_symbols"
        params["name_path"] = arguments.symbol
    async with streamable_http_client("http://127.0.0.1:3132/mcp") as (read_stream, write_stream, _):
        async with ClientSession(read_stream, write_stream) as session:
            await session.initialize()
            result = await session.call_tool(tool, params)
            print(result.model_dump_json(indent=2, exclude_none=True))
            if result.isError:
                sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
