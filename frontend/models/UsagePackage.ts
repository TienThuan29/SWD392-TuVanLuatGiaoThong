export type UsagePackage = {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  dailyLimit?: number;
  daysLimit?: number;
  isDeleted?: boolean;
  createdDate?: string;
  updatedDate?: string;
};


export type UserPackage = {
  userId?: string;
  packageId?: string;
  transactionData?: string;
  price?: number;
}