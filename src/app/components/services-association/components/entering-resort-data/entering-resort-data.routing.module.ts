import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EnteringResortDataGuard } from './shared/entering-resort-data.guard';
import { EnteringResortDataNewComponent } from './entering-resort-data-new/entering-resort-data-new.component';
import { EnteringResortDataEditComponent } from './entering-resort-data-edit/entering-resort-data-edit.component';
import { EnteringResortDataListComponent } from './entering-resort-data-list/entering-resort-data-list.component';
import { EnteringResortDataViewComponent } from './entering-resort-data-view/entering-resort-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: EnteringResortDataListComponent,
    canActivate: [EnteringResortDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EnteringResortDataNewComponent,
    canActivate: [EnteringResortDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EnteringResortDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EnteringResortDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EnteringResortDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EnteringResortDataRoutingModule {
}
