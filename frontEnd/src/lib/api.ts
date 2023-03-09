import { CreateUserBody, LoginUserBody } from "../dto/apiTypes";
import { getToken, setTokenToLocalStorage } from "../hooks/miscFunctions";
import {
  ReservationInfo,
  User,
  usersDict as UsersDict,
  UserWithReservation,
  Vehicle,
} from "../types/DataTypes";
type Method = "get" | "post" | "put" | "del";

export class Api {
  private token = "";
  private baseUrl = "http://localhost:8000";

  constructor() {
    const token = getToken();
    if (token) {
      this.token = token;
    }
  }

  private async makeRequest(
    path: string,
    method: Method,
    body: Record<string, any> = {}
  ) {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };

    if (method === "post" || method === "put") {
      options.body = JSON.stringify(body);
    }

    const result = await fetch(`${this.baseUrl}/${path}`, options);
    return result.json();
  }

  get(path: string) {
    return this.makeRequest(path, "get");
  }

  post(path: string, body: Record<string, any>) {
    return this.makeRequest(path, "post", body);
  }

  put(path: string, body: Record<string, any>) {
    return this.makeRequest(path, "put", body);
  }

  del(path: string) {
    return this.makeRequest(path, "del");
  }

  setToken(token: string) {
    if (!token) return;
    this.token = token;
    setTokenToLocalStorage(token);
  }

  createUser(body: CreateUserBody): Promise<User> {
    return this.post("user", body).then((res) => {
      this.setToken(res.token);
      return res.user;
    });
  }

  loginUser(body: LoginUserBody): Promise<User> {
    return this.post("user/login", body).then((res) => {
      this.setToken(res.token);
      if (!res?.user) return null;
      if (res.reservations) {
        res.user.reservations = res.reservations;
      }
      return res.user;
    });
  }

  getUser(id: number): Promise<User | null> {
    return this.get(`user/${id}`).then((res) => {
      if (!res?.user) return null;
      this.setToken(res.token);

      res.user.reservations = res.reservations;
      return res.user;
    });
  }

  getUserReservations(id: number): Promise<ReservationInfo[] | null> {
    return this.get(`user/${id}`).then((res) => {
      if (!res?.reservations) return null;
      this.setToken(res.token);
      return res.reservations;
    });
  }

  addMoneyToUser(id: number, amount: number): Promise<User | null> {
    return this.post(`user/${id}/addMoney`, { amount }).then((res) => {
      if (!res?.user) return null;
      this.setToken(res.token);
      return res.user;
    });
  }

  removeMoneyFromUser(id: number, amount: number): Promise<User | null> {
    return this.post(`user/${id}/removeMoney`, { amount }).then((res) => {
      if (!res?.user) return null;
      this.setToken(res.token);
      return res.user;
    });
  }

  purchaseVehicle(vehicleID: number, userID: number): Promise<Vehicle | null> {
    return this.post(`vehicle/${vehicleID}/purchase`, { userID }).then(
      (res) => {
        if (!res?.vehicle) return null;
        this.setToken(res.token);
        return res.vehicle;
      }
    );
  }

  getAvailableVehicles(
    startDate: Date | undefined,
    endDate: Date | undefined
  ): Promise<[Vehicle] | null> {
    return this.post("vehicle/available", { startDate, endDate }).then(
      (res) => {
        if (!res?.vehicles) return null;
        this.setToken(res.token);
        return res.vehicles;
      }
    );
  }

  getAllVehicles(): Promise<Vehicle[] | null> {
    return this.get("vehicle/all").then((res) => {
      if (!res?.vehicles) return null;
      this.setToken(res.token);
      return res.vehicles;
    });
  }

  getAllUsers(userID: number): Promise<UserWithReservation[] | null> {
    return this.get(`user/${userID}/all`).then((res) => {
      if (!res?.users) return null;
      this.setToken(res.token);
      return res.users;
    });
  }

  getVehicle(id: number): Promise<Vehicle | null> {
    return this.get(`vehicle/${id}`).then((res) => {
      console.log(res);
      if (!res?.vehicle) return null;
      this.setToken(res.token);
      return res.vehicle;
    });
  }

  createReservation(
    userID: number,
    vehicleID: number,
    startDate: Date,
    endDate: Date
  ): Promise<ReservationInfo | null> {
    return this.post(`reservation`, {
      vehicleID,
      startDate,
      endDate,
      userID,
    }).then((res) => {
      if (!res?.reservation) return null;
      return res.reservation;
    });
  }

  initializeDatabase(): Promise<User | null> {
    return this.post("manager/init", {}).then((res) => {
      if (!res?.user) return null;
      return res.user;
    });
  }

  getManager(): Promise<User | null> {
    return this.get("manager").then((res) => {
      if (!res?.user) return null;
      return res.user;
    });
  }

  updateUserPermission(
    userID: number,
    permission: string
  ): Promise<User | null> {
    return this.post(`user/${userID}/permission`, { permission }).then(
      (res) => {
        if (!res?.user) return null;
        return res.user;
      }
    );
  }
}
