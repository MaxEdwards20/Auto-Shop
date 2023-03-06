import { UserPermission } from "../types/DataTypes";

export type LoginUserBody = {
  email: string;
  password: string;
};

export type CreateUserBody = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export type UpdateUserBody = {};

export type CreateVehicleBody = {};

export type CreateReservationBody = {};
