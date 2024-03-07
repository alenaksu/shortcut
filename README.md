# shortcut

A lightweight JavaScript library for managing keyboard shortcuts in the browser.

## Examples

### Simple shortcuts

```ts
shortcut("ctrl+c", () => {
  copy();
});
```

### Combined shortcuts

```ts
shortcut("ctrl+j, ctrl+k", () => {
  copy();
});
```

### Timeout

```ts
shortcut('ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, b, a', () => {
    ...
}, { timeout: 3000 });
```
