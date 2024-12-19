import { vi, describe, it, afterEach } from "vitest";
import { shortcut, clearAllShortcuts } from "../src/index.js";

describe("shortcut", () => {
  afterEach(() => {
    clearAllShortcuts();
  });

  it("should catch a simple shortcut", async () => {
    // Arrange
    const spyFn = vi.fn();
    shortcut("ctrl+x", spyFn);

    // Act
    await sendKeys({
      press: "Control+X",
    });

    // Assert
    expect(spyFn).to.have.been.called;
  });

  it("should catch a combination of shortcuts", async () => {
    // Arrange
    const validSpy = vi.fn();
    const invalidSpy = vi.fn();

    shortcut("ctrl+x,ctrl+v", validSpy);
    shortcut("ctrl+x,ctrl+w", invalidSpy);

    // Act
    await sendKeys({
      press: "Control+X",
    });
    await sendKeys({
      press: "Control+V",
    });

    // Assert
    expect(validSpy).to.have.been.called;
    expect(invalidSpy).not.to.have.been.called;
  });
});
