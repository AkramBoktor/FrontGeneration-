
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SchoolBranchesMapComponent } from './school-branches-map.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolBranchesMapComponent,
  },
  
{
    path: 'record-the-position-of-need-to-be-removed', loadChildren: './components/record-the-position-of-need-to-be-removed/record-the-position-of-need-to-be-removed.module#RecordThePositionOfNeedToBeRemovedModule',
    data: {
      moduleName: 'RecordThePositionOfNeedToBeRemoved'
    },
},

{
    path: 'correction-data-spaces-of-the-educational-building-cairo-branch', loadChildren: './components/correction-data-spaces-of-the-educational-building-cairo-branch/correction-data-spaces-of-the-educational-building-cairo-branch.module#CorrectionDataSpacesOfTheEducationalBuildingCairoBranchModule',
    data: {
      moduleName: 'CorrectionDataSpacesOfTheEducationalBuildingCairoBranch'
    },
},

{
    path: 'data-spaces-of-the-educational-building', loadChildren: './components/data-spaces-of-the-educational-building/data-spaces-of-the-educational-building.module#DataSpacesOfTheEducationalBuildingModule',
    data: {
      moduleName: 'DataSpacesOfTheEducationalBuilding'
    },
},

{
    path: 'drainage-data-for-the-building', loadChildren: './components/drainage-data-for-the-building/drainage-data-for-the-building.module#DrainageDataForTheBuildingModule',
    data: {
      moduleName: 'DrainageDataForTheBuilding'
    },
},

{
    path: 'electrical-connections-to-the-building', loadChildren: './components/electrical-connections-to-the-building/electrical-connections-to-the-building.module#ElectricalConnectionsToTheBuildingModule',
    data: {
      moduleName: 'ElectricalConnectionsToTheBuilding'
    },
},

{
    path: 'gas-appliances-data', loadChildren: './components/gas-appliances-data/gas-appliances-data.module#GasAppliancesDataModule',
    data: {
      moduleName: 'GasAppliancesData'
    },
},

{
    path: 'general-location-of-an-administrative-building', loadChildren: './components/general-location-of-an-administrative-building/general-location-of-an-administrative-building.module#GeneralLocationOfAnAdministrativeBuildingModule',
    data: {
      moduleName: 'GeneralLocationOfAnAdministrativeBuilding'
    },
},

{
    path: 'identification-data-for-an-administrative-building', loadChildren: './components/identification-data-for-an-administrative-building/identification-data-for-an-administrative-building.module#IdentificationDataForAnAdministrativeBuildingModule',
    data: {
      moduleName: 'IdentificationDataForAnAdministrativeBuilding'
    },
},

{
    path: 'incubation-program', loadChildren: './components/incubation-program/incubation-program.module#IncubationProgramModule',
    data: {
      moduleName: 'IncubationProgram'
    },
},

{
    path: 'linking-codes-schools-with-codes-schools-ministry', loadChildren: './components/linking-codes-schools-with-codes-schools-ministry/linking-codes-schools-with-codes-schools-ministry.module#LinkingCodesSchoolsWithCodesSchoolsMinistryModule',
    data: {
      moduleName: 'LinkingCodesSchoolsWithCodesSchoolsMinistry'
    },
},

{
    path: 'number-to-create-id', loadChildren: './components/number-to-create-id/number-to-create-id.module#NumberToCreateIDModule',
    data: {
      moduleName: 'NumberToCreateID'
    },
},

{
    path: 'registration-of-educational-buildings-used-for-general-purposes', loadChildren: './components/registration-of-educational-buildings-used-for-general-purposes/registration-of-educational-buildings-used-for-general-purposes.module#RegistrationOfEducationalBuildingsUsedForGeneralPurposesModule',
    data: {
      moduleName: 'RegistrationOfEducationalBuildingsUsedForGeneralPurposes'
    },
},

{
    path: 'nutrition-data-for-educational-building', loadChildren: './components/nutrition-data-for-educational-building/nutrition-data-for-educational-building.module#NutritionDataForEducationalBuildingModule',
    data: {
      moduleName: 'NutritionDataForEducationalBuilding'
    },
},

{
    path: 'old-plans-before-97', loadChildren: './components/old-plans-before-97/old-plans-before-97.module#OldPlansBefore97Module',
    data: {
      moduleName: 'OldPlansBefore97'
    },
},

{
    path: 'plan-data-before-1997and1998', loadChildren: './components/plan-data-before-1997and1998/plan-data-before-1997and1998.module#PlanDataBefore1997and1998Module',
    data: {
      moduleName: 'PlanDataBefore1997and1998'
    },
},

{
    path: 'removal-restoration-data-of-closed-buildings', loadChildren: './components/removal-restoration-data-of-closed-buildings/removal-restoration-data-of-closed-buildings.module#RemovalRestorationDataOfClosedBuildingsModule',
    data: {
      moduleName: 'RemovalRestorationDataOfClosedBuildings'
    },
},

{
    path: 'schools-closed-to-nature', loadChildren: './components/schools-closed-to-nature/schools-closed-to-nature.module#SchoolsClosedToNatureModule',
    data: {
      moduleName: 'SchoolsClosedToNature'
    },
},

{
    path: 'the-main-roads', loadChildren: './components/the-main-roads/the-main-roads.module#TheMainRoadsModule',
    data: {
      moduleName: 'TheMainRoads'
    },
},

{
    path: 'available-land-position', loadChildren: './components/available-land-position/available-land-position.module#AvailableLandPositionModule',
    data: {
      moduleName: 'AvailableLandPosition'
    },
},

{
    path: 'basic-data-for-the-youth-center', loadChildren: './components/basic-data-for-the-youth-center/basic-data-for-the-youth-center.module#BasicDataForTheYouthCenterModule',
    data: {
      moduleName: 'BasicDataForTheYouthCenter'
    },
},

{
    path: 'basic-data-of-the-educational-building-cairo-branch', loadChildren: './components/basic-data-of-the-educational-building-cairo-branch/basic-data-of-the-educational-building-cairo-branch.module#BasicDataOfTheEducationalBuildingCairoBranchModule',
    data: {
      moduleName: 'BasicDataOfTheEducationalBuildingCairoBranch'
    },
},

{
    path: 'complete-titles-of-educational-buildings', loadChildren: './components/complete-titles-of-educational-buildings/complete-titles-of-educational-buildings.module#CompleteTitlesOfEducationalBuildingsModule',
    data: {
      moduleName: 'CompleteTitlesOfEducationalBuildings'
    },
},

{
    path: 'preparing-students-in-classrooms', loadChildren: './components/preparing-students-in-classrooms/preparing-students-in-classrooms.module#PreparingStudentsInClassroomsModule',
    data: {
      moduleName: 'PreparingStudentsInClassrooms'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SchoolBranchesMapRoutingModule {
}

