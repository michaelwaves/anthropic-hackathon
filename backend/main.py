
import os
import anthropic
from dotenv import load_dotenv
from templates import SCENARIOS, NATIONALITY_PAIRS, NATIONALITIES
import random
import numpy as np
import time
import pandas as pd


load_dotenv()

API_KEY = os.getenv("ANTHROPIC_API_KEY")
client = anthropic.Anthropic(api_key=API_KEY)


def prompt(messages=[{"role": "user", "content": "Hello!"}],
           model="claude-sonnet-4-20250514"):
    message = client.messages.create(
        model=model,
        max_tokens=8192,
        temperature=0.8,
        messages=messages
    )
    return message.content[0].text


# it's an unbounded elo score, but usually -3 and 5
def get_preference_score(messages=[{"role": "user", "content": "Hello!"}],
                         model="as-hackathon-pm-rollout"):
    message = client.messages.create(
        model="as-hackathon-pm-rollout",
        max_tokens=1,
        temperature=0,
        messages=messages
    )

    return message.research["value_heads"][0][0]


def build_prompt(
    amount1: int, item1: str,
    amount2: int, item2: str,
    save_1: bool = True,
    template: str = None
):

    user_msg = template.format(
        amount1=amount1, group1=item1, amount2=amount2, group2=item2)

    assistant_response = f"{amount1} {item1}" if save_1 else f"{amount2} {item2}"

    return [
        {"role": "user", "content": user_msg},
        {"role": "assistant", "content": assistant_response}
    ]


def build_prompts(scenario="trolley", min_range=1, max_range=2000, num_samples=50):
    # for k,v in SCENARIOS.items():
    template = SCENARIOS[scenario]
    data = []

    for group1, group2 in NATIONALITY_PAIRS:
        group_data = []
        for _ in range(num_samples):
            num_group_1 = np.random.randint(min_range, max_range)
            num_group_2 = np.random.randint(min_range, max_range)
            preference_1, preference_2 = compute_utility(
                num_group_1, group1, num_group_2, group2, template)
            group_data.append({
                "group1": group1,
                "group2": group2,
                "num_group1": num_group_1,
                "num_group2": num_group_2,
                "preference_group1": preference_1,
                "preference_group2": preference_2,
                "preference_diff": preference_2-preference_1
            })
            time.sleep(1)
        df = pd.DataFrame(group_data)
        df.to_csv(f"./outputs/{group1}_{group2}_{scenario}.csv")
        data += group_data
    df = pd.DataFrame(data)
    df.to_csv(f"./outputs/all_data_{scenario}.csv")
    return data


def compute_utility(amount_1: int, thing_1: str, amount_2: int, thing_2: str, template):
    prompt_a = build_prompt(amount_1, thing_1, amount_2,
                            thing_2, True, template)
    prompt_b = build_prompt(
        amount_1, thing_1, amount_2, thing_2, False, template)

    print(prompt_a)
    print(prompt_b)
    preference_a = get_preference_score(prompt_a)
    preference_b = get_preference_score(prompt_b)
    print(
        f"Preference A: {preference_a} Preference B: {preference_b} Difference: {preference_b-preference_a}\n\n")

    return preference_a, preference_b


if __name__ == "__main__":

    """ chocolates, exchange_rate = golden_section_exchange_search(
        compute_utility, 1, 10000, 100, max_iterations=10)
    print(f"🍫 {chocolates:.2f} chocolates ≈ 🍌 100 bananas")
    print(f"Implied exchange rate: 1 banana ≈ {exchange_rate:.3f} chocolates") """
    # x,  y = compute_utility(115*2, 150*2)
    print(len(NATIONALITY_PAIRS))
    build_prompts(num_samples=50)
