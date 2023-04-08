export interface InstructorType {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  avatar: string;
  phone: string;
  email: string;
  password: string;
  license: string;
}

export interface CarType {
  id: string;
  mark: string;
  model: string;
  avatar: string;
  // reviewDate: Date;
  yearProduction: number;
  fuel: string;
  vin: string;
  registration: string;
}

export type ModalType = 'delete' | 'update-create';
