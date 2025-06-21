import math


def golden_section_exchange_search(preference_function,
                                   min_quantity_a: int,
                                   max_quantity_a: int,
                                   fixed_quantity_b: int = 100,
                                   tolerance: int = 1,
                                   max_iterations: int = 10):
    """
    Perform golden-section search over integer quantities of Token A to find
    the quantity that maximizes the preference score against a fixed quantity of Token B.

    Parameters:
        preference_function (callable): Takes (quantity_a: int, quantity_b: int) → float
        min_quantity_a (int): Minimum candidate value for Token A
        max_quantity_a (int): Maximum candidate value for Token A
        fixed_quantity_b (int): Constant quantity of Token B to compare against
        tolerance (int): Minimum difference between bounds before stopping
        max_iterations (int): Cap on number of iterations

    Returns:
        tuple: (optimal_quantity_a: int, exchange_rate_a_per_b: float)
    """

    phi = (1 + math.sqrt(5)) / 2
    resphi = 2 - phi

    for _ in range(max_iterations):
        interval = max_quantity_a - min_quantity_a
        if interval <= tolerance:
            break

        x1 = int(round(max_quantity_a - resphi * interval))
        x2 = int(round(min_quantity_a + resphi * interval))

        if x1 == x2:
            break  # Can't refine further

        utility1 = preference_function(x1, fixed_quantity_b)
        utility2 = preference_function(x2, fixed_quantity_b)

        if utility1 > utility2:
            max_quantity_a = x2
        else:
            min_quantity_a = x1

    optimal_quantity_a = (min_quantity_a + max_quantity_a) // 2
    exchange_rate_a_per_b = optimal_quantity_a / fixed_quantity_b

    return optimal_quantity_a, exchange_rate_a_per_b
