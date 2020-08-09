import React from "react";
import { Tab } from "semantic-ui-react";
import { css } from "@emotion/core";
import { HopInventory } from "./HopInventory";

const paneStyles = css`
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
`;

const panes = [
  {
    menuItem: "Hops",
    render: () => (
      <Tab.Pane attached={false} css={paneStyles}>
        <HopInventory />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Grains",
    render: () => (
      <Tab.Pane attached={false} css={paneStyles}>
        <HopInventory type={"grains"} />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Adjuncts",
    render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
  },
];

const Inventory = () => {
  return (
    <Tab
      menu={{
        borderless: true,
        attached: false,
        secondary: true,
        pointing: true,
      }}
      panes={panes}
    />
  );
};

export default Inventory;
