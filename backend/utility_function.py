import math
from skopt import gp_minimize
from skopt.space import Integer


def bayesian_exchange_search(preference_function,
                             min_quantity_a: int,
                             max_quantity_a: int,
                             fixed_quantity_b: int = 100,
                             n_calls: int = 20,
                             random_starts: int = 5):
    """
    Perform Bayesian Optimization over integer quantities of Token A to maximize
    preference score against a fixed quantity of Token B.

    Parameters:
        preference_function (callable): Takes (quantity_a: int, quantity_b: int) → float
        min_quantity_a (int): Minimum value for Token A
        max_quantity_a (int): Maximum value for Token A
        fixed_quantity_b (int): Constant quantity of Token B
        n_calls (int): Total number of evaluations
        random_starts (int): Number of random initial samples

    Returns:
        tuple: (optimal_quantity_a: int, exchange_rate_a_per_b: float)
    """

    # Wrapper for skopt (minimizes, so we return -utility)
    def objective(x):
        quantity_a = int(x[0])
        utility = preference_function(quantity_a, fixed_quantity_b)
        return -utility  # skopt minimizes, we want to maximize

    # Define search space
    space = [Integer(min_quantity_a, max_quantity_a, name="quantity_a")]

    # Run Bayesian optimization
    result = gp_minimize(
        func=objective,
        dimensions=space,
        acq_func="EI",  # Expected Improvement
        n_calls=n_calls,
        n_initial_points=random_starts,
        random_state=42,
        verbose=False
    )

    best_quantity_a = int(result.x[0])
    best_utility = -result.fun
    exchange_rate = best_quantity_a / fixed_quantity_b

    return best_quantity_a, exchange_rate, best_utility


def golden_section_exchange_search(preference_function,
                                   min_quantity_a: int,
                                   max_quantity_a: int,
                                   fixed_quantity_b: int = 100,
                                   tolerance: int = 1,
                                   max_iterations: int = 10):
    """
    Perform golden-section search over integer quantities of Token A to find
    the quantity that maximizes the preference score against a fixed quantity of Token B.
    The search is initialized with one evaluation point at `fixed_quantity_b`.

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

    # Start with one evaluation point fixed at fixed_quantity_b
    x1 = fixed_quantity_b
    interval = max_quantity_a - min_quantity_a

    # Ensure x1 is within the search bounds
    x1 = max(min_quantity_a, min(max_quantity_a, x1))

    # Compute the other point based on golden ratio
    x2 = int(round(min_quantity_a + resphi * interval))
    if x2 == x1:
        x2 = x1 + 1 if x1 < max_quantity_a else x1 - 1

    x1 = int(round(x1))
    x2 = int(round(x2))

    utility1 = preference_function(x1, fixed_quantity_b)
    utility2 = preference_function(x2, fixed_quantity_b)

    for _ in range(max_iterations):
        if abs(max_quantity_a - min_quantity_a) <= tolerance:
            break

        if utility1 > utility2:
            # x1 is better → shift the upper bound to x2
            max_quantity_a = x2
            x2 = x1
            utility2 = utility1
            interval = max_quantity_a - min_quantity_a
            x1 = int(round(max_quantity_a - resphi * interval))
            utility1 = preference_function(x1, fixed_quantity_b)
        else:
            # x2 is better → shift the lower bound to x1
            min_quantity_a = x1
            x1 = x2
            utility1 = utility2
            interval = max_quantity_a - min_quantity_a
            x2 = int(round(min_quantity_a + resphi * interval))
            utility2 = preference_function(x2, fixed_quantity_b)

    optimal_quantity_a = (min_quantity_a + max_quantity_a) // 2
    exchange_rate_a_per_b = optimal_quantity_a / fixed_quantity_b

    return optimal_quantity_a, exchange_rate_a_per_b
