import { Cart } from "./cart"
import { Order } from "./order"

export class Customer {
    userId!: number
    userName?: String
    password?: String
    role?: String="customer";
    name?: String
    email?: String
    mobileNo?: String
    status?: String="Active"
    address?: String
    cart?: Cart
    orders!: Order[]
}
