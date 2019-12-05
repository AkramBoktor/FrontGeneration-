
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LandComponent } from './land.component';


const routes: Routes = [
  {
    path: '',
    component: LandComponent,
  },
{
    path: 'the-positions-of-land-available', loadChildren: './components/the-positions-of-land-available/the-positions-of-land-available.module#ThePositionsOfLandAvailableModule',
    data: {
      moduleName: 'ThePositionsOfLandAvailable'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LandRoutingModule {
}

