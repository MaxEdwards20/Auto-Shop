export type Vehicle = {
  vin: string;
  name: string;
  vehicleType: string;
  imageURL: string;
  pricePerDay: number;
  isPurchased: boolean;
  id: number;
  purchasePrice: number;
};

export type ReservationInfo = {
  startDate: string;
  endDate: string;
  vehicle: number; // api returns the id of the vehicle
  autoUser: number; // api returns the id of the user
  amountDue: number;
  id: number;
};

export type UserCheckinInfo = {
  name: string;
  email: string;
  phone: string;
  upcomingReservations: ReservationInfo[];
};

export type UserPermission = "admin" | "user" | "employee" | "guest";

export type User = {
  name: string;
  permission: UserPermission;
  balance: number;
  needHelp: boolean;
  location: string;
  email: string;
  ethicsViolation: string;
  phoneNumber: string;
  reservations: ReservationInfo[];
  id: number;
  isAuthenticated: boolean;
};

export type UserWithReservation = {
  user: User;
  reservation: ReservationInfo;
};

export type usersDict = {
  users: UserWithReservation[];
};
