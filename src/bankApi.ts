import axios, { AxiosHeaders } from 'axios';

export interface TransactionResponse {
    error: number;
    message: string;
    data: Data;
}

interface Data {
    page: number;
    pageSize: number;
    nextPage: number;
    prevPage: number;
    totalPages: number;
    totalRecords: number;
    records: TransactionRecord[];
}
interface TransactionRecord {
    id: number;
    tid: string;
    description: string;
    amount: number;
    cusumBalance: null;
    when: Date;
    bookingDate: null;
    bankSubAccId: string;
    paymentChannel: string;
    virtualAccount: string;
    virtualAccountName: string;
    corresponsiveName: string;
    corresponsiveAccount: string;
    corresponsiveBankId: string;
    corresponsiveBankName: string;
    accountId: number;
    bankCodeName: string;
}


interface ApiOption {
    /**
     * @property a regex or string to filter transaction description (giao dịch)
     */
    filterTransaction?: RegExp | string
    hideBankId?: boolean
    /**
     * @property Date() constuctor expxress the date to filter transaction
     */
    dateTo?: Date
    /**
     * @property new Date() constuctor express the date begin to filter transaction
     * @default dateFrom 7 days
     */
    dateFrom?: Date
}

const TRANSACTIONS_URL = 'https://oauth.casso.vn/v2/transactions';

export class BankApi {
    private apiOption: ApiOption;
    private header: AxiosHeaders = new AxiosHeaders();

    public constructor(
        apiKey: string,
        option?: ApiOption
    ) {
        this.apiOption = option || {
            hideBankId: true,
        };

        this.header.set('Authorization', apiKey.startsWith('Apikey') ? apiKey : `Apikey ${apiKey}`);
        this.header.set('Content-Type', 'application/json');
    }

    public async getTransaction() {
        const response = await axios.get(this.resolveTransactionUrl(), {
            headers: this.header,
        });
        const responseData = response.data as TransactionResponse;

        if (!responseData) return null;

        const convertedResponse: TransactionResponse = {
            error: responseData.error,
            message: responseData.message,
            data: responseData.data
        };

        if (this.apiOption.filterTransaction) {
            convertedResponse.data.records = convertedResponse.data.records.filter((value) => {
                return value.description.match(this.apiOption.filterTransaction!)
            });
        }
        
        if (this.apiOption.hideBankId) {
            convertedResponse.data.records = convertedResponse.data.records.map((value) => {
                value.accountId = 0;
                value.bankCodeName = "*****";
                return value;
            })
        }
        return convertedResponse;
    }

    private resolveTransactionUrl(): string {
        const result: string[] = [TRANSACTIONS_URL]

        if (this.apiOption.dateTo && this.apiOption.dateFrom) {
            result.push(`?${this.apiOption.dateFrom.toISOString().split("T")[0]}`);
            result.push(`&${this.apiOption.dateTo.toISOString().split("T")[0]}`)
        }

        return result.join("");
    }

    public setOption(option: ApiOption) {
        this.apiOption = option;
    }
}