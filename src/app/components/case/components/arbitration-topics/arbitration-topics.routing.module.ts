import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArbitrationTopicsEditComponent } from './arbitration-topics-edit/arbitration-topics-edit.component';
import { ArbitrationTopicsListComponent } from './arbitration-topics-list/arbitration-topics-list.component';
import { ArbitrationTopicsNewComponent } from './arbitration-topics-new/arbitration-topics-new.component';
import { ArbitrationTopicsViewComponent } from './arbitration-topics-view/arbitration-topics-view.component';
import { ArbitrationTopicsGuard } from './shared/arbitration-topics.guard';

const routes: Routes = [
  {
    path: '',
    component: ArbitrationTopicsListComponent,
    canActivate: [ArbitrationTopicsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ArbitrationTopicsNewComponent,
    canActivate: [ArbitrationTopicsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ArbitrationTopicsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ArbitrationTopicsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ArbitrationTopicsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ArbitrationTopicsRoutingModule {
}
