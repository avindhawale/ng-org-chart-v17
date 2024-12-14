export interface Employee {
  id: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
  manager: string | null; // Null for the top-level employee
}
