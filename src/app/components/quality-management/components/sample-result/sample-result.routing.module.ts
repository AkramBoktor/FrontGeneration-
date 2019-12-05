import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SampleResultGuard } from './shared/sample-result.guard';
import { SampleResultNewComponent } from './sample-result-new/sample-result-new.component';
import { SampleResultEditComponent } from './sample-result-edit/sample-result-edit.component';
import { SampleResultListComponent } from './sample-result-list/sample-result-list.component';
import { SampleResultViewComponent } from './sample-result-view/sample-result-view.component';

const routes: Routes = [
  {
    path: '',
    component: SampleResultListComponent,
    canActivate: [SampleResultGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SampleResultNewComponent,
    canActivate: [SampleResultGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SampleResultEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SampleResultListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SampleResultViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SampleResultRoutingModule {
}
