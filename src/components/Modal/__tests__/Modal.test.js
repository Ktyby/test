import renderer from "react-test-renderer";
import React from "react";

import Modal from "../Modal";

describe("components => Modal", () => {
  it("should render Modal component", () => {
    const component = renderer.create(<Modal children={[]} />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
