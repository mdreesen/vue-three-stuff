import gql from 'graphql-tag'

export const COUNTRIES_QUERY = gql`
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`
