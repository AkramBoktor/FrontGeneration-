import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ProcessingGuard } from './shared/processing.guard';
import { ProcessingNewComponent } from './processing-new/processing-new.component';
import { ProcessingEditComponent } from './processing-edit/processing-edit.component';
import { ProcessingListComponent } from './processing-list/processing-list.component';
import { ProcessingViewComponent } from './processing-view/processing-view.component';

const routes: Routes = [
  {
    path: '',
    component: ProcessingListComponent,
    canActivate: [ProcessingGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ProcessingNewComponent,
    canActivate: [ProcessingGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ProcessingEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ProcessingListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ProcessingViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ProcessingRoutingModule {
}
