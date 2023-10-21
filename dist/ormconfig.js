"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin123',
    database: 'database',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
};
//# sourceMappingURL=ormconfig.js.map