# Dual-Theme Dynamic Lighting and Clamped Orbit Control Architecture

We chose to integrate dynamic directional and ambient Three.js lighting that shifts tone and intensity based on the active Theme Mode ("Artisan Diner" warm sunlight vs. "Smokehouse Grill" dramatic ember rim-lighting). The camera system implements a unified controller supporting both 360° user drag with polar angle clamping (avoiding void viewing angles) and smooth tweened transitions to discrete Camera Presets ("Full Combo", "Focus Burger", "Focus Fries") with auto-orbit resumption.
