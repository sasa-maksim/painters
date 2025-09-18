export enum AccountType {
  PAINTER = "PAINTER",
  CUSTOMER = "CUSTOMER"
}

export type Profile = {
  id: string;
  user_id: string;
};

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  painter_profile: Profile | null;
  customer_profile: Profile | null;
  created_at: string;
  updated_at: string;
};
