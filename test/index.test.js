import { vi, describe, it, afterEach, expect, beforeEach } from "vitest";
import { isKeyPressed, shortcut, unbindAllShortcuts } from "../src/index";
import { userEvent } from "@vitest/browser/context";

describe("shortcut", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    unbindAllShortcuts();
  });

  it("should catch a simple shortcut", async () => {
    // Arrange
    const spyFn = vi.fn();
    shortcut("ctrl+x", spyFn);

    // Act
    await userEvent.keyboard("{Control>}X{/Control}");

    // Assert
    expect(spyFn).toHaveBeenCalled();
  });

  it("should catch a combination of shortcuts", async () => {
    // Arrange
    const validSpy = vi.fn();
    const invalidSpy = vi.fn();

    shortcut("ctrl+x,ctrl+v", validSpy);
    shortcut("ctrl+x,ctrl+w", invalidSpy);

    // Act
    await userEvent.keyboard("{Control>}X{/Control}");
    await userEvent.keyboard("{Control>}V{/Control}");

    // Assert
    expect(validSpy).toHaveBeenCalled();
    expect(invalidSpy).not.toHaveBeenCalled();
  });

  it("should reset the state when and invalid combination is pressed", async () => {
    // Arrange
    const validSpy = vi.fn();
    const invalidSpy = vi.fn();

    shortcut("ctrl+x,ctrl+v", validSpy);
    shortcut("ctrl+x,ctrl+w", invalidSpy);

    // Act
    await userEvent.keyboard("{Control>}X{/Control}");
    await userEvent.keyboard("{Control>}C{/Control}");
    await userEvent.keyboard("{Control>}V{/Control}");

    // Assert
    expect(validSpy).not.toHaveBeenCalled();
    expect(invalidSpy).not.toHaveBeenCalled();
  });

  it("should reset the state a timeout is reached", async () => {
    // Arrange
    const validSpy = vi.fn();
    const invalidSpy = vi.fn();

    shortcut("ctrl+x,ctrl+v", validSpy);
    shortcut("ctrl+x,ctrl+v", invalidSpy, { timeout: 100 });

    // Act
    await userEvent.keyboard("{Control>}X{/Control}");
    vi.advanceTimersByTime(200);
    await userEvent.keyboard("{Control>}V{/Control}");

    // Assert
    expect(validSpy).toHaveBeenCalled();
    expect(invalidSpy).not.toHaveBeenCalled();
  });

  it("should detach a shortcut", async () => {
    // Arrange
    const spyFn = vi.fn();
    const detach = shortcut("ctrl+x", spyFn);

    // Act
    detach();
    await userEvent.keyboard("{Control>}X{/Control}");

    // Assert
    expect(spyFn).not.toHaveBeenCalled();
  });

  describe("isKeyPressed", () => {
    it("should return the state of the key", async () => {
      // Arrange
      const spyFn = vi.fn();
      shortcut("ctrl+x", spyFn);

      // Act
      await userEvent.keyboard("{Control>}");

      // Assert
      expect(isKeyPressed("ctrl")).toBe(true);
      expect(isKeyPressed("alt")).toBe(false);
    });
  });
});
