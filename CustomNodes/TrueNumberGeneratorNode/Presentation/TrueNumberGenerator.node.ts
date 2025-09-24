import type {
    INodeType,
    INodeTypeDescription,
    INodeExecutionData,
    IExecuteFunctions
} from "n8n-workflow";

import { MinMaxNumber } from "../Domain/MinMaxNumber.entity";
import { TrueNumberGeneratorService } from "../Application/TrueNumberGenerator.service";

export class TrueNumberGenerator implements INodeType {
    description: INodeTypeDescription = {
        displayName: "Random",
        name: "random",
        icon: 'file:./TrueNumberGenerator.icon.svg',
        group: ["transform"],
        version: 1,
        description:
            "Gere números aleatórios reais usando a API do Random.org. Ideal para sorteios, testes e fluxos que precisam de valores imprevisíveis. Porque confiar na sorte é para os corajosos (ou desesperados)!",
        defaults: {
            name: "Número Aleatório",
            color: "#f2c94c",
        },
        inputs: ["main"],
        outputs: ["main"],
        properties: [
            {
                displayName: "Operação",
                name: "operation",
                type: "options",
                noDataExpression: true,
                description:
                    "Informe os valores mínimo e máximo. O resultado será um número inteiro dentro do intervalo.",
                options: [
                    {
                        name: 'True Random Number Generator',
                        value: 'generate',
                        action: 'Gere um número aleatório real',
                    },
                ],
                default: 'generate',
            },
            {
                displayName: "Min (Número Mínimo)",
                name: "min",
                type: "number",
                typeOptions: {
                    minValue: -999999,
                },
                default: 1,
                description: "Valor mínimo possível (inclusivo). Ex: `1`",
                required: true,
                displayOptions: {
                    show: {
                        operation: ['generate'],
                    },
                },
                hint: "Escolha um número mínimo. Quanto mais baixo, mais emocionante a surpresa! 😉",
            },
            {
                displayName: "Max (Número Máximo)",
                name: "max",
                type: "number",
                typeOptions: {
                    minValue: -999999,
                },
                default: 60,
                description: "Valor máximo possível (inclusivo). Ex: `60`",
                required: true,
                displayOptions: {
                    show: {
                        operation: ['generate'],
                    },
                },
                hint: "Defina o valor máximo. Lembre-se: números altos não aumentam a sorte, só a expectativa! 😄",
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];
        const service = new TrueNumberGeneratorService();

        for (let i = 0; i < items.length; i++) {
            const min = this.getNodeParameter("min", i) as number;
            const max = this.getNodeParameter("max", i) as number;

            if (min > max) {
                throw new Error(`O valor mínimo (${min}) não pode ser maior que o máximo (${max}).`);
            }

            const range = new MinMaxNumber(min, max);
            const randomNumber = await service.generate(range);

            returnData.push({ json: { randomNumber } });
        }

        return this.prepareOutputData(returnData);
    }
}

// Exportação compatível com CommonJS e ES Modules
module.exports = { TrueNumberGenerator };
module.exports.default = TrueNumberGenerator;
