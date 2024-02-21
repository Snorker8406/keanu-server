import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import axios from 'axios'

export async function fetchKeanuImage(width: number, height: number, greyscale: boolean, youngKeanu: boolean): Promise<string> {
  try {
    const greyscaleParam = greyscale ? 'g' : ''
    const youngKeanuParam = youngKeanu ? 'y' : ''
    const response = await axios.get(`https://placekeanu.com/${width}/${height}/${greyscaleParam}${youngKeanuParam}`, {
      responseType: 'arraybuffer',
    })
    const responseString = response.data.toString();
    return responseString
  } catch (error) {
    throw new Error(`Failed to fetch Keanu image: ${error}`)
  }
}

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

const resolvers: any = {
  Query: {
    image: async (_: any, { width, height, greyscale, youngKeanu }: any) => {
      try {
        const imageUrl = await fetchKeanuImage(width, height, greyscale, youngKeanu)
        return imageUrl
      } catch (error) {
        throw new Error(`Failed to fetch image: ${error}`)
      }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
})

console.log(`Server running at: ${url}`)