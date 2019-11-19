
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FreeQueryForStatisticalBulletinComponent } from './free-query-for-statistical-bulletin.component';


const routes: Routes = [
  {
    path: '',
    component: FreeQueryForStatisticalBulletinComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class FreeQueryForStatisticalBulletinRoutingModule {
}

