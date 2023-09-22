import fastify, { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import fastifyJwt, { FastifyJWTOptions } from '@fastify/jwt';
import swagger from './plugins/swagger';
import routes from './routes';
import fastifyMetrics from 'fastify-metrics';
import hyperid from 'hyperid';
import formBody from '@fastify/formbody';
import config from './config';

const instance = hyperid();

// TO-DO check env and set the logger
const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    }
  },
  genReqId: (req) => {
    return instance()
  }
}).withTypeProvider<TypeBoxTypeProvider>();
server.register(fastifyMetrics);
const swaggerOptions = {
  security: [
    {
      BearerAuth: [], // Define the BearerAuth security scheme
    },
  ],
};

// Register the Swagger plugin with the defined options
server.register(swagger);
server.register(formBody);
if (!config.jwt.privateKey) {
  throw new Error('Private key is not defined');
}

if (!config.jwt.publicKey) {
  throw new Error('Public key is not defined');
}
server.register(fastifyJwt as FastifyPluginAsync<FastifyJWTOptions>, {
  secret: {
    private: config.jwt.privateKey,
    public: config.jwt.publicKey
  },
  sign: {
    algorithm: "RS256"
  }
})

server.decorate('authenticate', async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    await req.jwtVerify();
  } catch (error) {
    reply.code(401).send({ error: 'Unauthorized' });
  }
})
for (const route of routes) {
  server.register(route);
}


export default server;