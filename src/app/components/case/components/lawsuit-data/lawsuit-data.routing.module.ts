import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LawsuitDataEditComponent } from './lawsuit-data-edit/lawsuit-data-edit.component';
import { LawsuitDataListComponent } from './lawsuit-data-list/lawsuit-data-list.component';
import { LawsuitDataNewComponent } from './lawsuit-data-new/lawsuit-data-new.component';
import { LawsuitDataViewComponent } from './lawsuit-data-view/lawsuit-data-view.component';
import { LawsuitDataGuard } from './shared/lawsuit-data.guard';

const routes: Routes = [
  {
    path: '',
    component: LawsuitDataListComponent,
    canActivate: [LawsuitDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: LawsuitDataNewComponent,
    canActivate: [LawsuitDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: LawsuitDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: LawsuitDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: LawsuitDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LawsuitDataRoutingModule {
}
