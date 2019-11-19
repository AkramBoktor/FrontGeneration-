
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsRoutingModule } from './accounts.routing.module';
import { AccountsComponent } from './accounts.component';

@NgModule({
  declarations: [AccountsComponent],
  imports: [
    AccountsRoutingModule,
    CommonModule,
  ]
})
export class AccountsModule { }

