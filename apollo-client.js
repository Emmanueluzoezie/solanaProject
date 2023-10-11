import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: `https://councilbluffs.stepzen.net/api/terrific-buffoon/__graphql`,
    headers: { 'Authorization': `apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}` },
    cache: new InMemoryCache(),
});

export default client;