import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { StructuralComponentCodeGuard } from './shared/structural-component-code.guard';
import { StructuralComponentCodeNewComponent } from './structural-component-code-new/structural-component-code-new.component';
import { StructuralComponentCodeEditComponent } from './structural-component-code-edit/structural-component-code-edit.component';
import { StructuralComponentCodeListComponent } from './structural-component-code-list/structural-component-code-list.component';
import { StructuralComponentCodeViewComponent } from './structural-component-code-view/structural-component-code-view.component';

const routes: Routes = [
  {
    path: '',
    component: StructuralComponentCodeListComponent,
    canActivate: [StructuralComponentCodeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: StructuralComponentCodeNewComponent,
    canActivate: [StructuralComponentCodeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: StructuralComponentCodeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: StructuralComponentCodeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: StructuralComponentCodeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class StructuralComponentCodeRoutingModule {
}
