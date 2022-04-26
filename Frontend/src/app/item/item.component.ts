import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../utils/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  item: any;
  isLoaded: boolean=false;
  selectedNumber: number;
  cartitem: any;


  constructor(private itemsService: ItemService, private route: ActivatedRoute) { this.selectedNumber = 0;}



  ngOnInit(): void {

    this.geItem();
    
  }

  geItem(): void{
    this.route.paramMap.subscribe(params => {
      console.log(params.keys);
      this.itemsService.getItem(params.get('Id') ?? "").subscribe(data =>{
        console.log(data);
         var jsonObject = JSON.parse(data);
         this.item = <Item>jsonObject;
         this.isLoaded = true;

       }, error =>{
         console.log(error);

       })
 
    }, error => {
      console.log('parammap error', error);
    })
  }

  rangeChange(range: any){
    this.selectedNumber = range;
  }

  addToCart(): void{
    if(localStorage.getItem('shoppingCart')){
      var existingItems = JSON.parse(localStorage.getItem("shoppingCart") ?? "");
      if(existingItems == null) existingItems = [];
      var entry = {
          "itemID": this.item.Id,
          "count": this.selectedNumber
      };
      localStorage.setItem("shoppingCart", JSON.stringify(entry));
      // Save allEntries back to local storage
      existingItems.push(entry);
      localStorage.setItem("shoppingCart", JSON.stringify(existingItems));
    }else{
      this.cartitem = [{'itemID' : this.item.Id, 'count' : this.selectedNumber}]
      localStorage.setItem('shoppingCart', JSON.stringify(this.cartitem));
    }
  }



}

export interface cartItem{
  itemID: string;
  count: number;
}

export interface Item {
  Id: string;
  Name: string;
  Description: string;
  Durability: number;
  Ergonomics: number;
  QuestItem: boolean;
  Rarity: number;
  ShortName: string;
  ammoCaliber: string;
  weapUseType: string;
  CreditsPrice: number;
  weapClass: string;
  inStock: number;
  ImagePath: string;
}