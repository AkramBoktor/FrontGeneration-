
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SchoolsClosedToNature } from 'app/shared/models/schools-closed-to-nature';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SchoolsClosedToNatureEditComponent } from '../schools-closed-to-nature-edit/schools-closed-to-nature-edit.component';
import { SchoolsClosedToNatureNewComponent } from '../schools-closed-to-nature-new/schools-closed-to-nature-new.component';
import { SchoolsClosedToNatureViewComponent } from '../schools-closed-to-nature-view/schools-closed-to-nature-view.component';
import { SchoolsClosedToNatureService } from '../shared/schools-closed-to-nature.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-schools-closed-to-nature-list',
  templateUrl: './schools-closed-to-nature-list.component.html',
  styleUrls: ['./schools-closed-to-nature-list.component.scss'],
  providers: []
})

export class SchoolsClosedToNatureListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;
private closureTypesService: LookupService;


  
governorateCodeSelectOptions: MaterialSelectOptions;
closureTypeSelectOptions: MaterialSelectOptions;
reasonsforclosureSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorateCode', { static: true }) GovernorateCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('closureType', { static: true }) ClosureTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('reasonsforclosure', { static: true }) ReasonsforclosureSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSchoolsClosedToNature: SchoolsClosedToNature;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الرقم التعريفى ', field: 'iDNumber' }),
	new GridColumnOptions({ headerName: 'ملاحظات', field: 'notes' }),
	new GridColumnOptions({ headerName: 'كود المحافظه', field: 'governorateCode' }),
	new GridColumnOptions({ headerName: 'نوع الاغلاق', field: 'closureType' }),
	new GridColumnOptions({ headerName: 'اسباب الاغلاق', field: 'reasonsforclosure' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SchoolsClosedToNatureViewComponent,
    editDialogClassType: SchoolsClosedToNatureEditComponent,
    newDialogClassType: SchoolsClosedToNatureNewComponent,
  });
    constructor(
        injector: Injector,
        public schoolsClosedToNatureService: SchoolsClosedToNatureService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSchoolsClosedToNature = new SchoolsClosedToNature();

    
	this.governorateCodeSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المحافظه',
	});

	this.closureTypeSelectOptions = new MaterialSelectOptions({
	 data: this.closureTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاغلاق',
	});

	this.reasonsforclosureSelectOptions = new MaterialSelectOptions({
	 data: this.closureTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'اسباب الاغلاق',
	});


    this.searchForm = this.formBuilder.group({
     	iDNumber : [],
	notes : [],
	governorateCode : [],
	closureType : [],
	reasonsforclosure : []
    });

     
  }

  getSchoolsClosedToNaturePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SchoolsClosedToNature[]> => {
    return this.schoolsClosedToNatureService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.schoolsClosedToNatureService.delete(param.data.id)
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
this.closureTypesService = new LookupService('closuretypes', this.http);
this.closureTypesService = new LookupService('closuretypes', this.http);
  }
}

