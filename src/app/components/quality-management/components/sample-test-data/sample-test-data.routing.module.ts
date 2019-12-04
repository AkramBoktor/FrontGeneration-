import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SampleTestDataGuard } from './shared/sample-test-data.guard';
import { SampleTestDataNewComponent } from './sample-test-data-new/sample-test-data-new.component';
import { SampleTestDataEditComponent } from './sample-test-data-edit/sample-test-data-edit.component';
import { SampleTestDataListComponent } from './sample-test-data-list/sample-test-data-list.component';
import { SampleTestDataViewComponent } from './sample-test-data-view/sample-test-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: SampleTestDataListComponent,
    canActivate: [SampleTestDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SampleTestDataNewComponent,
    canActivate: [SampleTestDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SampleTestDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SampleTestDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SampleTestDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SampleTestDataRoutingModule {
}
