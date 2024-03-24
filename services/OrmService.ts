import { ObjectId } from "mongodb";
import clientPromise from "../lib/mongodb";
import { MongoConfigService } from "./MongoConfigServices";
import { ApiResponseManager, CustomError } from "./ApiResponseManager";
import { FormatValidator } from "../utils/FormatValidator";

// On passe par une fonction pour avoir une connexion à la BDD ponctuelle à l'instanciation de la fonction
const connectToDb = async () => {
  const client = await clientPromise;
  return await client.db(MongoConfigService.databases.mflix);
};

export const OrmService = {
  connectAndFind: async (collectionName: string, optionalIdMovie?: string) => {
    const db = await connectToDb();

    // On vérifie si on reçoit un idMovie en paramètres pour adapter notre requête à la BDD
    if (optionalIdMovie === undefined) {
      return await db.collection(collectionName).find({}).limit(15).toArray();
    } else {
      // Pour les commentaires
      const comments = await db
        .collection(collectionName)
        .find({ movie_id: new ObjectId(optionalIdMovie) })
        .toArray();

      if (comments.length === 0) {
        // Si aucun film n'est renvoyé, c'est que la ressource n'existe pas
        throw new CustomError(404);
      } else {
        return comments;
      }
    }
  },

  connectAndFindOne: async (
    collectionName: string,
    idObjectToFind: string,
    optionalIdMovie?: string
  ) => {
    const db = await connectToDb();
    var elementToFind;

    if (optionalIdMovie === undefined) {
      elementToFind = await db
        .collection(collectionName)
        .findOne({ _id: new ObjectId(idObjectToFind) });
    } else {
      elementToFind = await db.collection(collectionName).findOne({
        _id: new ObjectId(idObjectToFind),
        movie_id: new ObjectId(optionalIdMovie),
      });
    }
    if (elementToFind !== null) {
      return elementToFind;
    } else {
      throw new CustomError(404);
    }
  },

  connectAndPostOne: async (collectionName: string, objectToInsert: object) => {
    const db = await connectToDb();

    // Si le format du json dans notre body de requête ne convient pas, on renvoie un erreur "Invalid input"
    if (!FormatValidator.hasAllGoodProperties(objectToInsert, collectionName)) {
      throw new CustomError(400);
    }

    const newDocument = await db
      .collection(collectionName)
      .insertOne(objectToInsert);

    if (newDocument.insertedId) {
      const newDocumentInserted = await OrmService.connectAndFindOne(
        collectionName,
        newDocument.insertedId.toString()
      );
      return newDocumentInserted;
    }
  },

  connectAndUpdateOne: async (
    collectionName: string,
    bodyParam: any,
    idObjectToUpdate: string
  ) => {
    const db = await connectToDb();

    const updateParams: { [key: string]: any } = {};

    Object.keys(bodyParam).forEach((key) => {
      if (bodyParam[key] !== undefined) {
        updateParams[key] = bodyParam[key];
      }
    });

    const documentToUpdate = await db
      .collection(collectionName)
      .updateOne(
        { _id: new ObjectId(idObjectToUpdate) },
        { $set: updateParams }
      );

    return await OrmService.connectAndFindOne(collectionName, idObjectToUpdate);
  },

  connectAndDeleteOne: async (
    collectionName: string,
    idObjectToDelete: string
  ) => {
    const db = await connectToDb();
    const documentToDelete = await db
      .collection(collectionName)
      .deleteOne({ _id: new ObjectId(idObjectToDelete) });

    if (documentToDelete.deletedCount === 0) {
      throw new CustomError(404);
    }
  },
};
