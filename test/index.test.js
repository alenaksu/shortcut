import { shortcut, clearAllShortcuts } from "../lib/index.js";
import { aTimeout, expect } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import sinon from "sinon";

describe("shortcut", () => {
  afterEach(() => {
    clearAllShortcuts();
  });

  it("should catch a simple shortcut", async () => {
    // Arrange
    const spyFn = sinon.spy();
    shortcut("ctrl+x", spyFn);

    // Act
    await sendKeys({
      press: "Control+X",
    });

    // Assert
    expect(spyFn).to.have.been.called;
  });

  it.only("should catch a combination of shortcuts", async () => {
    // Arrange
    const validSpy = sinon.spy();
    const invalidSpy = sinon.spy();

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
