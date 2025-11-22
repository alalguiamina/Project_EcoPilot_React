// src/types/organisation.ts

export interface Site {
  id: number;
  name: string;
  location: string;
  surface: string;
}
export interface SiteGroup {
  id?: number;
  name: string;
  description: string;
  type: "Interne" | "Externe";
  siteId: number | "";
  members: number[];
}

export interface UserData {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  site: string;
  password?: string;
  role: string;
}
export interface NewUser {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  site: string;
  role: string;
}
