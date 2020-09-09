import React from "react";
import Downshift from "downshift";
import styled from "@emotion/styled";
import { List } from "../List";

const Select = ({
  options,
  placeholder,
  onChange,
  value,
  defaultValue,
  label,
}) => {
  return (
    <Downshift
      onChange={onChange}
      itemToString={(item) => (item ? item.value : "")}
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
      }) => {
        return (
          <>
            {label && <Label {...getLabelProps()}>{label}</Label>}
            <Combobox {...getRootProps({}, { suppressRefError: true })}>
              <input {...getInputProps()} />
              <ToggleButton {...getToggleButtonProps()} />
            </Combobox>
            <Menu {...getMenuProps()}>
              {isOpen
                ? options
                    .filter(
                      (item) => !inputValue || item.label.includes(inputValue)
                    )
                    .map((item, index) => {
                      console.log("pp", {
                        ...getItemProps({
                          key: item.value,
                          index,
                          item,
                        }),
                      });
                      return (
                        <MenuItem
                          {...getItemProps({
                            key: item.value,
                            index,
                            item,
                          })}
                          isSelected={selectedItem === item}
                          isHighlighted={highlightedIndex === index}
                        >
                          {item.label}
                        </MenuItem>
                      );
                    })
                : null}
            </Menu>
          </>
        );
      }}
    </Downshift>
  );
};

const Menu = styled(List)``;
const MenuItem = styled.li`
  background-color: ${({ isHighlighted }) =>
    isHighlighted ? "lightgray" : "white"};
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
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

const ToggleButton = ({ ...props }) => {
  return (
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
