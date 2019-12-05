
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SchoolsEquippedByOther } from 'app/shared/models/schools-equipped-by-other';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SchoolsEquippedByOtherEditComponent } from '../schools-equipped-by-other-edit/schools-equipped-by-other-edit.component';
import { SchoolsEquippedByOtherNewComponent } from '../schools-equipped-by-other-new/schools-equipped-by-other-new.component';
import { SchoolsEquippedByOtherViewComponent } from '../schools-equipped-by-other-view/schools-equipped-by-other-view.component';
import { SchoolsEquippedByOtherService } from '../shared/schools-equipped-by-other.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-schools-equipped-by-other-list',
  templateUrl: './schools-equipped-by-other-list.component.html',
  styleUrls: ['./schools-equipped-by-other-list.component.scss'],
  providers: []
})

export class SchoolsEquippedByOtherListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private processingTypesService: LookupService;
private providersService: LookupService;
private constructionTypesService: LookupService;

  
equipmentTypeSelectOptions: MaterialSelectOptions;
providerSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('equipmentType', { static: true }) EquipmentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('provider', { static: true }) ProviderSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSchoolsEquippedByOther: SchoolsEquippedByOther;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اسم البند', field: 'itemName' }),
	new GridColumnOptions({ headerName: 'الكمية', field: 'quantity' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SchoolsEquippedByOtherViewComponent,
    editDialogClassType: SchoolsEquippedByOtherEditComponent,
    newDialogClassType: SchoolsEquippedByOtherNewComponent,
  });
    constructor(
        injector: Injector,
        public schoolsEquippedByOtherService: SchoolsEquippedByOtherService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSchoolsEquippedByOther = new SchoolsEquippedByOther();

    
	this.equipmentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.providerSelectOptions = new MaterialSelectOptions({
	 data: this.providersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الجهة المجهزة',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.searchForm = this.formBuilder.group({
     	constructionPlanYear : [],
	schoolNumber : [],
	extensionNumber : [],
	equipmentType : [],
	provider : [],
	constructionType : []
    });

     
  }

  getSchoolsEquippedByOthersPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SchoolsEquippedByOther[]> => {
    return this.schoolsEquippedByOtherService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.schoolsEquippedByOtherService.delete(param.data.id)
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
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.providersService = new LookupService('providers', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}

