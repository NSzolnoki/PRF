import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { ErrorComponent } from './error/error.component';
import { FirstComponent } from './first/first.component';
import { AuthGuard } from './guards/auth.guard';
import { ItemComponent } from './item/item.component';
import { ItemsComponent } from './items/items.component';
import { LoginComponent } from './login/login.component';
import { SecondComponent } from './second/second.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'first', component: FirstComponent, canActivate: [AuthGuard]},
  {path: 'second/:id', component: SecondComponent, canActivate: [AuthGuard]},
  {path: 'items', component: ItemsComponent, canActivate: [AuthGuard]},
  {path: 'item/:Id', component: ItemComponent, canActivate: [AuthGuard]},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path: '**', component: ErrorComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
