import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import config from '../config';
import server from '../server';

const privateKey = String(config.jwt.privateKey);
const publicKey = String(config.jwt.publicKey);

const generateToken = (payload: object): string => {
    return server.jwt.sign(payload);
};

const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
        // logging userId to bind it with request id
        //@ts-ignore
        request.log.info(request.user.email)
    } catch (error) {
        // If token verification fails, return an error response
        return reply.status(401).send({ message: 'Invalid token' });
    }
};

export { generateToken, authenticate };