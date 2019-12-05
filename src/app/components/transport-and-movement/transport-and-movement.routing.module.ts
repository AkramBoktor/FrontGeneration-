
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TransportAndMovementComponent } from './transport-and-movement.component';


const routes: Routes = [
  {
    path: '',
    component: TransportAndMovementComponent,
  },
  
{
    path: 'employees-performance-evaluation', loadChildren: './components/employees-performance-evaluation/employees-performance-evaluation.module#EmployeesPerformanceEvaluationModule',
    data: {
      moduleName: 'EmployeesPerformanceEvaluation'
    },
},

{
    path: 'registration-form-50', loadChildren: './components/registration-form-50/registration-form-50.module#RegistrationForm50Module',
    data: {
      moduleName: 'RegistrationForm50'
    },
},

  
  
  
  
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TransportAndMovementRoutingModule {
}

