import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    deleteUser(): Promise<void>;
    findAllUsers(req: any): Promise<User[]>;
}
