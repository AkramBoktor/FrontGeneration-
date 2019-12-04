
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayAssayListBuildingAssayComponent } from './assay-assay-list-building-assay.component';


const routes: Routes = [
  {
    path: '',
    component: AssayAssayListBuildingAssayComponent,
  },
{
    path: 'schedule-implementation-data-assay-project', loadChildren: './components/schedule-implementation-data-assay-project/schedule-implementation-data-assay-project.module#ScheduleImplementationDataAssayProjectModule',
    data: {
      moduleName: 'ScheduleImplementationDataAssayProject'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayAssayListBuildingAssayRoutingModule {
}

