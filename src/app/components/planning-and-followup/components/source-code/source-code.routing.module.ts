import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SourceCodeGuard } from './shared/source-code.guard';
import { SourceCodeNewComponent } from './source-code-new/source-code-new.component';
import { SourceCodeEditComponent } from './source-code-edit/source-code-edit.component';
import { SourceCodeListComponent } from './source-code-list/source-code-list.component';
import { SourceCodeViewComponent } from './source-code-view/source-code-view.component';

const routes: Routes = [
  {
    path: '',
    component: SourceCodeListComponent,
    canActivate: [SourceCodeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SourceCodeNewComponent,
    canActivate: [SourceCodeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SourceCodeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SourceCodeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SourceCodeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SourceCodeRoutingModule {
}
