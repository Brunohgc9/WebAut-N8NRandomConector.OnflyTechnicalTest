export class MinMaxNumber {
    constructor(public readonly min: number, public readonly max: number) {
        if (min > max) {
            throw new Error("O valor mínimo não pode ser maior que o máximo.");
        }
    }
}
