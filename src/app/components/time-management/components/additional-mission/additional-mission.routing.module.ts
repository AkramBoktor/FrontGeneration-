import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AdditionalMissionGuard } from './shared/additional-mission.guard';
import { AdditionalMissionNewComponent } from './additional-mission-new/additional-mission-new.component';
import { AdditionalMissionEditComponent } from './additional-mission-edit/additional-mission-edit.component';
import { AdditionalMissionListComponent } from './additional-mission-list/additional-mission-list.component';
import { AdditionalMissionViewComponent } from './additional-mission-view/additional-mission-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdditionalMissionListComponent,
    canActivate: [AdditionalMissionGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AdditionalMissionNewComponent,
    canActivate: [AdditionalMissionGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AdditionalMissionEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AdditionalMissionListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AdditionalMissionViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AdditionalMissionRoutingModule {
}
