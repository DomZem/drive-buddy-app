export interface InstructorType {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  avatar: string;
  phone: string;
  email: string;
  password: string;
  licenses: string;
}

export interface CarType {
  id: string;
  mark: string;
  model: string;
  avatar: string;
  reviewDate: Date;
  yearProduction: string;
  fuel: string;
  vin: string;
  registration: string;
  courseCategory: string;
}

export interface StudentType {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  avatar: string;
  phone: string;
  email: string;
  password: string;
  courseCategory: string;
}

export interface LessonType {
  id: string;
  date: Date;
  avatar: string;
  instructorId: string;
  carId: string;
  courseCategory: string;
  studentsId: string[];
  lessonType: string;
  location: string;
}

export type ModalType = 'delete' | 'update-create';
