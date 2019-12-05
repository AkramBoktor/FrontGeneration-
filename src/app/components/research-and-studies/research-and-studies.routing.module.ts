
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ResearchAndStudiesComponent } from './research-and-studies.component';


const routes: Routes = [
  {
    path: '',
    component: ResearchAndStudiesComponent,
  },
  
{
    path: 'employment-for-private-school', loadChildren: './components/employment-for-private-school/employment-for-private-school.module#EmploymentForPrivateSchoolModule',
    data: {
      moduleName: 'EmploymentForPrivateSchool'
    },
},

{
    path: 'private-school-approval', loadChildren: './components/private-school-approval/private-school-approval.module#PrivateSchoolApprovalModule',
    data: {
      moduleName: 'PrivateSchoolApproval'
    },
},

{
    path: 'private-school-traffic-committee', loadChildren: './components/private-school-traffic-committee/private-school-traffic-committee.module#PrivateSchoolTrafficCommitteeModule',
    data: {
      moduleName: 'PrivateSchoolTrafficCommittee'
    },
},

{
    path: 'accreditation', loadChildren: './components/accreditation/accreditation.module#AccreditationModule',
    data: {
      moduleName: 'Accreditation'
    },
},

{
    path: 'approval-type', loadChildren: './components/approval-type/approval-type.module#ApprovalTypeModule',
    data: {
      moduleName: 'ApprovalType'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ResearchAndStudiesRoutingModule {
}

