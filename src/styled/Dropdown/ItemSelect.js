import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import { GET_ITEMS } from "../../components/Dashboard/queries";
import { Dropdown } from "semantic-ui-react";

/**
 *
 * ItemSelect
 *
 */
const ItemSelect = ({ type, onChange, defaultValue }) => {
  const { data = { items: [] }, loading } = useQuery(GET_ITEMS);

  let items = useMemo(() => {
    const items = type
      ? data?.items?.filter((item) => item.type === type)
      : data.items;

    return items.map(({ id, name }) => ({
      key: id,
      text: name,
      value: id,
    }));
  }, [type, data]);

  if (loading) return <p>Loading...</p>;

  return (
    <Dropdown
      placeholder="Select item"
      search
      selection
      options={items}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
};

ItemSelect.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]),
};

export default ItemSelect;
