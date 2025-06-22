import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Load your data
df = pd.read_csv('data.csv')  # Replace with your actual file path

# Create the plot
plt.figure(figsize=(10, 8))

# Create scatter plot with color mapping
# Set symmetric color limits around 0
max_abs_pref = max(abs(df['preference_diff'].min()),
                   abs(df['preference_diff'].max()))
vmin, vmax = -max_abs_pref, max_abs_pref

scatter = plt.scatter(df['americans'], df['russians'],
                      c=df['preference_diff'],
                      # Red-Yellow-Green colormap (reversed so red=negative, green=positive)
                      cmap='RdYlGn_r',
                      vmin=vmin, vmax=vmax,  # Symmetric around 0
                      s=150,  # Point size
                      alpha=0.7,
                      edgecolors='black',
                      linewidth=0.5)

# Add colorbar
colorbar = plt.colorbar(scatter)
colorbar.set_label('Preference Difference', fontsize=12)

# Labels and title
plt.xlabel('Number of Americans', fontsize=12)
plt.ylabel('Number of Russians', fontsize=12)
plt.title('Preference Differences: Americans vs Russians',
          fontsize=14, fontweight='bold')

# Add grid for better readability
plt.grid(True, alpha=0.3)

# Optional: Add diagonal line for equal numbers
max_val = max(df['americans'].max(), df['russians'].max())
plt.plot([0, max_val], [0, max_val], '--',
         color='gray', alpha=0.5, label='Equal numbers')
plt.legend()

# Adjust layout and show
plt.tight_layout()
# plt.show()

# Optional: Print some statistics
print("Data Summary:")
print(
    f"Preference difference range: {df['preference_diff'].min():.3f} to {df['preference_diff'].max():.3f}")
print(f"Mean preference difference: {df['preference_diff'].mean():.3f}")
print(f"Americans range: {df['americans'].min()} to {df['americans'].max()}")
print(f"Russians range: {df['russians'].min()} to {df['russians'].max()}")

# save as png
plt.savefig('preference_plot.png', dpi=300, bbox_inches='tight')
