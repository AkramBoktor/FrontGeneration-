import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BasicMaterialCodeGuard } from './shared/basic-material-code.guard';
import { BasicMaterialCodeNewComponent } from './basic-material-code-new/basic-material-code-new.component';
import { BasicMaterialCodeEditComponent } from './basic-material-code-edit/basic-material-code-edit.component';
import { BasicMaterialCodeListComponent } from './basic-material-code-list/basic-material-code-list.component';
import { BasicMaterialCodeViewComponent } from './basic-material-code-view/basic-material-code-view.component';

const routes: Routes = [
  {
    path: '',
    component: BasicMaterialCodeListComponent,
    canActivate: [BasicMaterialCodeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BasicMaterialCodeNewComponent,
    canActivate: [BasicMaterialCodeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BasicMaterialCodeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BasicMaterialCodeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BasicMaterialCodeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BasicMaterialCodeRoutingModule {
}
