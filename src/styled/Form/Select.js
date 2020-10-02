import React from "react";
import Downshift from "downshift";
import styled from "@emotion/styled";
import { List } from "../List";
import { getFilter } from "./utils";

const Select = ({
  options,
  placeholder = "Select item",
  onChange,
  defaultValue,
  label,
}) => {
  const filter = getFilter(options);
  return (
    <Downshift
      onChange={onChange}
      itemToString={(item) => (item ? item.label : "")}
      initialSelectedItem={options.find((opt) => opt.value === defaultValue)}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        getToggleButtonProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
        clearSelection,
      }) => {
        return (
          <Container>
            {label && <Label {...getLabelProps()}>{label}</Label>}
            <Combobox {...getRootProps({}, { suppressRefError: true })}>
              <input {...getInputProps({ placeholder })} />
              <ToggleButton
                {...{
                  ...getToggleButtonProps(),
                  clearSelection,
                  hasSelectedItem: !!selectedItem,
                }}
              />
            </Combobox>
            <MenuWrapper>
              <Menu {...getMenuProps()}>
                {isOpen
                  ? filter(inputValue).map((item, index) => {
                      return (
                        <MenuItem
                          {...getItemProps({
                            key: item.value,
                            index,
                            item,
                            isActive: highlightedIndex === index,
                            isSelected: selectedItem === item,
                          })}
                        >
                          {item.label}
                        </MenuItem>
                      );
                    })
                  : null}
              </Menu>
            </MenuWrapper>
          </Container>
        );
      }}
    </Downshift>
  );
};

const Container = styled.div`
  position: relative;
`;

const MenuWrapper = styled.div`
  position: absolute;
  width: 100%;
  max-height: 300px;
  overflow: auto;
  z-index: 1;
`;

const Menu = styled(List)`
  overflow: hidden;
`;
const MenuItem = styled.li`
  background-color: ${({ isActive }) => (isActive ? "lightgray" : "white")};
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
  padding: 8px;
`;
const Combobox = styled.div`
  position: relative;
`;

// TODO refactor when moved off Semantic UI
const Label = styled.label`
  display: block;
  margin: 0em 0em 0.28571429rem 0em;
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.92857143em;
  font-weight: bold;
  text-transform: none;
`;

const ToggleButton = ({ hasSelectedItem, clearSelection, ...props }) => {
  return hasSelectedItem ? (
    <ToggleButtonContainer
      onClick={clearSelection}
      aria-label="clear selection"
    >
      X
    </ToggleButtonContainer>
  ) : (
    <ToggleButtonContainer {...props} aria-label={"toggle menu"}>
      &#x25BE;
    </ToggleButtonContainer>
  );
};

const ToggleButtonContainer = styled.button`
  position: absolute;
  cursor: pointer;
  background: transparent;
  border: none;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;
export default Select;
