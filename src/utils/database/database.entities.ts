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
  class_id: number; //Partial<Classes>; // foreign key
  class_time: number; // Partial<ClassAvailability>; // foreign key
  user_id: number; //Partial<Users>; // foreign key
  reservation_date: Date;
  status: string;
}

export class Users {
  id: number;
  name: string;
  role: Role;
  email: string;
  curr_credits: number;
  phone_number: string;
  auth_id: string;
}

export class Memberships {
  id: number;
  name: string;
  credits: number;
  price: number;
  payment_url: string;
  recommendation: string;
}
// export class Groups {
//   id: number;
//   title: string;
//   type: number;
//   class_id: number;
//   class_availability_id: number;
//   class_date: Date;
//   description: string;
//   limit: number;
// }
// export class GroupUsers {
//   id: number;
//   group_id: number;
//   user_id: number;
// }
// export class Messages {
//   id: number;
//   group_id: number;
//   sender_id: number;
//   message: string;
// }
