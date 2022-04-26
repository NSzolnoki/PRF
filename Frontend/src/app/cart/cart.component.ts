import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../utils/item.service';
import { OrderService } from '../utils/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']

})
export class CartComponent implements OnInit {

  items: Array<item> = [];
  array: [];
  count: number;
  totalCount: number;
  grandTotalPrice: number;


  constructor(private itemService: ItemService, private orderService: OrderService, private router: Router) { this.array = []; this.count = 0; this.items = []; this.totalCount = 0; this.grandTotalPrice = 0; }

  ngOnInit(): void {
    this.loadOrders();
  }
  public show = true;
  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }

  loadOrders() {
    if (localStorage.getItem("shoppingCart")) {
      var existingItems = JSON.parse(localStorage.getItem("shoppingCart") ?? "");
      this.array = existingItems;
      for (let i = 0; i < this.array.length; i++) {
        this.count = this.array[i]['count'];

        this.itemService.getItem(this.array[i]['itemID']).subscribe(item => {
          const itemJson = JSON.parse(item);
          const _item = <item>{
            name: itemJson['Name'],
            image: itemJson['ImagePath'],
            count: this.count,
            pricePerUnity: itemJson['CreditsPrice'],
            totalPrice: this.count * itemJson['CreditsPrice'],
            id: itemJson['Id']

          }
          this.totalCount += Number(this.count);
          this.grandTotalPrice += this.count * itemJson['CreditsPrice'];
          this.items.push(_item);
        }, error => {
          console.log(error);
        })
      }
      console.log(this.items);
    }
  }

  removeSingleItem(itemId: string) {
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i]['itemID'] === itemId) {
        this.array.splice(i,1);
      }
    }


    localStorage.setItem("shoppingCart", JSON.stringify(this.array));

    this.redirectTo('/cart');

  }

  saveOrder() {
    this.orderService.saveOrder(localStorage.getItem("uid") ?? "", JSON.stringify(this.items), this.grandTotalPrice).subscribe(msg => {
      this.clearCart();
      this.router.navigate(['/account']);
    }, error => {
      console.log(error);
    })
  }
  clearCart() {
    localStorage.removeItem("shoppingCart");
    this.redirectTo('/cart');
  }

  redirectTo(uri: string) {
    //igazából ez itt egy kis csalás, mert egyszerűbb mint a listával bajlódni, nem történik app újratöltés, így az Angularral nem megy szembe
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

}


export interface item {
  image: string,
  name: string,
  count: number,
  pricePerUnity: number,
  totalPrice: number,
  id: string
}