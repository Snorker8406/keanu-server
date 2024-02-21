export const typeDefs = `#graphql
  type Query {
    image (
      width: Int!, 
      height: Int!, 
      greyscale: Boolean!
      youngKeanu: Boolean!
      )
      : String
  }
`