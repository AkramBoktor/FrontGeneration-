import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { InternalTrainingPlansGuard } from './shared/internal-training-plans.guard';
import { InternalTrainingPlansNewComponent } from './internal-training-plans-new/internal-training-plans-new.component';
import { InternalTrainingPlansEditComponent } from './internal-training-plans-edit/internal-training-plans-edit.component';
import { InternalTrainingPlansListComponent } from './internal-training-plans-list/internal-training-plans-list.component';
import { InternalTrainingPlansViewComponent } from './internal-training-plans-view/internal-training-plans-view.component';

const routes: Routes = [
  {
    path: '',
    component: InternalTrainingPlansListComponent,
    canActivate: [InternalTrainingPlansGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: InternalTrainingPlansNewComponent,
    canActivate: [InternalTrainingPlansGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: InternalTrainingPlansEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: InternalTrainingPlansListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: InternalTrainingPlansViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class InternalTrainingPlansRoutingModule {
}
