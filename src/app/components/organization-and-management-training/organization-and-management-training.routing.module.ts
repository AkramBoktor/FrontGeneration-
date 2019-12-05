
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { OrganizationAndManagementTrainingComponent } from './organization-and-management-training.component';


const routes: Routes = [
  {
    path: '',
    component: OrganizationAndManagementTrainingComponent,
  },
  
{
  path: 'annual-plan', loadChildren: './components/annual-plan/annual-plan.module#AnnualPlanModule',
  data: {
    moduleName: 'AnnualPlan'
  },
},

{
  path: 'courses-code', loadChildren: './components/courses-code/courses-code.module#CoursesCodeModule',
  data: {
    moduleName: 'CoursesCode'
  },
},

{
  path: 'different-form-added-but-not-extracted', loadChildren: './components/different-form-added-but-not-extracted/different-form-added-but-not-extracted.module#DifferentFormAddedButNotExtractedModule',
  data: {
    moduleName: 'DifferentFormAddedButNotExtracted'
  },
},

{
  path: 'holder-of-course', loadChildren: './components/holder-of-course/holder-of-course.module#HolderOfCourseModule',
  data: {
    moduleName: 'HolderOfCourse'
  },
},

{
  path: 'session-sub-codes', loadChildren: './components/session-sub-codes/session-sub-codes.module#SessionSubCodesModule',
  data: {
    moduleName: 'SessionSubCodes'
  },
},

{
  path: 'training-destination', loadChildren: './components/training-destination/training-destination.module#TrainingDestinationModule',
  data: {
    moduleName: 'TrainingDestination'
  },
},


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class OrganizationAndManagementTrainingRoutingModule {
}

