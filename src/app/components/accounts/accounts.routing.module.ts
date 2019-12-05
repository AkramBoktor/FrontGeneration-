
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AccountsComponent } from './accounts.component';


const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
  },
  
{
    path: 'data-entry-form-129-corrections', loadChildren: './components/data-entry-form-129-corrections/data-entry-form-129-corrections.module#DataEntryForm129CorrectionsModule',
    data: {
      moduleName: 'DataEntryForm129Corrections'
    },
},

{
    path: 'employees-who-have-correction', loadChildren: './components/employees-who-have-correction/employees-who-have-correction.module#EmployeesWhoHaveCorrectionModule',
    data: {
      moduleName: 'EmployeesWhoHaveCorrection'
    },
},

{
    path: 'recording-corrections-for-employees', loadChildren: './components/recording-corrections-for-employees/recording-corrections-for-employees.module#RecordingCorrectionsForEmployeesModule',
    data: {
      moduleName: 'RecordingCorrectionsForEmployees'
    },
},

{
    path: 'reward', loadChildren: './components/reward/reward.module#RewardModule',
    data: {
      moduleName: 'Reward'
    },
},

{
    path: 'data-entry-form-129-at-the-management-level', loadChildren: './components/data-entry-form-129-at-the-management-level/data-entry-form-129-at-the-management-level.module#DataEntryForm129AtTheManagementLevelModule',
    data: {
      moduleName: 'DataEntryForm129AtTheManagementLevel'
    },
},

{
    path: 'data-entry-form-129-bonuses-at-the-management-level', loadChildren: './components/data-entry-form-129-bonuses-at-the-management-level/data-entry-form-129-bonuses-at-the-management-level.module#DataEntryForm129BonusesAtTheManagementLevelModule',
    data: {
      moduleName: 'DataEntryForm129BonusesAtTheManagementLevel'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AccountsRoutingModule {
}

