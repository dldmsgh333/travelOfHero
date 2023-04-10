import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CustomerService } from './customer.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';



@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
  ],
  providers: [CustomerService],
})
export class CustomerModule { }
