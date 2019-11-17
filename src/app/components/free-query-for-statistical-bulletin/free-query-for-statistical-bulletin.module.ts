
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FreeQueryForStatisticalBulletinRoutingModule } from './free-query-for-statistical-bulletin.routing.module';
import { FreeQueryForStatisticalBulletinComponent } from './free-query-for-statistical-bulletin.component';

@NgModule({
  declarations: [FreeQueryForStatisticalBulletinComponent],
  imports: [
    FreeQueryForStatisticalBulletinRoutingModule,
    CommonModule,
  ]
})
export class FreeQueryForStatisticalBulletinModule { }

