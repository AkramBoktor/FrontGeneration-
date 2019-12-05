
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayListOfCreationOfWorksOfOthersComponent } from './assay-list-of-creation-of-works-of-others.component';


const routes: Routes = [
  {
    path: '',
    component: AssayListOfCreationOfWorksOfOthersComponent,
  },
  
{
    path: 'electricity-works', loadChildren: './components/electricity-works/electricity-works.module#ElectricityWorksModule',
    data: {
      moduleName: 'ElectricityWorks'
    },
},

{
    path: 'timetable-data-for-third-parties', loadChildren: './components/timetable-data-for-third-parties/timetable-data-for-third-parties.module#TimetableDataForThirdPartiesModule',
    data: {
      moduleName: 'TimetableDataForThirdParties'
    },
},

{
    path: 'business-assay-for-others', loadChildren: './components/business-assay-for-others/business-assay-for-others.module#BusinessAssayForOthersModule',
    data: {
      moduleName: 'BusinessAssayForOthers'
    },
},


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayListOfCreationOfWorksOfOthersRoutingModule {
}

