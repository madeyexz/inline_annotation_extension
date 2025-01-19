# Innline Annotation

## Overview

Innline Annotation is a Chrome extension that automatically adds brief explanations in parentheses after technical or specialized terms while you browse the web. It makes complex content instantly more understandable without changing the original text structure or requiring you to leave the page.


> [!EXAMPLE]
> 
> Before: The quantum entanglement phenomenon demonstrates nonlocality, challenging our understanding of quantum mechanics and EPR paradox.
> 
> After: The quantum entanglement (a phenomenon where particles remain connected regardless of distance) phenomenon demonstrates nonlocality (the ability of particles to instantly influence each other at any distance), challenging our understanding of quantum mechanics and EPR paradox (a thought experiment questioning quantum mechanics' completeness).


## Features

- **Smart Term Detection**: Automatically identifies specialized or technical terms that might be unfamiliar to a smart college graduate
- **Context-Aware Explanations**: Adds brief, one-sentence explanations in parentheses right after unfamiliar terms
- **Personalized Experience**: Specify your areas of expertise to avoid unnecessary explanations for familiar topics
- **Language Matching**: Provides explanations in the same language as the source text
- **Minimal Interface**: Works seamlessly within your browser without disrupting the reading experience
- **Customizable Knowledge Base**: Configure your familiar topics to prevent redundant explanations
- **Easy Toggle**: Enable or disable annotations with a single click

## Installation

You can go to Chrome Extension Store and and install.

1. **Clone the Repository**

   ```bash
   git clone https://github.com/madeyexz/inline_annotation_extension.git
   ```

2. **Navigate to the Extension Directory**

   ```bash
   cd innline-annotation
   ```

3. **Load the Extension in Chrome**

   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** in the top right corner
   - Click **Load unpacked** and select the `innline-annotation` directory

## Usage

1. **Initial Setup**

   - Click the Innline Annotation icon in your Chrome toolbar
   - In the settings popup, you'll see options to customize your experience

2. **Configuring Your Expertise**

   - Enter your areas of expertise as comma-separated topics
   - Example: `molecular biology, quantum physics, machine learning`
   - The extension will skip explanations for terms in these fields

3. **How It Works**

   The extension processes text using advanced prompting to:
   - Identify specialized terms that might be unfamiliar to college graduates
   - Skip terms in your specified areas of expertise
   - Add brief, contextual explanations in parentheses
   - Preserve the original text structure and flow

4. **Controls**

   - Toggle the extension on/off via the toolbar icon
   - Access settings anytime to update your expertise areas
   - Changes sync automatically across your Chrome instances