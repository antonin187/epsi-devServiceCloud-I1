import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../../lib/mongodb";
import { OrmService } from "../../../../../services/OrmService";
import { MongoConfigService } from "../../../../../services/MongoConfigServices";
import { ObjectId } from "mongodb";
import { ApiResponseManager } from "../../../../../services/ApiResponseManager";

interface RequestWithQuery extends NextApiRequest {
  query: {
    idMovie: string;
    idComment: string;
  };
}

/**
 * @swagger
 * tags:
 *   - name: Comment
 *     description: Operations related to comments
 * /api/movie/{idMovie}/comment/{idComment}:
 *   get:
 *     tags:
 *       - Comments
 *     description: Returns a comment by its id
 *     parameters:
 *       - name: idMovie
 *         in: path
 *         description: id of the movie to find
 *         required: false
 *         schema:
 *           type: string
 *           format: string
 *       - name: idComment
 *         in: path
 *         description: id of the comment to find
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
 *                   type: object
 *                   $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/Error404'
 *       500:
 *         description: Internal Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/Error500'
 *   put:
 *     tags:
 *       - Comments
 *     description: Update a comment
 *     parameters:
 *       - name: idMovie
 *         in: path
 *         description: id of the movie to find
 *         required: false
 *         schema:
 *           type: string
 *           format: string
 *       - name: idComment
 *         in: path
 *         description: id of the comment to update
 *         required: true
 *         schema:
 *           type: string
 *           format: string
 *     requestBody:
 *       description: Update a specific comment
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/Error404'
 *       500:
 *         description: Internal Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/Error500'
 *   delete:
 *     tags:
 *       - Comments
 *     description: Delete a comment
 *     parameters:
 *       - name: idMovie
 *         in: path
 *         description: id of the movie to find
 *         required: false
 *         schema:
 *           type: string
 *           format: string
 *       - name: idComment
 *         in: path
 *         description: id of the comment to delete
 *         required: true
 *         schema:
 *           type: string
 *           format: string
 *     responses:
 *       204:
 *         description: Availability resource deleted.
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/Error404'
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
  const { idMovie, idComment } = req.query;
  const bodyParam = req.body;

  switch (req.method) {
    case "GET":
      try {
        const comment = await OrmService.connectAndFindOne(
          MongoConfigService.collections.comments,
          idComment,
          idMovie
        );
        ApiResponseManager.respond(200, res, comment);
      } catch (error: any) {
        ApiResponseManager.respond(error.code, res);
      }
      break;
    case "PUT":
      try {
        await OrmService.connectAndFindOne(
          MongoConfigService.collections.comments,
          idComment
        );

        bodyParam.movie_id = new ObjectId(idMovie);
        const commentToUpdate = await OrmService.connectAndUpdateOne(
          MongoConfigService.collections.comments,
          bodyParam,
          idComment
        );

        ApiResponseManager.respond(200, res, commentToUpdate);
      } catch (error: any) {
        ApiResponseManager.respond(error.code, res);
      }
      break;

    case "DELETE":
      try {
        await OrmService.connectAndDeleteOne(
          MongoConfigService.collections.comments,
          idComment
        );
        ApiResponseManager.respond(204, res);
      } catch (error: any) {
        ApiResponseManager.respond(error.code, res);
      }
      break;

    default:
      ApiResponseManager.respond(500, res);
      break;
  }
}
