import math


def golden_section_exchange_search(preference_function,
                                   min_quantity_a,
                                   max_quantity_a,
                                   fixed_quantity_b=100,
                                   tolerance=1e-1,
                                   max_iterations=10):
    """
    Perform golden-section search to find the quantity of Token A that yields
    the highest preference score when compared against a fixed quantity of Token B.

    Parameters:
        preference_function (callable): A function that takes (quantity_a, quantity_b)
                                        and returns a scalar preference score.
        min_quantity_a (float): Minimum bound for Token A quantity.
        max_quantity_a (float): Maximum bound for Token A quantity.
        fixed_quantity_b (float): Constant quantity of Token B used in all comparisons.
        tolerance (float): Precision threshold for stopping.
        max_iterations (int): Maximum number of iterations (to control cost).

    Returns:
        tuple: (optimal_quantity_a, exchange_rate_a_per_b)
    """

    phi = (1 + math.sqrt(5)) / 2      # ≈ 1.618
    resphi = 2 - phi                  # ≈ 0.382

    interval = max_quantity_a - min_quantity_a

    x1 = max_quantity_a - resphi * interval
    x2 = min_quantity_a + resphi * interval

    f1 = preference_function(x1, fixed_quantity_b)
    f2 = preference_function(x2, fixed_quantity_b)

    for _ in range(max_iterations):
        if abs(max_quantity_a - min_quantity_a) < tolerance:
            break

        if f1 > f2:
            max_quantity_a = x2
            x2 = x1
            f2 = f1
            interval = max_quantity_a - min_quantity_a
            x1 = max_quantity_a - resphi * interval
            f1 = preference_function(x1, fixed_quantity_b)
        else:
            min_quantity_a = x1
            x1 = x2
            f1 = f2
            interval = max_quantity_a - min_quantity_a
            x2 = min_quantity_a + resphi * interval
            f2 = preference_function(x2, fixed_quantity_b)

    optimal_quantity_a = (min_quantity_a + max_quantity_a) / 2
    exchange_rate_a_per_b = optimal_quantity_a / fixed_quantity_b

    return optimal_quantity_a, exchange_rate_a_per_b
