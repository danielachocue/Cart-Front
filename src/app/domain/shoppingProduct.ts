export class ShoppingProduct{
    constructor(
       public shprId:number,
       public productId:string,
       public shoppingCartId:number,
       public quantity:number,
       public total:number,
       public name:string,
       public image:string,
       public price:number
    ){}
}