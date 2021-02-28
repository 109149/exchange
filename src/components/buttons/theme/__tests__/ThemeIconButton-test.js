import ThemeIconButton from "../ThemeIconButton";
import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";

describe("<ThemeIconButton {..args} />", function () {
  let container;

  beforeEach(function () {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(function () {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("Renders button", function () {
    let isDark = true;
    let onClick = () => {};
    const args = {
      isDark,
      onClick,
    };

    act(function () {
      render(<ThemeIconButton {...args} />, container);
    });

    expect(container.firstChild.nodeName).toBe("BUTTON");
    expect(container.firstChild.firstChild.nodeName).toBe("SPAN");
    expect(container.firstChild.firstChild.firstChild.nodeName).toBe("svg");

    expect(true).toBe(true);
  });
});
