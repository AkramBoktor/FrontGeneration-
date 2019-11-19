
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { OrganizationAndManagementHousingComponent } from './organization-and-management-housing.component';


const routes: Routes = [
  {
    path: '',
    component: OrganizationAndManagementHousingComponent,
  },
  
{
    path: 'total-functional-course', loadChildren: './components/total-functional-course/total-functional-course.module#TotalFunctionalCourseModule',
    data: {
      moduleName: 'TotalFunctionalCourse'
    },
},

{
    path: 'total-functional-course', loadChildren: './components/total-functional-course/total-functional-course.module#TotalFunctionalCourseModule',
    data: {
      moduleName: 'TotalFunctionalCourse'
    },
},

{
    path: 'assigning-maintenance-electricity-project-to-electrical-engineer', loadChildren: './components/assigning-maintenance-electricity-project-to-electrical-engineer/assigning-maintenance-electricity-project-to-electrical-engineer.module#AssigningMaintenanceElectricityProjectToElectricalEngineerModule',
    data: {
      moduleName: 'AssigningMaintenanceElectricityProjectToElectricalEngineer'
    },
},

{
    path: 'assign-the-supervision-of-an-engineer-from-outside-the-implementation-department', loadChildren: './components/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department.module#AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentModule',
    data: {
      moduleName: 'AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment'
    },
},

{
    path: 'career-programs', loadChildren: './components/career-programs/career-programs.module#CareerProgramsModule',
    data: {
      moduleName: 'CareerPrograms'
    },
},

{
    path: 'complete-the-data-of-supervisor-engineer', loadChildren: './components/complete-the-data-of-supervisor-engineer/complete-the-data-of-supervisor-engineer.module#CompleteTheDataOfSupervisorEngineerModule',
    data: {
      moduleName: 'CompleteTheDataOfSupervisorEngineer'
    },
},

{
    path: 'introducing-exception-for-branches-engineer', loadChildren: './components/introducing-exception-for-branches-engineer/introducing-exception-for-branches-engineer.module#IntroducingExceptionForBranchesEngineerModule',
    data: {
      moduleName: 'IntroducingExceptionForBranchesEngineer'
    },
},

{
    path: 'job-placement-for-an-executive-engineer-without-a-project', loadChildren: './components/job-placement-for-an-executive-engineer-without-a-project/job-placement-for-an-executive-engineer-without-a-project.module#JobPlacementForAnExecutiveEngineerWithoutAProjectModule',
    data: {
      moduleName: 'JobPlacementForAnExecutiveEngineerWithoutAProject'
    },
},

{
    path: 'job-placement-of-the-departments-of-the-body', loadChildren: './components/job-placement-of-the-departments-of-the-body/job-placement-of-the-departments-of-the-body.module#JobPlacementOfTheDepartmentsOfTheBodyModule',
    data: {
      moduleName: 'JobPlacementOfTheDepartmentsOfTheBody'
    },
},

{
    path: 'termination-of-the-employee's-job-placement', loadChildren: './components/termination-of-the-employee's-job-placement/termination-of-the-employee's-job-placement.module#TerminationOfTheEmployee'sJobPlacementModule',
    data: {
      moduleName: 'TerminationOfTheEmployee'sJobPlacement'
    },
},

{
    path: 'total-functional-course', loadChildren: './components/total-functional-course/total-functional-course.module#TotalFunctionalCourseModule',
    data: {
      moduleName: 'TotalFunctionalCourse'
    },
},

{
    path: 'reason-for-ending-engineer-housing-on-project', loadChildren: './components/reason-for-ending-engineer-housing-on-project/reason-for-ending-engineer-housing-on-project.module#ReasonForEndingEngineerHousingOnProjectModule',
    data: {
      moduleName: 'ReasonForEndingEngineerHousingOnProject'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class OrganizationAndManagementHousingRoutingModule {
}

