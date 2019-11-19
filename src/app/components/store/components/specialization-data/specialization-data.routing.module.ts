import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SpecializationDataGuard } from './shared/specialization-data.guard';
import { SpecializationDataNewComponent } from './specialization-data-new/specialization-data-new.component';
import { SpecializationDataEditComponent } from './specialization-data-edit/specialization-data-edit.component';
import { SpecializationDataListComponent } from './specialization-data-list/specialization-data-list.component';
import { SpecializationDataViewComponent } from './specialization-data-view/specialization-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: SpecializationDataListComponent,
    canActivate: [SpecializationDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SpecializationDataNewComponent,
    canActivate: [SpecializationDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SpecializationDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SpecializationDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SpecializationDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SpecializationDataRoutingModule {
}
