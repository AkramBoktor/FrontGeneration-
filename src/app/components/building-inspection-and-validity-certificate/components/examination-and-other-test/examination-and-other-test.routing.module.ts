import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ExaminationAndOtherTestGuard } from './shared/examination-and-other-test.guard';
import { ExaminationAndOtherTestNewComponent } from './examination-and-other-test-new/examination-and-other-test-new.component';
import { ExaminationAndOtherTestEditComponent } from './examination-and-other-test-edit/examination-and-other-test-edit.component';
import { ExaminationAndOtherTestListComponent } from './examination-and-other-test-list/examination-and-other-test-list.component';
import { ExaminationAndOtherTestViewComponent } from './examination-and-other-test-view/examination-and-other-test-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExaminationAndOtherTestListComponent,
    canActivate: [ExaminationAndOtherTestGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ExaminationAndOtherTestNewComponent,
    canActivate: [ExaminationAndOtherTestGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ExaminationAndOtherTestEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ExaminationAndOtherTestListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ExaminationAndOtherTestViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ExaminationAndOtherTestRoutingModule {
}
