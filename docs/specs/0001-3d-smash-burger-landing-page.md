# Spec: Interactive 3D Smash Burger & Fries Editorial Landing Page

## Problem Statement

Food lovers and diners looking at online restaurant menus are typically presented with flat, uninspiring 2D food photography that fails to convey the appetizing depth, craftsmanship, and artisan quality of a gourmet meal combo (double smash burger, crispy golden fries, ketchup, and checkered dining setting). There is no engaging way for users to explore the food from multiple dimensions while experiencing the high-end aesthetic of an editorial culinary poster.

## Solution

A single-page, highly interactive 3D landing experience built with React Three Fiber and Tailwind CSS. The page presents an interactive **Orbit Stage** containing the 3D **Meal Showcase** (`burger_and_fries.glb`), framed by a luxury Didone/Serif **Stacked Display** ("SMASH BURGER") and a minimalist **Editorial Overlay**. The application supports seamless switching between a warm "Artisan Diner" light theme and a moody "Smokehouse Grill" dark theme, clamped 360° orbital exploration, gentle **Auto Orbit** idle rotation, discrete **Camera Presets** ("Full Combo", "Focus Burger", "Focus Fries"), and an artisan meal order summary card (`ONLY @ ₹349`).

## User Stories

1. As a site visitor, I want to see a 3D model of the smash burger, fries, and ketchup loaded in the center of the screen, so that I can experience an appetizing, realistic preview of the meal.
2. As a site visitor, I want to see bold, luxury serif typography repeating "SMASH BURGER" in the background, so that the page feels like a high-fashion editorial magazine poster.
3. As a site visitor, I want the 3D meal to float gently and slowly orbit when I am not interacting, so that the page feels alive and dynamic.
4. As a site visitor, I want to click and drag to rotate the 3D meal horizontally in full 360 degrees, so that I can inspect the food from any angle.
5. As a site visitor, I want vertical camera rotation to be clamped between upper and lower angles, so that the camera never dips awkwardly beneath the table or flips upside down.
6. As a site visitor, I want to scroll or pinch to zoom within safe limits, so that I can view finer details of the burger and fries without clipping through the 3D meshes.
7. As a site visitor, I want the camera to smoothly resume gentle auto-orbit rotation 2 seconds after I release the mouse, so that the visual presentation remains continuous.
8. As a site visitor, I want to switch between an "Artisan Diner" (warm cream canvas) and "Smokehouse Grill" (moody dark slate) theme mode, so that I can view the meal in my preferred ambiance.
9. As a site visitor, I want the 3D lighting, ambient glow, and background colors to transition smoothly during theme changes, so that the visual shift feels cohesive and cinematic.
10. As a site visitor, I want to click dedicated Camera Preset pills ("Full Combo", "Focus Burger", "Focus Fries"), so that the camera smoothly glides to highlight specific parts of the meal.
11. As a site visitor, I want to see clear top header category labels ("AMERICAN CLASSIC" and "GOURMET EDITION") with thin editorial rule lines, so that the layout matches classic editorial hierarchy.
12. As a site visitor, I want to see the meal pricing clearly formatted as "ONLY @ ₹349", so that I immediately know the cost of the combo.
13. As a site visitor, I want to see the handwritten cursive brand signature "Flavour trails", so that the page feels authentic and artisanal.
14. As a site visitor, I want to read a concise narrative description highlighting the smashed patties, golden fries, and signature dip, so that I understand the culinary qualities of the meal.
15. As a site visitor, I want to click an "ORDER NOW" / "ORDER COMBO" button, so that an artisan order summary modal opens with combo breakdown and nutritional information.
16. As a site visitor, I want to close the order summary modal easily via a close button or backdrop click, so that I can return to exploring the 3D meal.
17. As a mobile visitor, I want the layout and 3D canvas to scale responsively on phones and tablets, so that touch drag gestures and typography remain legible and fluid.
18. As a site visitor, I want to see a clean loading indicator while the 3D model loads, so that I have immediate visual feedback during asset downloading.

## Implementation Decisions

- **Architecture**: Single-page application built on a modern component framework utilizing React Three Fiber (`@react-three/fiber`, `@react-three/drei`) with WebGL canvas rendering, synchronized with DOM editorial overlays.
- **Orbit Stage & Camera Rigging**: Unified camera controller implementing orbital drag physics with clamped polar angles (minimum ~30°, maximum ~85°), bounded zoom distance, and tweened interpolation when activating Camera Presets.
- **Lighting Pipeline**: Multi-point directional and ambient lighting configured to adapt dynamically to the active Theme Mode (warm golden sunlight for light mode, deep ember rim-lighting for dark mode).
- **Typography & Layout**: Luxury Didone/Serif display typography for the Stacked Display ("SMASH BURGER"), paired with an organic cursive script for the brand signature ("Flavour trails") and geometric sans-serif for metadata and body copy.
- **Theme Management**: Centralized reactive theme state broadcasting changes to Tailwind CSS utility classes and WebGL canvas clear color and ambient light intensities.
- **State Management**: Lightweight declarative state for active Theme Mode, active Camera Preset, and Order Modal visibility.

## Testing Decisions

- **Test Seam**: Testing at the highest integration seam (top-level application container and rendered DOM overlay), verifying observable behavior rather than internal WebGL matrix calculations.
- **Component & Behavior Testing**:
  - Verify initial rendering of the Editorial Overlay (headers, pricing, narrative copy, signature).
  - Verify Theme Mode toggle interaction updates DOM class states and theme attributes.
  - Verify Camera Preset pill selections update the active state and dispatch target camera positions.
  - Verify the Order Modal opens on CTA click and dismisses on backdrop/close click.
  - Verify responsive viewport adjustments maintain canvas container mounting.

## Out of Scope

- Multi-page routing and catalog browsing.
- Live payment gateway processing and card transaction settlement.
- Server-side user authentication and database persistence.
- AR/VR WebXR headset pass-through.

## Further Notes

- 3D asset `burger_and_fries.glb` contains meshes for burger (`burger_0`), fries cup (`fries_1`), ketchup bottle (`label_4`), and checkered napkins (`Plane_2`, `Plane.001_3`).
- Asset loading utilizes GLTF preloading and suspense boundaries to ensure zero layout shift.
