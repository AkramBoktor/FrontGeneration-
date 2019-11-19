import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FinalClearanceCycleGuard } from './shared/final-clearance-cycle.guard';
import { FinalClearanceCycleNewComponent } from './final-clearance-cycle-new/final-clearance-cycle-new.component';
import { FinalClearanceCycleEditComponent } from './final-clearance-cycle-edit/final-clearance-cycle-edit.component';
import { FinalClearanceCycleListComponent } from './final-clearance-cycle-list/final-clearance-cycle-list.component';
import { FinalClearanceCycleViewComponent } from './final-clearance-cycle-view/final-clearance-cycle-view.component';

const routes: Routes = [
  {
    path: '',
    component: FinalClearanceCycleListComponent,
    canActivate: [FinalClearanceCycleGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: FinalClearanceCycleNewComponent,
    canActivate: [FinalClearanceCycleGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: FinalClearanceCycleEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: FinalClearanceCycleListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: FinalClearanceCycleViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class FinalClearanceCycleRoutingModule {
}
