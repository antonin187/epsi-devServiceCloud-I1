import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";
import { OrmService } from "../../../../services/OrmService";
import { MongoConfigService } from "../../../../services/MongoConfigServices";
import { ApiResponseManager } from "../../../../services/ApiResponseManager";

interface RequestWithQuery extends NextApiRequest {
  query: {
    idMovie: string;
  };
}

/**
 * @swagger
 * /api/movie/{idMovie}/comments:
 *   get:
 *     tags:
 *       - Comments
 *     description: Return all comments for a specific movie
 *     parameters:
 *       - name: idMovie
 *         in: path
 *         description: id of the movie to which the comments are attached.
 *         required: true
 *         schema:
 *           type: string
 *           format: string
 *     responses:
 *       200:
 *         description: successful operation
 *         content :
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Internal Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/Error500'
 *   post:
 *     tags:
 *       - Comments
 *     description: Add a new comment
 *     parameters:
 *       - name: idMovie
 *         in: path
 *         description: id of the film to which the comments are attached.
 *         required: true
 *         schema:
 *           type: string
 *           format: string
 *     requestBody:
 *       description: Create a new comment for a movie.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer,
 *                   example: 201
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/Error400'
 *       500:
 *         description: Internal Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/Error500'
 */
export default async function handler(
  req: RequestWithQuery,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const { idMovie } = req.query;
  const bodyParam = req.body;

  switch (req.method) {
    case "GET":
      try {
        const comments = await OrmService.connectAndFind(
          MongoConfigService.collections.comments,
          idMovie
        );
        ApiResponseManager.respond(200, res, comments);
      } catch (error: any) {
        ApiResponseManager.respond(error.code, res);
      }
      break;
    case "POST":
      try {
        bodyParam.movie_id = new ObjectId(idMovie);
        bodyParam.date = new Date();
        const newComment = await OrmService.connectAndPostOne(
          MongoConfigService.collections.comments,
          bodyParam
        );
        ApiResponseManager.respond(201, res, newComment);
      } catch (error: any) {
        ApiResponseManager.respond(error.code, res);
      }
      break;

    default:
      ApiResponseManager.respond(500, res);
      break;
  }
}
