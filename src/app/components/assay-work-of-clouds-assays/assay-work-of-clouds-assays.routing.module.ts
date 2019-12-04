
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayWorkOfCloudsAssaysComponent } from './assay-work-of-clouds-assays.component';


const routes: Routes = [
  {
    path: '',
    component: AssayWorkOfCloudsAssaysComponent,
  },
{
    path: 'assay-of-withdrawn-works', loadChildren: './components/assay-of-withdrawn-works/assay-of-withdrawn-works.module#AssayOfWithdrawnWorksModule',
    data: {
      moduleName: 'AssayOfWithdrawnWorks'
    },
},

{
    path: 'timetable-data-withdrawn', loadChildren: './components/timetable-data-withdrawn/timetable-data-withdrawn.module#TimetableDataWithdrawnModule',
    data: {
      moduleName: 'TimetableDataWithdrawn'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayWorkOfCloudsAssaysRoutingModule {
}

