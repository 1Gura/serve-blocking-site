import {Injectable} from '@nestjs/common';
import {DbService} from "../db/db.service";
import {AccountService} from "../account/account.service";
import {BlockListService} from "../block-list/block-list.service";

@Injectable()
export class UsersService {
    constructor(
        private db: DbService,
        private accountService: AccountService,
        private blockListService: BlockListService) {
    }


    async findUserByEmail(email: string) {
        return await this.db.user.findFirst({where: {email}});
    }

    async createUser(email: string, hash: string, salt: string) {
        const user = await this.db.user.create({data: {email, hash, salt}});
        await this.accountService.createAccount(user.id);
        await this.blockListService.create(user.id);

        return await user;
    }

}

