import React from "react";
import { Tab } from "semantic-ui-react";
import { css } from "@emotion/core";
import { InventoryTab } from "./InventoryTab";

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
        <InventoryTab key="hop" type="HOP" />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Grains",
    render: () => (
      <Tab.Pane attached={false} css={paneStyles}>
        <InventoryTab key="grain" type="GRAIN" />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Adjuncts",
    render: () => (
      <Tab.Pane attached={false} css={paneStyles}>
        <InventoryTab key="adjunct" type="ADJUNCT" />
      </Tab.Pane>
    ),
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
