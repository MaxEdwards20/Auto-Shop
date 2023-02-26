export type Car = {
    vin: string,
    make: string,
    model: string,
    edition: string,
    year: number,
    color: string,
    mileage: number,
    titleType: string,
    imageSrc: string,
}

export type ReservationInfo = {
    startDate: string
    endDate: string
    vehicle: string
    amountDue: number
}

export type UserCheckinInfo = {
    name: string
    email: string
    phone: string
    upcompingReservations: ReservationInfo[]
}