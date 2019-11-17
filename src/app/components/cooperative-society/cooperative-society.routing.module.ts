
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CooperativeSocietyComponent } from './cooperative-society.component';


const routes: Routes = [
  {
    path: '',
    component: CooperativeSocietyComponent,
  },

  {
    path: 'membership-data', loadChildren: './components/membership-data/membership-data.module#MembershipDataModule',
    data: {
      moduleName: 'MembershipData'
    },
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CooperativeSocietyRoutingModule {
}

