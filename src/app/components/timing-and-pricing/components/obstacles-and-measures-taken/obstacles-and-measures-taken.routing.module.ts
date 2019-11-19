import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ObstaclesAndMeasuresTakenGuard } from './shared/obstacles-and-measures-taken.guard';
import { ObstaclesAndMeasuresTakenNewComponent } from './obstacles-and-measures-taken-new/obstacles-and-measures-taken-new.component';
import { ObstaclesAndMeasuresTakenEditComponent } from './obstacles-and-measures-taken-edit/obstacles-and-measures-taken-edit.component';
import { ObstaclesAndMeasuresTakenListComponent } from './obstacles-and-measures-taken-list/obstacles-and-measures-taken-list.component';
import { ObstaclesAndMeasuresTakenViewComponent } from './obstacles-and-measures-taken-view/obstacles-and-measures-taken-view.component';

const routes: Routes = [
  {
    path: '',
    component: ObstaclesAndMeasuresTakenListComponent,
    canActivate: [ObstaclesAndMeasuresTakenGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ObstaclesAndMeasuresTakenNewComponent,
    canActivate: [ObstaclesAndMeasuresTakenGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ObstaclesAndMeasuresTakenEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ObstaclesAndMeasuresTakenListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ObstaclesAndMeasuresTakenViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ObstaclesAndMeasuresTakenRoutingModule {
}
