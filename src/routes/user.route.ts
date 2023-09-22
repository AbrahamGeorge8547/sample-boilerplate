import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from 'fastify';
import { Type } from '@sinclair/typebox';
import { userBodySchema } from '../validators';
import { UserController } from '../controllers';
import server from '../server';
import { authenticate } from '../middlewares/auth.middleware';

export default function (fastify: FastifyInstance, opts: FastifyPluginOptions, done: Function) {
  fastify.route({
    method: 'POST',
    url: '/user',
    schema: {
      tags: ['User'],
      summary: 'Create a user',
      description: 'Create a new user with authentication',
      body: userBodySchema,
      response: {
        200: Type.Object({ message: Type.String(), token: Type.String() }),
      },
    },
    handler: async (req: FastifyRequest<{ Body: typeof userBodySchema }>, res) => {
      const userController = new UserController(req.log);
      await userController.createUser(req, res);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/user',
    schema: {
      tags: ['User'],
      security: [{ BearerAuth: [] }],
      summary: 'Get User',
      description: 'Get user with auth token',
      response: {
        200: Type.Object({
          success: Type.Boolean(), data: Type.Object({
            name: Type.String(),
            email: Type.String()
          })
        })
      }
    },
    preHandler: authenticate,
    handler: async (req: FastifyRequest, res) => {
      const userController = new UserController(req.log);
      await userController.getUser(req, res);
    }
  })

  done();
}
