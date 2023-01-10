import FileUploadResolver from "./resolvers/fileUpload.resolver";
import FileUploadTypeDefs from "./schemas/fileUpload.schema";
import { mergeTypeDefs } from '@graphql-tools/merge';
import { mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
const types = [FileUploadTypeDefs];
const allResolvers = [FileUploadResolver];

const resolvers = mergeResolvers(allResolvers);
const schemas =  mergeTypeDefs(types);

export const executableSchema = makeExecutableSchema({

    typeDefs: schemas,
    resolvers: {
        // Upload: GraphQLUpload,
        ...resolvers,
    },
});
