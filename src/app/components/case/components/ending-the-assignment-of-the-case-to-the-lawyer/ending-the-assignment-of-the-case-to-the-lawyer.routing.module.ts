import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndingTheAssignmentOfTheCaseToTheLawyerEditComponent } from './ending-the-assignment-of-the-case-to-the-lawyer-edit/ending-the-assignment-of-the-case-to-the-lawyer-edit.component';
import { EndingTheAssignmentOfTheCaseToTheLawyerListComponent } from './ending-the-assignment-of-the-case-to-the-lawyer-list/ending-the-assignment-of-the-case-to-the-lawyer-list.component';
import { EndingTheAssignmentOfTheCaseToTheLawyerNewComponent } from './ending-the-assignment-of-the-case-to-the-lawyer-new/ending-the-assignment-of-the-case-to-the-lawyer-new.component';
import { EndingTheAssignmentOfTheCaseToTheLawyerViewComponent } from './ending-the-assignment-of-the-case-to-the-lawyer-view/ending-the-assignment-of-the-case-to-the-lawyer-view.component';
import { EndingTheAssignmentOfTheCaseToTheLawyerGuard } from './shared/ending-the-assignment-of-the-case-to-the-lawyer.guard';

const routes: Routes = [
  {
    path: '',
    component: EndingTheAssignmentOfTheCaseToTheLawyerListComponent,
    canActivate: [EndingTheAssignmentOfTheCaseToTheLawyerGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EndingTheAssignmentOfTheCaseToTheLawyerNewComponent,
    canActivate: [EndingTheAssignmentOfTheCaseToTheLawyerGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EndingTheAssignmentOfTheCaseToTheLawyerEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EndingTheAssignmentOfTheCaseToTheLawyerListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EndingTheAssignmentOfTheCaseToTheLawyerViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EndingTheAssignmentOfTheCaseToTheLawyerRoutingModule {
}
