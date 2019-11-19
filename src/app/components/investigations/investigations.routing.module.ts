
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { InvestigationsComponent } from './investigations.component';


const routes: Routes = [
  {
    path: '',
    component: InvestigationsComponent,
  },
  
{
    path: 'grievances', loadChildren: './components/grievances/grievances.module#GrievancesModule',
    data: {
      moduleName: 'Grievances'
    },
},

{
    path: 'internal-investigations', loadChildren: './components/internal-investigations/internal-investigations.module#InternalInvestigationsModule',
    data: {
      moduleName: 'InternalInvestigations'
    },
},

{
    path: 'external-investigations', loadChildren: './components/external-investigations/external-investigations.module#ExternalInvestigationsModule',
    data: {
      moduleName: 'ExternalInvestigations'
    },
},

{
    path: 'oral-investigations', loadChildren: './components/oral-investigations/oral-investigations.module#OralInvestigationsModule',
    data: {
      moduleName: 'OralInvestigations'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class InvestigationsRoutingModule {
}

