## The node.js example app for File Upload with typescript and graphql

[![CircleCI](https://img.shields.io/circleci/project/github/contentful/the-example-app.nodejs.svg)](https://circleci.com/gh/contentful/the-example-app.nodejs)

The node.js example app teaches the very basics of how to work with file upload using graphql and apollo server express

## Requirements

* Node 16

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/sanjeevkumar-ditstek/nodejs-graphql-fileupload.git
cd nodejs-graphql-fileupload
```

```bash
npm install
```

## Steps to start the application

To start the express server, run the following

```bash
npm run start
```

Open [http://localhost:4040](http://localhost:4040) and take a look around.


## Hit Api using Postman
You can test the API using the postman:

Request Url(POST):
```bash
http://localhost:4040/graphql
```
Switch to form-data

## Key-value pairs
* Key "operations" 
* value  
```bash
{"query":"mutation uploadFiles($params:FileUpload!) {\n  uploadFiles(params: $params){url}\n }","variables":{"params":{"files":null}}}
```

* Key "map"
* value
```bash
{"0": ["variables.params.files"]}
```

* Kay "0" -- value will be file which we want to upload
