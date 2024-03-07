export const keyAliases: Record<string, string> = {
  space: " ",
  esc: "escape",
  del: "delete",
  ins: "insert",
  cmd: "meta",
  win: "meta",
  apps: "contextmenu",
  ctl: "control",
  ctrl: "control",
  opt: "alt",
  alt: "alt",
  pause: "pausebreak",
  pgup: "pageup",
  pgdn: "pagedown",
  caps: "capslock",
  return: "enter",
};

const pressedKeys = new Set<string>();
const handlers = new Set<() => void>();

const getKeyName = (key: string) => keyAliases[key.toLowerCase()] ?? key.toLowerCase();

document.addEventListener("keydown", (e) => {
  pressedKeys.add(e.key.toLowerCase());
});

document.addEventListener("keyup", (e) => {
  handlers.forEach((handler) => handler());
  pressedKeys.delete(e.key.toLowerCase());
});

export const isKeyPressed = (key: string) => {
  return pressedKeys.has(getKeyName(key));
};

export const clearAllShortcuts = () => {
  handlers.clear();
};

export const shortcut = (keys: string, callback: () => void, { timeout = 0 } = {}) => {
  const [...list]: string[][] = keys
    .replaceAll(" ", "")
    .toLowerCase()
    .split(",")
    .map((key) => key.split("+"));

  let cursor = 0;
  let timerId = 0;

  const reset = () => {
    cursor = 0;
  };

  const handleKeyDown = () => {
    clearTimeout(timerId);

    const keys = list.at(cursor)!;
    const allPressed = keys.every((key) => isKeyPressed(key));
    const somePressed = keys.some((key) => isKeyPressed(key));
    const shortcutComplete = allPressed && ++cursor === list.length;

    if (!somePressed) {
      reset();
    }

    if (!allPressed) {
      return;
    }

    if (shortcutComplete) {
      callback();
      reset();
    } else if (timeout) {
      timerId = setTimeout(reset, timeout);
    }
  };

  handlers.add(handleKeyDown);

  return () => handlers.delete(handleKeyDown);
};
