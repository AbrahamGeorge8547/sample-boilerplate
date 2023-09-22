import fastifyPlugin from 'fastify-plugin';
import swagger from '@fastify/swagger';

export default fastifyPlugin(async (fastify: any, opts: any, next: any) => {
  fastify.register(swagger, {
    routePrefix: '/docs',
    swagger: {
      info: { title: ' API', description: 'Testing the Fastify API', version: '0.1.0' },
      externalDocs: { url: 'https://swagger.io', description: 'Find more info here' },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        BearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          scheme: 'Bearer',
        },
      },
      security: [{ BearerAuth: [] }],
    },
    exposeRoute: true,
  });
  next();
});
