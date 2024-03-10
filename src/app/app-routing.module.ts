import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { ProductComponent } from './Components/product/product.component';
import { CategoryComponent } from './Components/category/category.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { authGuard } from './auth.guard';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ProductdetailsComponent } from './Components/productdetails/productdetails.component';
import { CartComponent } from './Components/cart/cart.component';
import { CheckOutComponent } from './Components/check-out/check-out.component';
import { userGuard } from './user.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './Components/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'home', canActivate: [authGuard], component: HomeComponent, title: 'Home' },
  { path: 'brand', canActivate: [authGuard], component: BrandsComponent, title: 'Brands' },
  { path: 'product', canActivate: [authGuard], component: ProductComponent, title: 'Products'},
  { path: 'wishlist', canActivate: [authGuard], component: WishlistComponent, title: 'WishList'},
  { path: 'productdetails/:id', canActivate: [authGuard], component: ProductdetailsComponent, title: 'Product Details'},
  { path: 'settings', canActivate: [authGuard], loadChildren:()=>import("./settings/settings.module").then((m)=>m.SettingsModule), title: 'Product Details'},
  { path: 'category', canActivate: [authGuard], component: CategoryComponent, title: 'Category'},
 {path:'categorydetails/:id',loadComponent: ()=>import("./Components/categorydetails/categorydetails.component").then((m)=>m.CategorydetailsComponent), title: 'Category Details'},
  { path: 'cart', canActivate: [authGuard], component: CartComponent, title: 'Cart'},
  { path: 'checkout/:id', canActivate: [authGuard], component: CheckOutComponent, title: 'CheckOut'},
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', canActivate: [userGuard], component: RegisterComponent, title: 'Register' },
  { path: 'forgetPassword', component: ForgetPasswordComponent, title: 'Forget Password'},
  { path: 'resetPassword', component: ResetPasswordComponent, title: 'Reset Password'},
  { path: '**', component: NotfoundComponent, title: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),BrowserAnimationsModule, ToastrModule.forRoot(), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
