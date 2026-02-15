# Arcana Desktop 🔮

**A modern, extensible Digital Tarot and Divination Application built with React, TypeScript, and Electron.**

Arcana Desktop bridges the gap between traditional cartomancy and modern digital design. It features a fully customizable Tarot reading environment, a drag-and-drop spread designer, and a unique "MTG Oracle" engine that interprets *Magic: The Gathering* cards using a custom semantic vector analysis system.

🌟 **[View the Live Asset Dashboard](https://t3dy.github.io/Ted-s-Tarot-App/system)** to explore the deck and rules engine running in your browser.

---

## 📖 User Guide

### 1. Tarot Reading Session
Perform digital readings with the full 78-card Rider-Waite Smith deck.
- **Select a Spread**: Choose from classic layouts like the *Celtic Cross* or the *Three Card Spread*.
- **The Ritual**: Click "Shuffle & Deal" to watch cards distribute to their positions.
- **Reveal**: Click cards individually to flip them. Reversed cards (upside-down) are handled automatically with distinct meanings.
- **Analysis**: Use the "Analyze" feature to visualize the Elemental Balance (Fire/Water/Air/Earth) of your spread to spot dominant themes.

### 2. Visual Spread Designer
Create your own reading layouts without writing code.
- **Drag & Drop**: Place card positions anywhere on the infinite canvas.
- **Customize**: Click a position to rename it (e.g., "The Obstacle"), rotate it, or delete it.
- **Save**: Persist your custom spreads to local storage to use them in future reading sessions.

### 3. MTG Oracle (Beta)
A unique divination mode for *Magic: The Gathering* enthusiasts.
- **Draw Fate**: Pull a random card from the Scryfall database or search for a specific card (e.g., "Birds of Paradise").
- **Oracle Insight**: The system doesn't just show the card; it *reads* it. An interpretation engine scans the card's mana cost, colored pips, keywords, and type line to generate a tarot-like narrative.
- ** transparency**: Open the "Oracle Insight" panel to see exactly *why* the card was interpreted that way (e.g., *"Mana Value 5 triggered 'Conflict/Change' theme"*).

### 4. Correspondence Library
A reference guide for the mystic symbols.
- **Explore**: Tabs for Elements, Zodiac, and Numerology.
- **Search**: Quickly find the astrological rulers or elemental dignities of specific signs.

---

## 🛠 Tech Stack & Engineering Journey

This project was built to demonstrate **Product Thinking**, **System Architecture**, and **Creative Engineering**. Here is how specific challenges were solved:

### Challenge 1: "The app needs to feel tactile and 'alive', not like a spreadsheet."
**Solution: Framer Motion & Interactive UI**
I avoided static state changes in favor of fluid physics-based animations.
- **Implementation**: Used `framer-motion` for complex gestures. When dealing cards, we don't just toggle visibility; we animate the `x/y` coordinates from a "deck" source to the spread position with a staggered delay.
- **Result**: The "Card Flip" allows the user to peek at the answer before fully revealing it, mimicking the tension of a real reading.

### Challenge 2: "Users want to invent their own spreads, but coordinate math is hard."
**Solution: Visual Editor with Coordinate Mapping**
I needed a way for users to define spatial relationships between cards without typing JSON.
- **Implementation**: Built a `SpreadDesigner` component where every `onDragEnd` event calculates the delta from the center. These relative coordinates are normalized and saved to `LocalStorage`.
- **Result**: A generic `SpreadLayout` component can take *any* array of position data (system or user-generated) and render a perfect responsive layout.

### Challenge 3: "How do we read Magic cards like Tarot?"
**Solution: Semantic Feature Extraction & Vector Analysis**
I couldn't just use a lookup table because there are 25,000+ Magic cards. I needed a rules engine.
- **The Engine**: I built a subsystem that treats a Magic card as a "vector" of features:
    - **Mana Numerology**: Normalized Mana Value (CMC) to a 0-10 scale of "Life Phase" (e.g., 1=Initiation, 5=Conflict, 9=Culmination).
    - **Pip Analysis**: A scanner counts colored mana symbols to determine "Intensity" and "Dominance".
    - **Keyword Mapping**: Rules text keywords (e.g., *Flying*, *Haste*, *Deathtouch*) are mapped to advice axes (*Perspective*, *Urgency*, *Leverage*).
- **Result**: A deterministic but surprisingly deep reading system that can interpret cards it has never seen before based on their fundamental properties.

### Challenge 4: "We need data from external APIs but can't hit rate limits."
**Solution: Service Layer with In-Memory Caching**
The core functionality relies on the Scryfall API.
- **Implementation**: The `scryfall.ts` service implements a "fetch-then-cache" strategy. Responses are normalized into our internal `MTGCard` model and stored in `LocalStorage`.
- **Result**: Repeated searches or draws are instant, and the app is resilient to network blips.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/t3dy/Ted-s-Tarot-App.git
   cd Ted-s-Tarot-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for Desktop (Electron)**
   ```bash
   npm run build
   ```

---

*Built by Ted Hand. 2026.*
