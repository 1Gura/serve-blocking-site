import {Injectable} from '@nestjs/common';
import {AccountDto, PatchAccountDto} from "./dto";
import {DbService} from "../db/db.service";

@Injectable()
export class AccountService {
    constructor(private readonly db: DbService) {
    }

    async getAccount(userId: number): Promise<AccountDto> {
        return await this.db.account.findFirstOrThrow({
            where: {ownerId: userId}
        })
    }

    async createAccount(userId: number): Promise<AccountDto> {
        return this.db.account.create({
            data: {
                ownerId: userId,
                isBlockingEnabled: false,
            }
        })
    }

    async patchAccount(userId: number, patchAccount: PatchAccountDto): Promise<AccountDto> {
        return await this.db.account.update({
            where: {ownerId: userId},
            data: {...patchAccount}
        })
    }
}
