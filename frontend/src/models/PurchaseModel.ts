export interface PurchaseModel {
  id: number;
  identifier: string;
  paymentMethod: string;
  totalPrice: number;
  date: string;
  customerId: number;
  productsSells: {
    id: number;
    productId: number;
    sellId: number;
  }[]
  customerName: string;
  productsNames: string[];
}
