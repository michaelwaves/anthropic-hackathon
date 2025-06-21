import pandas as pd
import matplotlib as plt


data = pd.read_csv('./sev/data.csv')


def estimate_indifference_point(data):
    # Sort by quantity A
    sorted_data = sorted(data, key=lambda d: d['a'])

    for i in range(len(sorted_data) - 1):
        d1, d2 = sorted_data[i], sorted_data[i + 1]
        if d1['diff'] * d2['diff'] < 0:  # Sign flip
            # Linear interpolation
            a1, diff1 = d1['a'], d1['diff']
            a2, diff2 = d2['a'], d2['diff']
            t = -diff1 / (diff2 - diff1)
            indifference_a = a1 + t * (a2 - a1)
            return indifference_a
    return None  # No zero crossing found


def plot_data(data):
    result = estimate_indifference_point(data)
    print(f"Estimated indifference point (A per {data[0]['b']} B): {result}")
    a_vals = [d['a'] for d in data]
    diffs = [d['diff'] for d in data]
    plt.figure(figsize=(8, 5))
    plt.plot(a_vals, diffs, 'o-', label="utility(A) - utility(B)")
    plt.axhline(0, color='gray', linestyle='--')
    if result:
        plt.axvline(result, color='red', linestyle='--',
                    label='Indifference Point')
    plt.xlabel("Quantity A")
    plt.ylabel("Preference A - B")
    plt.title("Preference Difference vs A")
    plt.legend()
    plt.grid(True, linestyle='--', alpha=0.5)
    plt.tight_layout()
    plt.savefig("indifference_point_plot.png", dpi=300)
    plt.show()
