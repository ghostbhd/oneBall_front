import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(name: string, email: string, pass: string): Promise<User>;
    findUserByUn(username: string): Promise<User>;
    findUserById(id: number): Promise<User>;
    findAllUsers(): Promise<User[]>;
}
