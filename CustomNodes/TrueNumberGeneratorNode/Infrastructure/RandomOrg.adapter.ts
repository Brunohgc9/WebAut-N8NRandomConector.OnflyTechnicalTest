import axios from "axios";

export class RandomOrgAdapter {
    async getRandomNumber(min: number, max: number): Promise<number> {
        const response = await axios.get("https://www.random.org/integers/", {
            params: {
                num: 1,
                min,
                max,
                col: 1,
                base: 10,
                format: "plain",
                rnd: "new",
            },
        });

        return parseInt(response.data, 10);
    }
}
