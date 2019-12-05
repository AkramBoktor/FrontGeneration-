
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BranchManagerComponent } from './branch-manager.component';


const routes: Routes = [
  {
    path: '',
    component: BranchManagerComponent,
  },
  
{
    path: 'land-adoption', loadChildren: './components/land-adoption/land-adoption.module#LandAdoptionModule',
    data: {
      moduleName: 'LandAdoption'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BranchManagerRoutingModule {
}

