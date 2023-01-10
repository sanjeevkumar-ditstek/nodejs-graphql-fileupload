import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { executableSchema as schema } from "./graphql/graphql";
import { json } from "body-parser";
import { graphqlUploadExpress } from "graphql-upload-minimal";

export default class App {
  public app: Application;
  public port:number;

  constructor(){
    this.app = express();
    this.port = 4040;
    this.initializeMiddlewares();
    this.initializeApollo();
    
  }

  cors (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  }

private initializeMiddlewares() {
    this.app.use("/uploads", express.static(process.cwd() + "/uploads"));
    this.app.use(graphqlUploadExpress());
    this.app.use(this.cors);
    this.app.use(json());
}

private initializeApollo() {
  const server = new ApolloServer({
      schema,
      context: (req) => ({
          req: req.req,
          res: req.res,
      }),
  });

  this.app.get("/", (_, res) => {
      res.status(200).send("OK");
  });
  server.start().then(res => {
    server.applyMiddleware({ app: this.app });
   });

  }

public listen() {
  this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
  });
}
}

new App().listen();