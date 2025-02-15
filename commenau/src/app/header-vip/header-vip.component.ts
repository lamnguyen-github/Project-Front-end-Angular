import { Component, OnInit, HostListener, Input } from '@angular/core';
import { totalmem } from 'os';
import { first, isEmpty } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { User } from '../model/user';
import { CartService } from '../Services/cart.service';
import { ProductsService } from '../Services/products.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-header-vip',
  templateUrl: './header-vip.component.html',
  styleUrls: ['./header-vip.component.scss'],

})

export class HeaderVipComponent implements OnInit {
  loading = false;
  user!: User;
  login!:false;
  public isMenuCollapsed = true;
  header_variable = false;
  search_click = false;
  @Input() menu_header: string = 'menu-header2';
  items = this.cart.getCartItems();
  search = '';


  constructor(
    private cart: CartService,
    private product: ProductsService,
    public activeModal: AppComponent,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getTotal();
    this.user=this.userService.user;
    this.connect();

  }
  public connect() {
    this.product.connectProduct();
  }

  @HostListener('document:scroll')
  scroolFunction() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.header_variable = true;
    } else {
      this.header_variable = false;
    }
  }
  searchClick() {
    if (this.search_click) {
      this.search_click = false;
      if (
        document.body.scrollTop > 0 ||
        document.documentElement.scrollTop > 0
      ) {
        this.header_variable = true;
      } else {
        this.header_variable = false;
      }
    } else {
      this.search_click = true;
      this.header_variable = true;
    }
    // if (this.search_click) {
    //   document.body.style.backgroundColor = 'gray';
    //   document.body.style.zIndex = '99999999';
    //   document.body.style.position = 'absolute';
    // } else {
    //   document.body.style.backgroundColor = 'red';
    // }

    // Note : Làm mờ khi click search mà chưa ra :))
  }

  getTotal() {
    return this.cart.getTotal();
  }
  getQuantity() {
    return this.cart.getQuantity();
  }
  logout(){
    return this.userService.logout();
  }
  getCheckLogin(){
    return this.userService.getCheckLogin();
  }
  getAllProduct(){
    return this.product.getDayProduct();
  }
  checkQuantityCart(){
    if(this.cart.getQuantity() > 0){
      return true;
    }
    return false;
  }



}
