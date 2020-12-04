export class ShoppingCart {
    constructor(
        public carId:number,
        public total:number,
        public items:number,
       public customerEmail:String,
       public paymentMethodId:number,
       public enable:string
    ) { }
}