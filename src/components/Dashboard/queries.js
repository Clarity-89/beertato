import gql from "graphql-tag";

const INVENTORY_FIELDS = gql`
  fragment InventoryFields on Inventory {
    id
    amount
  }
`;

const ITEM_FIELDS = gql`
  fragment ItemFields on Item {
    id
    name
    type
  }
`;

export const INVENTORY = gql`
  query Inventory($type: ItemType) {
    inventory(type: $type) {
      ...InventoryFields
      item {
        ...ItemFields
      }
    }
  }
  ${INVENTORY_FIELDS}
  ${ITEM_FIELDS}
`;

export const GET_ITEMS = gql`
  query GetItems($type: ItemType) {
    items(type: $type) {
      ...ItemFields
    }
  }
  ${ITEM_FIELDS}
`;

export const ADD_INVENTORY = gql`
  mutation AddInventory($amount: Float!, $item_id: ID!) {
    addInventory(amount: $amount, item_id: $item_id) {
      ...InventoryFields
      item {
        ...ItemFields
      }
    }
  }
  ${INVENTORY_FIELDS}
  ${ITEM_FIELDS}
`;

export const UPDATE_INVENTORY = gql`
  mutation UpdateInventory($amount: Float!, $id: ID!) {
    updateInventory(amount: $amount, id: $id) {
      ...InventoryFields
      item {
        ...ItemFields
      }
    }
  }
  ${INVENTORY_FIELDS}
  ${ITEM_FIELDS}
`;

export const DELETE_INVENTORY = gql`
  mutation DeleteInventory($id: ID!) {
    deleteInventory(id: $id)
  }
`;

export const RECIPE_FIELDS = gql`
  fragment RecipeFields on Recipe {
    id
    name
    abv
    attenuation
    boilVolume
    brewDate
    description
    ebc
    fermentationDuration
    fermentationTemp
    finalGravity
    ibu
    mashDuration
    mashTemp
    notes
    originalGravity
    originalGravity
    ph
    srm
    volume
    ingredients {
      id
      amount
      timing
      item {
        id
        name
        data
        type
        image
        description
        origin {
          id
          name
        }
      }
    }
  }
`;
export const GET_RECIPE = gql`
  query Recipe($id: ID!) {
    recipe(id: $id) {
      ...RecipeFields
    }
  }
  ${RECIPE_FIELDS}
`;

export const GET_RECIPES = gql`
  {
    recipes {
      id
      name
      volume
      abv
      ibu
      brewDate
    }
  }
`;
