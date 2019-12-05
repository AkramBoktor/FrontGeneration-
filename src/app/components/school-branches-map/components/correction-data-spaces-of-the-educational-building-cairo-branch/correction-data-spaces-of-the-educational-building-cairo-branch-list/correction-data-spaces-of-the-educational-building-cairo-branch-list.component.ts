
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranch } from 'app/shared/models/correction-data-spaces-of-the-educational-building-cairo-branch';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranchEditComponent } from '../correction-data-spaces-of-the-educational-building-cairo-branch-edit/correction-data-spaces-of-the-educational-building-cairo-branch-edit.component';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranchNewComponent } from '../correction-data-spaces-of-the-educational-building-cairo-branch-new/correction-data-spaces-of-the-educational-building-cairo-branch-new.component';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranchViewComponent } from '../correction-data-spaces-of-the-educational-building-cairo-branch-view/correction-data-spaces-of-the-educational-building-cairo-branch-view.component';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranchService } from '../shared/correction-data-spaces-of-the-educational-building-cairo-branch.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-correction-data-spaces-of-the-educational-building-cairo-branch-list',
  templateUrl: './correction-data-spaces-of-the-educational-building-cairo-branch-list.component.html',
  styleUrls: ['./correction-data-spaces-of-the-educational-building-cairo-branch-list.component.scss'],
  providers: []
})

export class CorrectionDataSpacesOfTheEducationalBuildingCairoBranchListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;
private educationalLevelsService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;
stageSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('stage', { static: true }) StageSelectComponent: MaterialSelectComponent;

  
  @Input() selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranch: CorrectionDataSpacesOfTheEducationalBuildingCairoBranch;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'المحافظه ', field: 'governorate' }),
	new GridColumnOptions({ headerName: 'القسم', field: 'department' }),
	new GridColumnOptions({ headerName: 'المرحله', field: 'stage' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CorrectionDataSpacesOfTheEducationalBuildingCairoBranchViewComponent,
    editDialogClassType: CorrectionDataSpacesOfTheEducationalBuildingCairoBranchEditComponent,
    newDialogClassType: CorrectionDataSpacesOfTheEducationalBuildingCairoBranchNewComponent,
  });
    constructor(
        injector: Injector,
        public correctionDataSpacesOfTheEducationalBuildingCairoBranchService: CorrectionDataSpacesOfTheEducationalBuildingCairoBranchService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranch = new CorrectionDataSpacesOfTheEducationalBuildingCairoBranch();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه ',
	});

	this.departmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القسم',
	});

	this.stageSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المرحله',
	});


    this.searchForm = this.formBuilder.group({
     	governorate : [],
	department : [],
	stage : []
    });

     
  }

  getCorrectionDataSpacesOfTheEducationalBuildingCairoBranchPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CorrectionDataSpacesOfTheEducationalBuildingCairoBranch[]> => {
    return this.correctionDataSpacesOfTheEducationalBuildingCairoBranchService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.correctionDataSpacesOfTheEducationalBuildingCairoBranchService.delete(param.data.id)
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
    this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
  }
}

