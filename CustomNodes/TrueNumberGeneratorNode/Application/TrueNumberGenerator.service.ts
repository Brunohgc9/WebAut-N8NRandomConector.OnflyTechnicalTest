import { MinMaxNumber } from "../Domain/MinMaxNumber.entity";
import { RandomOrgAdapter } from "../Infrastructure/RandomOrg.adapter";

export class TrueNumberGeneratorService {
    private adapter: RandomOrgAdapter;

    constructor() {
        this.adapter = new RandomOrgAdapter();
    }

    async generate(range: MinMaxNumber): Promise<number> {
        return this.adapter.getRandomNumber(range.min, range.max);
    }
}
