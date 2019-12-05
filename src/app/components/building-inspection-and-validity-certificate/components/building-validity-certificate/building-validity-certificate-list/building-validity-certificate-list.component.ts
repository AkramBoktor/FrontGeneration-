
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { BuildingValidityCertificate } from 'app/shared/models/building-validity-certificate';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BuildingValidityCertificateEditComponent } from '../building-validity-certificate-edit/building-validity-certificate-edit.component';
import { BuildingValidityCertificateNewComponent } from '../building-validity-certificate-new/building-validity-certificate-new.component';
import { BuildingValidityCertificateViewComponent } from '../building-validity-certificate-view/building-validity-certificate-view.component';
import { BuildingValidityCertificateService } from '../shared/building-validity-certificate.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-building-validity-certificate-list',
  templateUrl: './building-validity-certificate-list.component.html',
  styleUrls: ['./building-validity-certificate-list.component.scss'],
  providers: []
})

export class BuildingValidityCertificateListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;
private validityPositionsService: LookupService;
private educationValiditiesService: LookupService;

  
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
validityPositionSelectOptions: MaterialSelectOptions;
educationValiditySelectOptions: MaterialSelectOptions;

  
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('validityPosition', { static: true }) ValidityPositionSelectComponent: MaterialSelectComponent;
	@ViewChild('educationValidity', { static: true }) EducationValiditySelectComponent: MaterialSelectComponent;

  
  @Input() selectedBuildingValidityCertificate: BuildingValidityCertificate;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'عنوان المدرسة', field: 'schoolAddress' }),
	new GridColumnOptions({ headerName: 'تاريخ المعاينة', field: 'previewDate' }),
	new GridColumnOptions({ headerName: 'ت. بداية', field: 'startDate' }),
	new GridColumnOptions({ headerName: 'ت.النهاية', field: 'endDate' }),
	new GridColumnOptions({ headerName: 'نوغ البيان', field: 'statementType' }),
	new GridColumnOptions({ headerName: 'النص', field: 'text' }),
	new GridColumnOptions({ headerName: 'القسم/المركز', field: 'sectionCenter' }),
	new GridColumnOptions({ headerName: 'القرية/الشياخة', field: 'village' }),
	new GridColumnOptions({ headerName: 'الادارة التعليمية', field: 'educationalAdministration' }),
	new GridColumnOptions({ headerName: 'موقف الصلاحية', field: 'validityPosition' }),
	new GridColumnOptions({ headerName: 'صلاحية المدرسة للعملية التعليميه', field: 'educationValidity' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BuildingValidityCertificateViewComponent,
    editDialogClassType: BuildingValidityCertificateEditComponent,
    newDialogClassType: BuildingValidityCertificateNewComponent,
  });
    constructor(
        injector: Injector,
        public buildingValidityCertificateService: BuildingValidityCertificateService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBuildingValidityCertificate = new BuildingValidityCertificate();

    
	this.sectionCenterSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القسم/المركز',
	});

	this.villageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القرية/الشياخة',
	});

	this.educationalAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة التعليمية',
	});

	this.validityPositionSelectOptions = new MaterialSelectOptions({
	 data: this.validityPositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف الصلاحية',
	});

	this.educationValiditySelectOptions = new MaterialSelectOptions({
	 data: this.educationValiditiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صلاحية المدرسة للعملية التعليميه',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	schoolAddress : [],
	previewDate : [],
	startDate : [],
	endDate : [],
	statementType : [],
	text : [],
	sectionCenter : [],
	village : [],
	educationalAdministration : [],
	validityPosition : [],
	educationValidity : []
    });

     
  }

  getBuildingValidityCertificatesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BuildingValidityCertificate[]> => {
    return this.buildingValidityCertificateService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.buildingValidityCertificateService.delete(param.data.id)
      .pipe(take(1))
      .subscribe(() => this.grid.refreshData());
  }

  onBeginSearch(): void {
    this.grid.beginSearch(this.searchForm.value);
  }

  onCreate(): void {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  getControls(name: string) {
    return this.searchForm.get(name);
  }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
this.validityPositionsService = new LookupService('validitypositions', this.http);
this.educationValiditiesService = new LookupService('educationvalidities', this.http);
  }
}

