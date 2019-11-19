import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssigningTheCaseToANewLawyerEditComponent } from './assigning-the-case-to-a-new-lawyer-edit/assigning-the-case-to-a-new-lawyer-edit.component';
import { AssigningTheCaseToANewLawyerListComponent } from './assigning-the-case-to-a-new-lawyer-list/assigning-the-case-to-a-new-lawyer-list.component';
import { AssigningTheCaseToANewLawyerNewComponent } from './assigning-the-case-to-a-new-lawyer-new/assigning-the-case-to-a-new-lawyer-new.component';
import { AssigningTheCaseToANewLawyerViewComponent } from './assigning-the-case-to-a-new-lawyer-view/assigning-the-case-to-a-new-lawyer-view.component';
import { AssigningTheCaseToANewLawyerGuard } from './shared/assigning-the-case-to-a-new-lawyer.guard';

const routes: Routes = [
  {
    path: '',
    component: AssigningTheCaseToANewLawyerListComponent,
    canActivate: [AssigningTheCaseToANewLawyerGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AssigningTheCaseToANewLawyerNewComponent,
    canActivate: [AssigningTheCaseToANewLawyerGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AssigningTheCaseToANewLawyerEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AssigningTheCaseToANewLawyerListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AssigningTheCaseToANewLawyerViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssigningTheCaseToANewLawyerRoutingModule {
}
