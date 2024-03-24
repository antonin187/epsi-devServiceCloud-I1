import {
  WithId,
  Document,
  DeleteResult,
  UpdateResult,
  InsertOneResult,
} from "mongodb";
import { NextApiResponse } from "next";

// Classe d'erreur personnalisée qui me permet de n'avoir à gérer que le code
export class CustomError extends Error {
  code: number;

  constructor(code: number) {
    super("Error");
    this.code = code;
  }
}

export const ApiResponseManager = {
  respond: (
    code: number,
    res: NextApiResponse,
    dataElement?:
      | WithId<Document>
      | WithId<Document>[]
      | UpdateResult
      | Promise<DeleteResult>
      | InsertOneResult<Document>
      | Promise<WithId<Document> | undefined>
  ) => {

    // Gestionnaire de réponses HTTP en fonction du code

    switch (code) {
      case 200:
        res.status(200).json({
          status: 200,
          data: dataElement,
        });
        break;
      case 201:
        res.status(201).json({
          status: 201,
          data: dataElement,
        });
        break;
      case 204:
        res.status(204).json({
          status: 204,
          message: "Availability resource deleted.",
        });
        break;
      case 400:
        res.status(400).json({
          status: 400,
          message: "Bad Request",
          description: "The request cannot be fulfilled due to bad syntax.",
        });
        break;
      case 404:
        res.status(404).json({
          status: 404,
          message: "Not Found",
          description: "The requested resource could not be found.",
        });
        break;
      case 500:
        res.status(500).json({
          status: 500,
          message: "Internal Error",
          description:
            "An unexpected error occurred while processing the request.",
        });
        break;
      default:
        res.json({
          message: "Unknown error",
          description: "An unknow error occurred.",
        });
    }
  },
};
