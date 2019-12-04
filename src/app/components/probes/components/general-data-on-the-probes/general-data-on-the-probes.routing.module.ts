import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { GeneralDataOnTheProbesGuard } from './shared/general-data-on-the-probes.guard';
import { GeneralDataOnTheProbesNewComponent } from './general-data-on-the-probes-new/general-data-on-the-probes-new.component';
import { GeneralDataOnTheProbesEditComponent } from './general-data-on-the-probes-edit/general-data-on-the-probes-edit.component';
import { GeneralDataOnTheProbesListComponent } from './general-data-on-the-probes-list/general-data-on-the-probes-list.component';
import { GeneralDataOnTheProbesViewComponent } from './general-data-on-the-probes-view/general-data-on-the-probes-view.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralDataOnTheProbesListComponent,
    canActivate: [GeneralDataOnTheProbesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: GeneralDataOnTheProbesNewComponent,
    canActivate: [GeneralDataOnTheProbesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: GeneralDataOnTheProbesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: GeneralDataOnTheProbesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: GeneralDataOnTheProbesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class GeneralDataOnTheProbesRoutingModule {
}
