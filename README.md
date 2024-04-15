# @alenaksu/shortcut

A lightweight JavaScript library for managing keyboard shortcuts in the browser.

## Installation

There are two convenient ways to install shortcut:

Using npm:

```bash
npm install @alenaksu/shortcut
```

Using a CDN (Content Delivery Network):

Include the following script tag in your HTML file:

HTML

<script src="https://unpkg.com/shortcut@latest/dist/shortcut.min.js"></script>

## Usage

### Define a Shortcut

A shortcut is string representing the desired keyboard combination. Use plus signs (+) to separate keys and modifiers (e.g., `ctrl+c`).

Supported key names include standard letters, numbers, symbols, arrow keys, and common modifiers like ctrl, shift, alt, cmd, and meta.

A callback is executed when the specified keyboard shortcut is pressed.

**Example: Simple Shortcut**

```js
import shortcut from "shortcut";

shortcut("ctrl+c", () => {
  // Simulate copying for this example
  console.log("Content copied!");
});
```

### Multiple Shortcuts

You can combine keyboard shortcuts using commas (,):

```js
shortcut("ctrl+j, ctrl+k", () => {
  console.log("Jumped to next item!");
});
```

### Timeouts (Optional)

For complex key sequences, you can optionally provide a timeout value (in milliseconds) to the options. This prevents accidental triggers if the key presses don't occur within the specified timeframe:

```js
shortcut(
  "ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, b, a",
  () => {
    console.log("Konami Code activated!");
  },
  { timeout: 3000 },
); // Timeout of 3 seconds
```

## License

This library is licensed under the MIT License, a permissive open-source license that allows for free use, modification, and distribution. See the LICENSE file for details.
