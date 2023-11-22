export interface ProductModel {
  id: number;
  name: string;
  price: number;
  category: string;
  companyId: number;
  reference?: string;
  ncm?: string;
  color?: string;
  size?: string;
}
