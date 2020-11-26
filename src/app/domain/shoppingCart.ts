export class ShoppingCart {
    constructor(
        public carId: number,
        public enable: string,
        public items: number,
        public total: number,
        public customerEmail: string,
        public paymentMethodId: number
    ) { }
}