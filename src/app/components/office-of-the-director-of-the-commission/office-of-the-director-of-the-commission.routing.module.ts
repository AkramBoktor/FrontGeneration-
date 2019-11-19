
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { OfficeOfTheDirectorOfTheCommissionComponent } from './office-of-the-director-of-the-commission.component';


const routes: Routes = [
  {
    path: '',
    component: OfficeOfTheDirectorOfTheCommissionComponent,
  },
  
  
{
    path: 'external-job-type', loadChildren: './components/external-job-type/external-job-type.module#ExternalJobTypeModule',
    data: {
      moduleName: 'ExternalJobType'
    },
},

{
    path: 'agenda-internal', loadChildren: './components/agenda-internal/agenda-internal.module#AgendaInternalModule',
    data: {
      moduleName: 'AgendaInternal'
    },
},

{
    path: 'thirdparties', loadChildren: './components/thirdparties/thirdparties.module#ThirdpartiesModule',
    data: {
      moduleName: 'Thirdparties'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class OfficeOfTheDirectorOfTheCommissionRoutingModule {
}

