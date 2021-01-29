/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOdd = /* GraphQL */ `
  query GetOdd($id: ID!) {
    getOdd(id: $id) {
      id
      sportKey
      value
      siteKey
      createdAt
      updatedAt
    }
  }
`;
export const listOdds = /* GraphQL */ `
  query ListOdds(
    $filter: ModelOddFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOdds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sportKey
        value
        siteKey
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
