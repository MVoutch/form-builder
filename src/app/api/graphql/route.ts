import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from './typeDefs';
import { queries } from './resolvers/queries';
import { mutations } from './resolvers/mutations';
import { NextRequest } from 'next/server';

const resolvers = {
    Query: queries,
    Mutation: mutations,
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async (req) => ({ req }),
});

export async function GET(request: NextRequest) {
    return handler(request);
}

export async function POST(request: NextRequest) {
    return handler(request);
}