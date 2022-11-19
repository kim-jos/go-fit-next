import { Role } from "../role.enum";

export class Classes {
  id: number;
  name: string;
  description: string;
  exercise_type: string;
  image: string;
  duration: string;
  requirements: string;
  address: string;
  credits_required: number;
  instagram: string;
  website: string;
  distance: string;
  misc: string;
  priority: number;
  hide_class: boolean;
}

export class ClassAvailability {
  id: number;
  class_id: Partial<Classes>; // foreign key
  weekday: number; // weekday enum
  time: Date;
  info: string;
}

export class ReservationTransactions {
  id: number;
  class_id: Partial<Classes>; // foreign key
  class_time: Partial<ClassAvailability>; // foreign key
  user_id: Partial<Users>; // foreign key
  reservation_date: Date;
}

export class Users {
  id: number;
  name: string;
  role: Role;
  email: string;
  curr_credits: number;
  phone_number: string;
}

export class Memberships {
  id: number;
  name: string;
  credits: number;
  price: number;
  payment_url: string;
  recommendation: string;
}
