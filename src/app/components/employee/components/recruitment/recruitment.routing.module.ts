import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecruitmentEditComponent } from './recruitment-edit/recruitment-edit.component';
import { RecruitmentListComponent } from './recruitment-list/recruitment-list.component';
import { RecruitmentNewComponent } from './recruitment-new/recruitment-new.component';
import { RecruitmentViewComponent } from './recruitment-view/recruitment-view.component';
import { RecruitmentGuard } from './shared/recruitment.guard';

const routes: Routes = [
  {
    path: '',
    component: RecruitmentListComponent,
    canActivate: [RecruitmentGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RecruitmentNewComponent,
    canActivate: [RecruitmentGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RecruitmentEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RecruitmentListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RecruitmentViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RecruitmentRoutingModule {
}
