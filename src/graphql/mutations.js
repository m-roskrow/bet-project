/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOdd = /* GraphQL */ `
  mutation CreateOdd(
    $input: CreateOddInput!
    $condition: ModelOddConditionInput
  ) {
    createOdd(input: $input, condition: $condition) {
      id
      sportKey
      value
      siteKey
      createdAt
      updatedAt
    }
  }
`;
export const updateOdd = /* GraphQL */ `
  mutation UpdateOdd(
    $input: UpdateOddInput!
    $condition: ModelOddConditionInput
  ) {
    updateOdd(input: $input, condition: $condition) {
      id
      sportKey
      value
      siteKey
      createdAt
      updatedAt
    }
  }
`;
export const deleteOdd = /* GraphQL */ `
  mutation DeleteOdd(
    $input: DeleteOddInput!
    $condition: ModelOddConditionInput
  ) {
    deleteOdd(input: $input, condition: $condition) {
      id
      sportKey
      value
      siteKey
      createdAt
      updatedAt
    }
  }
`;
