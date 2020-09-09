import matchSorter from "match-sorter";

export const getFilter = (items) => (filter) => {
  return filter
    ? matchSorter(items, filter, {
        keys: ["label"],
      })
    : items;
};
