import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { IntroducingExceptionForBranchesEngineerGuard } from './shared/introducing-exception-for-branches-engineer.guard';
import { IntroducingExceptionForBranchesEngineerNewComponent } from './introducing-exception-for-branches-engineer-new/introducing-exception-for-branches-engineer-new.component';
import { IntroducingExceptionForBranchesEngineerEditComponent } from './introducing-exception-for-branches-engineer-edit/introducing-exception-for-branches-engineer-edit.component';
import { IntroducingExceptionForBranchesEngineerListComponent } from './introducing-exception-for-branches-engineer-list/introducing-exception-for-branches-engineer-list.component';
import { IntroducingExceptionForBranchesEngineerViewComponent } from './introducing-exception-for-branches-engineer-view/introducing-exception-for-branches-engineer-view.component';

const routes: Routes = [
  {
    path: '',
    component: IntroducingExceptionForBranchesEngineerListComponent,
    canActivate: [IntroducingExceptionForBranchesEngineerGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: IntroducingExceptionForBranchesEngineerNewComponent,
    canActivate: [IntroducingExceptionForBranchesEngineerGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: IntroducingExceptionForBranchesEngineerEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: IntroducingExceptionForBranchesEngineerListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: IntroducingExceptionForBranchesEngineerViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class IntroducingExceptionForBranchesEngineerRoutingModule {
}
