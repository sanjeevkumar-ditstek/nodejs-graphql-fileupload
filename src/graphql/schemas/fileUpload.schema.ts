const FileUploadTypeDefs = `
    scalar Upload
    type Query {
        uploads: [File]
    }

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    type Mutation {
        uploadFiles(params: FileUpload!): UploadStatus
    }
    input FileUpload {
        files: Upload!
    }
    type UploadStatus{
        url:String
    }

`;

export default FileUploadTypeDefs;