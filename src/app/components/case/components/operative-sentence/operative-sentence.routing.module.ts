import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperativeSentenceEditComponent } from './operative-sentence-edit/operative-sentence-edit.component';
import { OperativeSentenceListComponent } from './operative-sentence-list/operative-sentence-list.component';
import { OperativeSentenceNewComponent } from './operative-sentence-new/operative-sentence-new.component';
import { OperativeSentenceViewComponent } from './operative-sentence-view/operative-sentence-view.component';
import { OperativeSentenceGuard } from './shared/operative-sentence.guard';

const routes: Routes = [
  {
    path: '',
    component: OperativeSentenceListComponent,
    canActivate: [OperativeSentenceGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: OperativeSentenceNewComponent,
    canActivate: [OperativeSentenceGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: OperativeSentenceEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: OperativeSentenceListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: OperativeSentenceViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class OperativeSentenceRoutingModule {
}
