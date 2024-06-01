import axios, { AxiosHeaders } from 'axios';

export interface ResponseTransaction {
    error: number;
    message: string;
    data: DataTransaction;
}

export interface DataTransaction {
    page: number;
    pageSize: number;
    nextPage: number;
    prevPage: number;
    totalPages: number;
    totalRecords: number;
    records: RecordTransaction[];
}
export interface RecordTransaction {
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

type Filter = RegExp | string | (RegExp | string)[];

interface ApiOption {
    /**
     * @property a regex or string to filter transaction description (giao dịch)
     */
    filterTransaction?: Filter
    hideBankId: boolean
    /**
     * @property Date() constuctor expxress the date to filter transaction
     */
    dateTo: Date
    /**
     * @property new Date() constuctor express the date begin to filter transaction
     * @default dateFrom 7 days
     */
    dateFrom: Date
}


const TRANSACTIONS_URL = 'https://oauth.casso.vn/v2/transactions';
/**
 * A root class for calling api from casso.
 *
 */
export class BankApi {
    private apiOption: ApiOption = {
        hideBankId: false,
        dateTo: new Date(),
        dateFrom: new Date()
    };
    private header: AxiosHeaders = new AxiosHeaders();

    public constructor(apiKey: string) {
        this.header.set('Authorization', apiKey.startsWith('Apikey') ? apiKey : `Apikey ${apiKey}`);
        this.header.set('Content-Type', 'application/json');

        this.CheckToken().then((value) => {
            if (value) throw new Error("Unauthorized or Invalid token");
        });

    }
    public useConfig<K extends keyof ApiOption>(key: K, value: ApiOption[K]) {
        this.apiOption[key] = value;
    }

    private async CheckToken() {
        const value = await (this.getAllTransactions());
        return value.error != 0;
    }

    private async getAllTransactions() {
        const response = await axios.get(this.resolveTransactionUrl(), {
            headers: this.header,
        });
        const responseData = response.data as ResponseTransaction;

        const convertedResponse: ResponseTransaction = {
            error: responseData.error,
            message: responseData.message,
            data: responseData.data
        };

        return convertedResponse;
    }

    /**
     * 
     * @returns default response is all of transactions in months.
     */
    public async getTransaction() {
        const transactions = await this.getAllTransactions();
        const filters = this.apiOption.filterTransaction;
    
        if (filters) {
            transactions.data.records = transactions.data.records.filter((value) => {
                if (filters instanceof Array) {
                    return filters.some((filter) => value.description.match(filter));
                } else {
                    return value.description.match(filters);
                }
            });
        }
    
        if (this.apiOption.hideBankId) {
            transactions.data.records.forEach((value) => {
                value.accountId = 0;
                value.bankCodeName = "*****";
            });
        }
    
        return transactions;
    }
    

    public resolveTransactionUrl(): string {
        const result: string[] = [TRANSACTIONS_URL]

        if (this.apiOption.dateTo && this.apiOption.dateFrom) {
            result.push(`?fromDate=${this.apiOption.dateFrom.toISOString().split("T")[0]}`);
            result.push(`&toDate${this.apiOption.dateTo.toISOString().split("T")[0]}`)
        }

        return result.join("");
    }
    /**
     * A function to add filter to option.
     * @param filterOrFilters an array or a filter for query transaction.
     */
    public addFilter(filterOrFilters: Filter): void {
        if (!this.apiOption.filterTransaction) {
            this.apiOption.filterTransaction = [];
        }

        if (filterOrFilters instanceof Array && this.apiOption.filterTransaction instanceof Array) {
            for (const filter of filterOrFilters) {
                this.apiOption.filterTransaction.push(filter);
            }
        } else {
            this.apiOption.filterTransaction = filterOrFilters;
        }
    }
}
