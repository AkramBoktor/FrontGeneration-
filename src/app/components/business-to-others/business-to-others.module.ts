
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessToOthersRoutingModule } from './business-to-others.routing.module';
import { BusinessToOthersComponent } from './business-to-others.component';

@NgModule({
  declarations: [BusinessToOthersComponent],
  imports: [
    BusinessToOthersRoutingModule,
    CommonModule,
  ]
})
export class BusinessToOthersModule { }

