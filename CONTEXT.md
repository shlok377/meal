# Meal Landing Page

The single-page interactive 3D landing experience showcasing the Smash Burger and Fries meal combo with an editorial poster aesthetic.

## Language

**Meal Showcase**:
The interactive 3D centerpiece model composed of the smash burger, french fries, ketchup bottle, and checkered napkins.
_Avoid_: 3D viewer, product widget

**Stacked Display**:
The bold, vertically repeating luxury serif background typography ("SMASH BURGER") that frames the meal in an editorial poster layout.
_Avoid_: Background text, watermarks, text repeater

**Editorial Overlay**:
The minimalist, luxury poster-style UI elements (header categories, price tag, signature script, narrative paragraph, interactive actions) layered above the 3D scene.
_Avoid_: HUD, banner, dashboard

**Theme Mode**:
The visual styling state providing either the warm "Artisan Diner" light palette or the moody "Smokehouse Grill" dark palette.
_Avoid_: Dark reader, skin

**Orbit Stage**:
The 3D canvas environment containing dynamic Three.js lights, shadow plane, floating physics, and constrained 360° orbital camera interaction.
_Avoid_: Canvas box, 3D viewport

**Camera Preset**:
A defined viewpoint ("Full Combo", "Focus Burger", "Focus Fries") that smoothly animates camera position, rotation, and field of view to highlight meal components.
_Avoid_: Zoom button, camera angle

**Auto Orbit**:
The gentle floating rotational animation that seamlessly resumes when user manual drag interaction ceases.
_Avoid_: Idle loop, spinner
