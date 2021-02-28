import Header from "../Header";
import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";

describe("<Header {...args} />", function () {
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

  it("Renders 'oh' with default arguments", function () {
    let text = "oh";
    const args = {
      text,
    };

    act(function () {
      render(<Header {...args} />, container);
    });

    expect(container.textContent).toBe(text);
    expect(container.childNodes.length).toBe(1);

    // defaults
    expect(container.firstChild.nodeName).toBe("H1");
    expect(container.firstChild.getAttribute("class").includes("h5")).toBe(
      true
    );
  });

  it("Renders passed arguments", function () {
    let text = "Another one";
    let variant = "button";
    let component = "span";
    const args = {
      text,
      variant,
      component,
    };

    act(function () {
      render(<Header {...args} />, container);
    });

    expect(container.textContent).toBe(text);
    expect(container.childNodes.length).toBe(1);
    expect(container.firstChild.nodeName).toBe(component.toUpperCase());
    expect(container.firstChild.getAttribute("class").includes(variant)).toBe(
      true
    );
  });
});
