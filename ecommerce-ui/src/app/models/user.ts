export type User = {
  email: string;
  roles: string[];
};

export type UserAddress = {
  name: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};
