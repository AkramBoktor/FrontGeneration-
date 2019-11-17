
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BusinessToOthersComponent } from './business-to-others.component';


const routes: Routes = [
  {
    path: '',
    component: BusinessToOthersComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BusinessToOthersRoutingModule {
}

