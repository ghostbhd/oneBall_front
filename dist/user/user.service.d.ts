import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(name: string, email: string, avatar: string): Promise<User>;
    saveUser(user: User): Promise<User>;
    findUserByUn(username: string): Promise<User>;
    deleteUser(): Promise<void>;
    findUserById(id: number): Promise<User>;
    findAllUsers(): Promise<User[]>;
}
