export interface BalanceSummaryRequest {
    accountNumber: string;
}

export interface TileModel {
    label: string;
    amount: number;
    currency: string;
    icon: string;
}
export interface BalanceSummaryModel {
    countryCode: string;
    amountType: string;
    money: Money;
}
export interface Money {
    amount: number;
    currency: string;
}
export interface AccountInfo {
    transactionId: string;
    customerTransactionId: string;
    clientId: string;
    alerts: string;
    user: UserModel;
    accountNumber: string;
    balanceSummaries: BalanceSummaryModel[];
}
export interface UserModel {
    name: string;
    countryCode: string;
    locale: string;
    accountsInfo: any[];
}