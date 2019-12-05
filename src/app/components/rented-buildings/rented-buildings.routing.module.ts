
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RentedBuildingsComponent } from './rented-buildings.component';


const routes: Routes = [
  {
    path: '',
    component: RentedBuildingsComponent,
  },
  
{
    path: 'position-of-leased-buildings', loadChildren: './components/position-of-leased-buildings/position-of-leased-buildings.module#PositionOfLeasedBuildingsModule',
    data: {
      moduleName: 'PositionOfLeasedBuildings'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RentedBuildingsRoutingModule {
}

