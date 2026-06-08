export interface User {
  id: number;
  name: string;
  email: string;
  accessToken?: string;
  tokenType?: string;
  role?: string;
  userId?: string;
  tenantId?: string;
  permissions?: string[];
}
