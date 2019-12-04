
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TimingAndPricingComponent } from './timing-and-pricing.component';


const routes: Routes = [
  {
    path: '',
    component: TimingAndPricingComponent,
  },
  
{
    path: 'final-clearance-cycle', loadChildren: './components/final-clearance-cycle/final-clearance-cycle.module#FinalClearanceCycleModule',
    data: {
      moduleName: 'FinalClearanceCycle'
    },
},

{
    path: 'obstacles-and-measures-taken', loadChildren: './components/obstacles-and-measures-taken/obstacles-and-measures-taken.module#ObstaclesAndMeasuresTakenModule',
    data: {
      moduleName: 'ObstaclesAndMeasuresTaken'
    },
},

{
    path: 'project-periods', loadChildren: './components/project-periods/project-periods.module#ProjectPeriodsModule',
    data: {
      moduleName: 'ProjectPeriods'
    },
},

{
    path: 'contractor-durations', loadChildren: './components/contractor-durations/contractor-durations.module#ContractorDurationsModule',
    data: {
      moduleName: 'ContractorDurations'
    },
},


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TimingAndPricingRoutingModule {
}

