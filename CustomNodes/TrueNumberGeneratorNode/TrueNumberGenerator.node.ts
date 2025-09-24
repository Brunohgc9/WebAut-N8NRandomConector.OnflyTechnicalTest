import axios from "axios";
import type {
    INodeType,
    INodeTypeDescription,
    INodeExecutionData,
    IExecuteFunctions,
} from "n8n-workflow";

export class TrueNumberGenerator implements INodeType {
    description: INodeTypeDescription = {
        displayName: "Random",
        name: "random",
        icon: "file:./TrueNumberGenerator.icon.svg", // mantém o ícone do primeiro
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
                displayName: "Configurações",
                name: "settingsNotice",
                type: "notice",
                default: "",
                description:
                    "Informe os valores mínimo e máximo. O resultado será um número inteiro dentro do intervalo. Lembre-se: até Einstein confiava em probabilidade!",
            },
            {
                displayName: "Número Mínimo",
                name: "min",
                type: "number",
                typeOptions: {
                    minValue: -999999,
                },
                default: 1,
                description: "Valor mínimo possível (inclusivo). Ex: `1`",
                required: true,
                hint: "Escolha um número mínimo. Quanto mais baixo, mais emocionante a surpresa! 😉",
            },
            {
                displayName: "Número Máximo",
                name: "max",
                type: "number",
                typeOptions: {
                    minValue: -999999,
                },
                default: 60,
                description: "Valor máximo possível (inclusivo). Ex: `60`",
                required: true,
                hint: "Defina o valor máximo. Lembre-se: números altos não aumentam a sorte, só a expectativa! 😄",
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            const min = this.getNodeParameter("min", i) as number;
            const max = this.getNodeParameter("max", i) as number;

            try {
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

                returnData.push({
                    json: { randomNumber: parseInt(response.data, 10) },
                });
            } catch (error: any) {
                throw new Error(`Erro ao chamar Random.org: ${error.message || error}`);
            }
        }

        return this.prepareOutputData(returnData);
    }
}

module.exports = { TrueNumberGenerator };
module.exports.default = TrueNumberGenerator;
