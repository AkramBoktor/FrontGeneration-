
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SchoolMapComponent } from './school-map.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolMapComponent,
  },
  
{
    path: 'boundaries-of-the-public-site', loadChildren: './components/boundaries-of-the-public-site/boundaries-of-the-public-site.module#BoundariesOfThePublicSiteModule',
    data: {
      moduleName: 'BoundariesOfThePublicSite'
    },
},

{
    path: 'influential-ocean', loadChildren: './components/influential-ocean/influential-ocean.module#InfluentialOceanModule',
    data: {
      moduleName: 'InfluentialOcean'
    },
},

{
    path: 'level', loadChildren: './components/level/level.module#LevelModule',
    data: {
      moduleName: 'Level'
    },
},

{
    path: 'playground-data', loadChildren: './components/playground-data/playground-data.module#PlaygroundDataModule',
    data: {
      moduleName: 'PlaygroundData'
    },
},

{
    path: 'private-center-data', loadChildren: './components/private-center-data/private-center-data.module#PrivateCenterDataModule',
    data: {
      moduleName: 'PrivateCenterData'
    },
},

{
    path: 'processing', loadChildren: './components/processing/processing.module#ProcessingModule',
    data: {
      moduleName: 'Processing'
    },
},

{
    path: 'public-water-network', loadChildren: './components/public-water-network/public-water-network.module#PublicWaterNetworkModule',
    data: {
      moduleName: 'PublicWaterNetwork'
    },
},

{
    path: 'school-data', loadChildren: './components/school-data/school-data.module#SchoolDataModule',
    data: {
      moduleName: 'SchoolData'
    },
},

{
    path: 'school-period', loadChildren: './components/school-period/school-period.module#SchoolPeriodModule',
    data: {
      moduleName: 'SchoolPeriod'
    },
},

{
    path: 'educational-building-data', loadChildren: './components/educational-building-data/educational-building-data.module#EducationalBuildingDataModule',
    data: {
      moduleName: 'EducationalBuildingData'
    },
},

{
    path: 'educational-studies', loadChildren: './components/educational-studies/educational-studies.module#EducationalStudiesModule',
    data: {
      moduleName: 'EducationalStudies'
    },
},

{
    path: 'extension', loadChildren: './components/extension/extension.module#ExtensionModule',
    data: {
      moduleName: 'Extension'
    },
},

{
    path: 'fence-file', loadChildren: './components/fence-file/fence-file.module#FenceFileModule',
    data: {
      moduleName: 'FenceFile'
    },
},

{
    path: 'gate', loadChildren: './components/gate/gate.module#GateModule',
    data: {
      moduleName: 'Gate'
    },
},

{
    path: 'general-location', loadChildren: './components/general-location/general-location.module#GeneralLocationModule',
    data: {
      moduleName: 'GeneralLocation'
    },
},

{
    path: 'general-site', loadChildren: './components/general-site/general-site.module#GeneralSiteModule',
    data: {
      moduleName: 'GeneralSite'
    },
},

{
    path: 'hosted-school', loadChildren: './components/hosted-school/hosted-school.module#HostedSchoolModule',
    data: {
      moduleName: 'HostedSchool'
    },
},

{
    path: 'area', loadChildren: './components/area/area.module#AreaModule',
    data: {
      moduleName: 'Area'
    },
},

{
    path: 'boundaries-of-the-public-site', loadChildren: './components/boundaries-of-the-public-site/boundaries-of-the-public-site.module#BoundariesOfThePublicSiteModule',
    data: {
      moduleName: 'BoundariesOfThePublicSite'
    },
},

{
    path: 'influential-ocean', loadChildren: './components/influential-ocean/influential-ocean.module#InfluentialOceanModule',
    data: {
      moduleName: 'InfluentialOcean'
    },
},

{
    path: 'level', loadChildren: './components/level/level.module#LevelModule',
    data: {
      moduleName: 'Level'
    },
},

{
    path: 'playground-data', loadChildren: './components/playground-data/playground-data.module#PlaygroundDataModule',
    data: {
      moduleName: 'PlaygroundData'
    },
},

{
    path: 'private-center-data', loadChildren: './components/private-center-data/private-center-data.module#PrivateCenterDataModule',
    data: {
      moduleName: 'PrivateCenterData'
    },
},

{
    path: 'processing', loadChildren: './components/processing/processing.module#ProcessingModule',
    data: {
      moduleName: 'Processing'
    },
},

{
    path: 'public-water-network', loadChildren: './components/public-water-network/public-water-network.module#PublicWaterNetworkModule',
    data: {
      moduleName: 'PublicWaterNetwork'
    },
},

{
    path: 'school-data', loadChildren: './components/school-data/school-data.module#SchoolDataModule',
    data: {
      moduleName: 'SchoolData'
    },
},

{
    path: 'school-period', loadChildren: './components/school-period/school-period.module#SchoolPeriodModule',
    data: {
      moduleName: 'SchoolPeriod'
    },
},

{
    path: 'educational-building-data', loadChildren: './components/educational-building-data/educational-building-data.module#EducationalBuildingDataModule',
    data: {
      moduleName: 'EducationalBuildingData'
    },
},

{
    path: 'educational-studies', loadChildren: './components/educational-studies/educational-studies.module#EducationalStudiesModule',
    data: {
      moduleName: 'EducationalStudies'
    },
},

{
    path: 'extension', loadChildren: './components/extension/extension.module#ExtensionModule',
    data: {
      moduleName: 'Extension'
    },
},

{
    path: 'fence-file', loadChildren: './components/fence-file/fence-file.module#FenceFileModule',
    data: {
      moduleName: 'FenceFile'
    },
},

{
    path: 'gate', loadChildren: './components/gate/gate.module#GateModule',
    data: {
      moduleName: 'Gate'
    },
},

{
    path: 'general-location', loadChildren: './components/general-location/general-location.module#GeneralLocationModule',
    data: {
      moduleName: 'GeneralLocation'
    },
},

{
    path: 'general-site', loadChildren: './components/general-site/general-site.module#GeneralSiteModule',
    data: {
      moduleName: 'GeneralSite'
    },
},

{
    path: 'hosted-school', loadChildren: './components/hosted-school/hosted-school.module#HostedSchoolModule',
    data: {
      moduleName: 'HostedSchool'
    },
},

{
    path: 'area', loadChildren: './components/area/area.module#AreaModule',
    data: {
      moduleName: 'Area'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SchoolMapRoutingModule {
}

