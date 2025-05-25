export type UsagePackage = {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  daily_limit?: number;
  days_limit?: number;
  is_deleted?: boolean;
  created_date?: Date;
  updated_date?: Date;
};

export type UserPackage = {
  userId?: string;
  packageId?: string;
  transactionData?: string;
  price?: number;
}