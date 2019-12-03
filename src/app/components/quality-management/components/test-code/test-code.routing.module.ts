import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TestCodeGuard } from './shared/test-code.guard';
import { TestCodeNewComponent } from './test-code-new/test-code-new.component';
import { TestCodeEditComponent } from './test-code-edit/test-code-edit.component';
import { TestCodeListComponent } from './test-code-list/test-code-list.component';
import { TestCodeViewComponent } from './test-code-view/test-code-view.component';

const routes: Routes = [
  {
    path: '',
    component: TestCodeListComponent,
    canActivate: [TestCodeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TestCodeNewComponent,
    canActivate: [TestCodeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TestCodeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TestCodeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TestCodeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TestCodeRoutingModule {
}
