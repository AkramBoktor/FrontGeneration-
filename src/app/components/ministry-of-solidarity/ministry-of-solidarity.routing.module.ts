
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MinistryOfSolidarityComponent } from './ministry-of-solidarity.component';


const routes: Routes = [
  {
    path: '',
    component: MinistryOfSolidarityComponent,
  },
  
{
    path: 'ministry-of-solidarity-and-communications', loadChildren: './components/ministry-of-solidarity-and-communications/ministry-of-solidarity-and-communications.module#MinistryOfSolidarityAndCommunicationsModule',
    data: {
      moduleName: 'MinistryOfSolidarityAndCommunications'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MinistryOfSolidarityRoutingModule {
}

