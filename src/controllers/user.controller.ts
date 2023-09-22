import { FastifyRequest, FastifyReply, FastifyBaseLogger } from 'fastify';
import Logger from '../logger';
import { userBodySchema } from '../validators';
import { UserService } from '../service';
import { generateToken } from '../middlewares/auth.middleware';


class UserController extends Logger {
    private userService: UserService;

    constructor(logger: FastifyBaseLogger) {
        super(logger, '', 'UserController');
        this.userService = new UserService(logger);
    }

    async createUser(req: FastifyRequest<{ Body: typeof userBodySchema }>, res: FastifyReply) {
        this.functionName = 'createUser';
        this.entry();
        try {
            const { name, email } = req.body;
            await this.userService.createUser({ name, email });
            res.status(200).send({ token: generateToken(req.body), message: 'fetched token', sucess: true });
        } catch (error: any) {
            this.error(error, 'Creating user')
        }
        this.exit();
    }

    async getUser(req: FastifyRequest, res: FastifyReply) {
        this.functionName = 'getUser';
        this.entry();
        try {
            //@ts-ignore
            const user = req.user;
            console.log(user);
            res.status(200).send({ data: user, success: true });
        } catch (error) {

        }
    }
}

export default UserController;
