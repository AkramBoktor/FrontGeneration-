import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SpecifyModelBlankGuard } from './shared/specify-model-blank.guard';
import { SpecifyModelBlankNewComponent } from './specify-model-blank-new/specify-model-blank-new.component';
import { SpecifyModelBlankEditComponent } from './specify-model-blank-edit/specify-model-blank-edit.component';
import { SpecifyModelBlankListComponent } from './specify-model-blank-list/specify-model-blank-list.component';
import { SpecifyModelBlankViewComponent } from './specify-model-blank-view/specify-model-blank-view.component';

const routes: Routes = [
  {
    path: '',
    component: SpecifyModelBlankListComponent,
    canActivate: [SpecifyModelBlankGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SpecifyModelBlankNewComponent,
    canActivate: [SpecifyModelBlankGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SpecifyModelBlankEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SpecifyModelBlankListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SpecifyModelBlankViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SpecifyModelBlankRoutingModule {
}
