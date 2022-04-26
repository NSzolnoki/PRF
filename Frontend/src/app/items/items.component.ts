import { Component, Directive, Input, OnInit } from '@angular/core';
import { ItemService } from '../utils/item.service';


@Component({
  selector: 'app-items]',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  constructor(private itemsService: ItemService) { }

  items: any;
  counter = 0;

  ngOnInit(): void {

    
    this.itemsService.listItems().subscribe(data =>{
      var jsonObject = JSON.parse(data);
      this.items = <Item>jsonObject;
    }, error =>{
      console.log(error);
    })
  }
  


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
