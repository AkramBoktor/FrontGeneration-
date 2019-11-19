
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TimeControlComponent } from './time-control.component';


const routes: Routes = [
  {
    path: '',
    component: TimeControlComponent,
  },
  
{
    path: 'extraction-of-temporary-card-code', loadChildren: './components/extraction-of-temporary-card-code/extraction-of-temporary-card-code.module#ExtractionOfTemporaryCardCodeModule',
    data: {
      moduleName: 'ExtractionOfTemporaryCardCode'
    },
},

{
    path: 'employee-card-definition', loadChildren: './components/employee-card-definition/employee-card-definition.module#EmployeeCardDefinitionModule',
    data: {
      moduleName: 'EmployeeCardDefinition'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TimeControlRoutingModule {
}

