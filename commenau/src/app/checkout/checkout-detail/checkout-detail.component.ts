import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-checkout-detail',
  templateUrl: './checkout-detail.component.html',
  styleUrls: ['./checkout-detail.component.scss']
})
export class CheckoutDetailComponent implements OnInit {
  checkoutForm!: FormGroup
  user!: User;
  constructor(private formBuilder: FormBuilder, private userService : UserService) { }

  ngOnInit(): void {
    if(this.userService.getCheckLogin()){
      this.user = this.userService.user;
    }else{
      this.user = new User();
      this.user.name = '';
      this.user.address ='';
      this.user.email = '';
      this.user.phone = '';
    }
    console.log(this.user);
    
    this.checkoutForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      address: [this.user.address, Validators.required],
      phone: [this.user.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
      email: [this.user.email, [Validators.required, Validators.email, gmailValidate]]
    })
  }

}
function gmailValidate(formControl: FormControl) {
  if(formControl.value.includes('@gmail.com')){
    return null
  }
  return {gmail: true}
}
