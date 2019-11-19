
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FollowupProjectComponent } from './followup-project.component';


const routes: Routes = [
  {
    path: '',
    component: FollowupProjectComponent,
  },
  
{
    path: 'number-of-school-classes-in-operation', loadChildren: './components/number-of-school-classes-in-operation/number-of-school-classes-in-operation.module#NumberOfSchoolClassesInOperationModule',
    data: {
      moduleName: 'NumberOfSchoolClassesInOperation'
    },
},

{
    path: 'project', loadChildren: './components/project/project.module#ProjectModule',
    data: {
      moduleName: 'Project'
    },
},

{
    path: 'primary-and-final-delivery-date', loadChildren: './components/primary-and-final-delivery-date/primary-and-final-delivery-date.module#PrimaryAndFinalDeliveryDateModule',
    data: {
      moduleName: 'PrimaryAndFinalDeliveryDate'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class FollowupProjectRoutingModule {
}

