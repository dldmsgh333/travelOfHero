import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from './app.module';
import { TempComponent } from './temp/temp.component';



@NgModule({
  declarations: [TempComponent],
  imports: [
    AppModule
  ]
})
export class TestModule { }
