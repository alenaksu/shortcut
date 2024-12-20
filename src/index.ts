export const keyAliases: Map<string, string> = new Map(
  Object.entries({
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
  }),
);

const pressedKeys = new Set<string>();
const handlers = new Set<() => void>();

const getKeyName = (key: string) => keyAliases.get(key.toLowerCase()) ?? key.toLowerCase();

export const isKeyPressed = (key: string) => {
  return pressedKeys.has(getKeyName(key));
};

export const unbindAllShortcuts = () => {
  handlers.clear();
};

export const shortcut = (keys: string, callback: () => void, { timeout = 0 } = {}) => {
  const [...list]: string[][] = keys
    .replaceAll(" ", "")
    .toLowerCase()
    .split(",")
    .map((key) => key.split("+").map(getKeyName));

  let cursor = 0;
  let timeoutId = 0;

  const reset = () => {
    cursor = 0;
  };

  const handleKeyDown = () => {
    clearTimeout(timeoutId);

    const keys = list.at(cursor)!;

    let pressed = 0;
    for (const pressedKey of pressedKeys) {
      if (!keys.includes(pressedKey)) {
        reset();
        return;
      }

      pressed++;
    }

    const allPressed = pressed < keys.length;
    if (allPressed) {
      return;
    }

    const shortcutComplete = ++cursor === list.length;
    if (shortcutComplete) {
      callback();
      reset();
    } else if (timeout) {
      timeoutId = window.setTimeout(reset, timeout);
    }
  };

  handlers.add(handleKeyDown);

  return () => handlers.delete(handleKeyDown);
};

document.addEventListener("keydown", (e) => {
  pressedKeys.add(e.key.toLowerCase());
  handlers.forEach((handler) => handler());
});

document.addEventListener("keyup", (e) => {
  pressedKeys.delete(e.key.toLowerCase());
});
