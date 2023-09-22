import { FastifyBaseLogger } from 'fastify';
import { IUser } from '../database/interfaces';
import { User } from '../database/models';
import Logger from '../logger';

class UserService extends Logger {
    constructor(logger: FastifyBaseLogger) {
        super(logger, '', 'UserService');
    }

    async createUser(user: Partial<IUser>) {
        this.functionName = 'createUser';
        this.entry();
        this.info('Creating new user');
        await User.create({
            name: user.name,
            email: user.email
        })
        this.exit();
    }
}

export default UserService;
