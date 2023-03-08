export type Vehicle = {
  vin: string;
  name: string;
  vehicleType: string;
  imageURL: string;
  pricePerDay: number;
  isPurchased?: boolean;
  id: number;
};

export type ReservationInfo = {
  startDate: string;
  endDate: string;
  vehicle: string;
  amountDue: number;
  id: number;
  autoUser?: number;
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
  id: number; // only get id after creating the user
};
