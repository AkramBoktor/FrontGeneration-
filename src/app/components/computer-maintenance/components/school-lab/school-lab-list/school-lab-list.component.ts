
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SchoolLab } from 'app/shared/models/school-lab';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SchoolLabEditComponent } from '../school-lab-edit/school-lab-edit.component';
import { SchoolLabNewComponent } from '../school-lab-new/school-lab-new.component';
import { SchoolLabViewComponent } from '../school-lab-view/school-lab-view.component';
import { SchoolLabService } from '../shared/school-lab.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-school-lab-list',
  templateUrl: './school-lab-list.component.html',
  styleUrls: ['./school-lab-list.component.scss'],
  providers: []
})

export class SchoolLabListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private buildingTypesService: LookupService;
private areasService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
areaCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('areaCode', { static: true }) AreaCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSchoolLab: SchoolLab;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'رقم المعمل', field: 'laboratoryNumber' }),
	new GridColumnOptions({ headerName: 'نوع المبني', field: 'buildingType' }),
	new GridColumnOptions({ headerName: 'كود المنطقة', field: 'areaCode' }),
	new GridColumnOptions({ headerName: 'نوع المعمل', field: 'laboratoryType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SchoolLabViewComponent,
    editDialogClassType: SchoolLabEditComponent,
    newDialogClassType: SchoolLabNewComponent,
  });
    constructor(
        injector: Injector,
        public schoolLabService: SchoolLabService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSchoolLab = new SchoolLab();

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبني',
	});

	this.areaCodeSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المنطقة',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	buildingType : [],
	areaCode : []
    });

     
  }

  getSchoolLabsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SchoolLab[]> => {
    return this.schoolLabService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.schoolLabService.delete(param.data.id)
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
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.areasService = new LookupService('areas', this.http);
  }
}

