export interface CustomerModel {
  id: number;
  name: string;
  phone?: string;
  purchaseCount: number;
  mostPurchasedProduct?: string;
  companyId: number;
}
