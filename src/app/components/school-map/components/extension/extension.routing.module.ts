import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ExtensionGuard } from './shared/extension.guard';
import { ExtensionNewComponent } from './extension-new/extension-new.component';
import { ExtensionEditComponent } from './extension-edit/extension-edit.component';
import { ExtensionListComponent } from './extension-list/extension-list.component';
import { ExtensionViewComponent } from './extension-view/extension-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExtensionListComponent,
    canActivate: [ExtensionGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ExtensionNewComponent,
    canActivate: [ExtensionGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ExtensionEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ExtensionListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ExtensionViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ExtensionRoutingModule {
}
