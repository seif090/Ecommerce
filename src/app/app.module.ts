import { RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductComponent } from './Components/product/product.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { CategoryComponent } from './Components/category/category.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ProductdetailsComponent } from './Components/productdetails/productdetails.component';
import { MainsliderComponent } from './Components/mainslider/mainslider.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SearchPipe } from './search.pipe';
import { CategorysliderComponent } from './Components/categoryslider/categoryslider.component';
import { CartComponent } from './Components/cart/cart.component';
import { CheckOutComponent } from './Components/check-out/check-out.component'
import { HeaderInterceptor } from './header.interceptor';
import { WishlistComponent } from './Components/wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    BrandsComponent,
    CategoryComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ProductdetailsComponent,
    MainsliderComponent,
    SearchPipe,
    CategorysliderComponent,
    CartComponent,
    CheckOutComponent,
    WishlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CarouselModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:HeaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
