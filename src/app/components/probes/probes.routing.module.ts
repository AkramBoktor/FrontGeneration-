
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ProbesComponent } from './probes.component';


const routes: Routes = [
  {
    path: '',
    component: ProbesComponent,
  },
  

{
    path: 'analysis-value', loadChildren: './components/analysis-value/analysis-value.module#AnalysisValueModule',
    data: {
      moduleName: 'AnalysisValue'
    },
},

{
    path: 'coordinates-sensors', loadChildren: './components/coordinates-sensors/coordinates-sensors.module#CoordinatesSensorsModule',
    data: {
      moduleName: 'CoordinatesSensors'
    },
},

{
    path: 'general-data-on-the-probes', loadChildren: './components/general-data-on-the-probes/general-data-on-the-probes.module#GeneralDataOnTheProbesModule',
    data: {
      moduleName: 'GeneralDataOnTheProbes'
    },
},

{
    path: 'statements-of-sensors', loadChildren: './components/statements-of-sensors/statements-of-sensors.module#StatementsOfSensorsModule',
    data: {
      moduleName: 'StatementsOfSensors'
    },
},


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ProbesRoutingModule {
}

