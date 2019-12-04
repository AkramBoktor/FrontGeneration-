import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ReportOnTheResistanceOfReinforcedConcreteGuard } from './shared/report-on-the-resistance-of-reinforced-concrete.guard';
import { ReportOnTheResistanceOfReinforcedConcreteNewComponent } from './report-on-the-resistance-of-reinforced-concrete-new/report-on-the-resistance-of-reinforced-concrete-new.component';
import { ReportOnTheResistanceOfReinforcedConcreteEditComponent } from './report-on-the-resistance-of-reinforced-concrete-edit/report-on-the-resistance-of-reinforced-concrete-edit.component';
import { ReportOnTheResistanceOfReinforcedConcreteListComponent } from './report-on-the-resistance-of-reinforced-concrete-list/report-on-the-resistance-of-reinforced-concrete-list.component';
import { ReportOnTheResistanceOfReinforcedConcreteViewComponent } from './report-on-the-resistance-of-reinforced-concrete-view/report-on-the-resistance-of-reinforced-concrete-view.component';

const routes: Routes = [
  {
    path: '',
    component: ReportOnTheResistanceOfReinforcedConcreteListComponent,
    canActivate: [ReportOnTheResistanceOfReinforcedConcreteGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ReportOnTheResistanceOfReinforcedConcreteNewComponent,
    canActivate: [ReportOnTheResistanceOfReinforcedConcreteGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ReportOnTheResistanceOfReinforcedConcreteEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ReportOnTheResistanceOfReinforcedConcreteListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ReportOnTheResistanceOfReinforcedConcreteViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ReportOnTheResistanceOfReinforcedConcreteRoutingModule {
}
