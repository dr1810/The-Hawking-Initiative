import os
from google.adk.agents import Agent
from google.adk.models.google_llm import Gemini
from google.adk.runners import InMemoryRunner
from dotenv import load_dotenv
from google.adk.tools import google_search
from google.genai import types
import asyncio

load_dotenv()

api_key = os.environ.get("GOOGLE_API_KEY")

retry_config = types.HttpRetryOptions(
    attempts=5,
    initial_delay=1,
    exp_base=7,
    http_status_codes=[429, 500, 503, 504]
)

task_agent = Agent(
    name = "task_agent",
    model=Gemini(
        model='gemini-2.5-flash-lite',
        retry_options=retry_config

    ),
    description='An Agent used to plan tasks',
    instruction="You are a helpful assistant who will help plan tasks, use Google Search to gather the latest information and research",
    tools=[google_search]
)

runner = InMemoryRunner(agent=task_agent)
async def main():
    response = await runner.run_debug(
        "Help me plan a formation to beat France"
    )
    print(response)

if __name__ == "__main__":
    asyncio.run(main())