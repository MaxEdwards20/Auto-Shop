import { CreateUserBody, LoginUserBody } from "../dto/apiTypes";
import { getToken, setTokenToLocalStorage } from "../hooks/miscFunctions";
import {
  Reservation,
  User,
  UserWithReservation,
  Vehicle,
} from "../types/DataTypes";
type Method = "get" | "post" | "put" | "delete";

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
    return this.makeRequest(path, "delete");
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

  getUserReservations(id: number): Promise<Reservation[] | null> {
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

  // Same endpoint as addMoneyToUser but we give it the manager's specific id from the initialzed value
  addMoneyToManager(managerID: number, amount: number): Promise<User | null> {
    return this.post(`user/${managerID}/addMoney`, { amount }).then((res) => {
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

  removeMoneyFromManager(
    managerID: number,
    amount: number
  ): Promise<User | null> {
    return this.post(`user/${managerID}/removeMoney`, { amount }).then(
      (res) => {
        if (!res?.user) return null;
        this.setToken(res.token);
        return res.user;
      }
    );
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

  sellVehicle(vehicleID: number, userID: number): Promise<Vehicle | null> {
    return this.post(`vehicle/${vehicleID}/sell`, { userID }).then((res) => {
      if (!res?.vehicle) return null;
      this.setToken(res.token);
      return res.vehicle;
    });
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

  getAllVehicles(): Promise<Vehicle[]> {
    return this.get("vehicle/all").then((res) => {
      this.setToken(res.token);
      return res.vehicles;
    });
  }

  getPurchasedVehicles(): Promise<Vehicle[] | null> {
    return this.get("vehicle/all/purchased").then((res) => {
      if (!res?.vehicles) return null;
      this.setToken(res.token);
      return res.vehicles;
    });
  }

  getVehicle(id: number): Promise<Vehicle> {
    return this.get(`vehicle/${id}`).then((res) => {
      console.log(res);
      if (!res?.vehicle) return null;
      this.setToken(res.token);
      return res.vehicle;
    });
  }

  getAllUsers(userID: number): Promise<UserWithReservation[]> {
    return this.get(`user/${userID}/all`).then((res) => {
      if (!res?.users) return null;
      this.setToken(res.token);
      return res.users;
    });
  }

  lowJackVehicle(vehicleID: number, isLoadJacked: boolean): Promise<Vehicle> {
    return this.post(`vehicle/${vehicleID}/low-jack`, {
      isLoadJacked,
    }).then((res) => {
      if (!res?.vehicle) console.error("Problem low jacking the vehicle");
      this.setToken(res.token);
      return res.vehicle;
    });
  }

  createReservation(
    userID: number,
    vehicleID: number,
    startDate: Date,
    endDate: Date,
    isInsured: boolean
  ): Promise<Reservation | null> {
    return this.post(`reservation`, {
      vehicleID,
      startDate,
      endDate,
      userID,
      isInsured,
    }).then((res) => {
      if (!res?.reservation) return null;
      return res.reservation;
    });
  }

  deleteReservation(reservation: Reservation): Promise<Reservation> {
    return this.del(`reservation/${reservation.id}`).then((res) => {
      if (!res.success) {
        console.error("Problem deleting the reservation");
      }
      return res.reservation;
    });
  }

  getAllReservations(): Promise<Reservation[]> {
    return this.get("reservation/all").then((res) => {
      if (!res?.reservations) console.error("Problem getting all reservations");
      return res.reservations;
    });
  }

  getCheckedInReservations(): Promise<Reservation[]> {
    return this.get("reservation/checked-in").then((res) => {
      if (!res?.reservations)
        console.error("Problem getting checked in reservations");
      return res.reservations;
    });
  }

  getCheckedOutReservations(): Promise<Reservation[]> {
    return this.get("reservation/checked-out").then((res) => {
      if (!res?.reservations)
        console.error("Problem getting checked out reservations");
      return res.reservations;
    });
  }

  checkInReservation(reservation: Reservation): Promise<Reservation> {
    return this.post(`reservation/${reservation.id}/check-in`, {}).then(
      (res) => {
        if (!res?.reservation) console.error("Problem checking in reservation");
        return res.reservation;
      }
    );
  }

  checkOutReservation(reservation: Reservation): Promise<Reservation> {
    return this.post(`reservation/${reservation.id}/check-out`, {}).then(
      (res) => {
        if (!res?.reservation)
          console.error("Problem checking out reservation");
        return res.reservation;
      }
    );
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

  calculateReservationCost(
    startDate: Date,
    endDate: Date,
    pricePerDay: number
  ): Promise<number | null> {
    return this.post(`reservation/cost`, {
      startDate,
      endDate,
      pricePerDay,
    }).then((res) => {
      if (!res?.total) return null;
      return res.total;
    });
  }

  payEmployee(
    employeeID: number,
    amount: number,
    managerID: number
  ): Promise<User> {
    return this.post(`manager/${employeeID}`, {
      amount,
      managerID,
    }).then((res) => {
      return res.user;
    });
  }

  employeeAddHours(
    employeeID: number,
    hours: number,
    managerID: number
  ): Promise<User> {
    return this.post(`manager/${employeeID}/hours`, {
      hours,
      managerID,
    }).then((res) => {
      return res.user;
    });
  }

  userNeedsHelp(
    userID: number,
    needsHelp: boolean,
    location: string
  ): Promise<User> {
    return this.post(`user/${userID}/needs-help`, { needsHelp, location }).then(
      (res) => {
        return res.user;
      }
    );
  }

  allUsersNeedHelp(): Promise<UserWithReservation[]> {
    return this.get(`user/needs-help`).then((res) => {
      return res.users;
    });
  }
}
