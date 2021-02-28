import ConvertButton from "../ConvertButton";
import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";

describe("<ConvertButton {...args} />", function () {
  let container = null;
  beforeEach(function () {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(function () {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("Renders 'click me' with <div> as starting icon", function () {
    let text = "click me";
    let color = "primary";
    let icon = <div>I AM ICON</div>;
    let onClick = () => {};
    const args = {
      text,
      color,
      icon,
      onClick,
    };

    act(function () {
      render(<ConvertButton {...args} />, container);
    });

    expect(container.firstChild.nodeName).toBe("BUTTON");
    expect(container.firstChild.getAttribute("type")).toBe("button");

    // icon before actual text content
    let startIconSpan = container.firstChild.firstChild.firstChild;
    expect(startIconSpan.nodeName).toBe("SPAN");

    // icon's text
    expect(startIconSpan.firstChild.nodeName).toBe("DIV");
    expect(startIconSpan.firstChild.textContent).toBe("I AM ICON");

    // actual text content
    expect(container.textContent).toBe(`I AM ICON${text}`);
  });
});
