import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AbstractStatementStructuralGuard } from './shared/abstract-statement-structural.guard';
import { AbstractStatementStructuralNewComponent } from './abstract-statement-structural-new/abstract-statement-structural-new.component';
import { AbstractStatementStructuralEditComponent } from './abstract-statement-structural-edit/abstract-statement-structural-edit.component';
import { AbstractStatementStructuralListComponent } from './abstract-statement-structural-list/abstract-statement-structural-list.component';
import { AbstractStatementStructuralViewComponent } from './abstract-statement-structural-view/abstract-statement-structural-view.component';

const routes: Routes = [
  {
    path: '',
    component: AbstractStatementStructuralListComponent,
    canActivate: [AbstractStatementStructuralGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AbstractStatementStructuralNewComponent,
    canActivate: [AbstractStatementStructuralGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AbstractStatementStructuralEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AbstractStatementStructuralListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AbstractStatementStructuralViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AbstractStatementStructuralRoutingModule {
}
