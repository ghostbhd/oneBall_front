import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../DTOS/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findUserById(id: string): Promise<User | undefined>;
    findAllUsers(): Promise<User[]>;
}
