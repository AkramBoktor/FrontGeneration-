import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AnalysisValueGuard } from './shared/analysis-value.guard';
import { AnalysisValueNewComponent } from './analysis-value-new/analysis-value-new.component';
import { AnalysisValueEditComponent } from './analysis-value-edit/analysis-value-edit.component';
import { AnalysisValueListComponent } from './analysis-value-list/analysis-value-list.component';
import { AnalysisValueViewComponent } from './analysis-value-view/analysis-value-view.component';

const routes: Routes = [
  {
    path: '',
    component: AnalysisValueListComponent,
    canActivate: [AnalysisValueGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AnalysisValueNewComponent,
    canActivate: [AnalysisValueGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AnalysisValueEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AnalysisValueListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AnalysisValueViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AnalysisValueRoutingModule {
}
