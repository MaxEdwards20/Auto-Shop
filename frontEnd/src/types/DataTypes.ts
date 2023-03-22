export type Vehicle = {
  vin: string;
  name: string;
  vehicleType: string;
  imageURL: string;
  pricePerDay: number;
  isPurchased: boolean;
  id: number;
  purchasePrice: number;
  isLoadJacked: boolean;
};

export type Reservation = {
  startDate: string;
  endDate: string;
  vehicle: number; // api returns the id of the vehicle
  autoUser: number; // api returns the id of the user
  amountDue: number;
  id: number;
  isInsured: boolean;
  isCheckedOut: boolean;
};

export type UserCheckinInfo = {
  name: string;
  email: string;
  phone: string;
  upcomingReservations: Reservation[];
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
  reservations: Reservation[];
  id: number;
  isAuthenticated: boolean;
  hoursOwed: number;
  wage: number;
};

export type UserWithReservation = {
  user: User;
  reservations: Reservation;
};
