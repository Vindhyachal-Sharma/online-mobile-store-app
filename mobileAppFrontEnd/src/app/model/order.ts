import { Mobile } from "./mobile"
import { Payment } from "./payment"


export class Order {
    id!: number
    orderDate?: Date
    dispatchDate?: Date
    cost?: number
    orderAddress?: String
    orderStatus?:any
    quantity?: number
    mobiles?: Mobile[]
    payment?: Payment

}
