export interface BalanceSummaryRequest {
    accountNumber: string;
}

export interface TileModel {
    label?: string;
    amount?: number;
    currency?: string;
    icon?: string;
    money: any[];
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
export interface BillAccountSummary {
    transactionId: string;
    customerTransactionId: string;
    clientId: string;
    alerts: string;
    user?: UserModel;
    accountNumber: string;
    balanceSummaries: BalanceSummaryModel[];
}
export interface UserModel {
    name: string;
    countryCode: string;
    locale: string;
    accountsInfo: any[];
}
export interface AccountInfo {
    accountNumber: string;
    roleName: string;
}
export interface CurrencyModel {
    currency: string;
    amount: number;
}
export enum iconNames {
    unit_measurement_time ='',
    brand_stop_hold_s='',
    status_warning='',
}