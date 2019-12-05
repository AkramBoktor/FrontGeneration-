
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { LaboratoryRelatedTest } from 'app/shared/models/laboratory-related-test';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LaboratoryRelatedTestEditComponent } from '../laboratory-related-test-edit/laboratory-related-test-edit.component';
import { LaboratoryRelatedTestNewComponent } from '../laboratory-related-test-new/laboratory-related-test-new.component';
import { LaboratoryRelatedTestViewComponent } from '../laboratory-related-test-view/laboratory-related-test-view.component';
import { LaboratoryRelatedTestService } from '../shared/laboratory-related-test.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-laboratory-related-test-list',
  templateUrl: './laboratory-related-test-list.component.html',
  styleUrls: ['./laboratory-related-test-list.component.scss'],
  providers: []
})

export class LaboratoryRelatedTestListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private laboratoriesService: LookupService;

  
laboratoryCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('laboratoryCode', { static: true }) LaboratoryCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedLaboratoryRelatedTest: LaboratoryRelatedTest;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المادة الأساسية ', field: 'basicMaterialCode' }),
	new GridColumnOptions({ headerName: ' كود لمادة الفرعية', field: 'subMaterialCode' }),
	new GridColumnOptions({ headerName: 'كود الاختبار', field: 'testCode' }),
	new GridColumnOptions({ headerName: 'كود المعمل', field: 'laboratoryCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: LaboratoryRelatedTestViewComponent,
    editDialogClassType: LaboratoryRelatedTestEditComponent,
    newDialogClassType: LaboratoryRelatedTestNewComponent,
  });
    constructor(
        injector: Injector,
        public laboratoryRelatedTestService: LaboratoryRelatedTestService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedLaboratoryRelatedTest = new LaboratoryRelatedTest();

    
	this.laboratoryCodeSelectOptions = new MaterialSelectOptions({
	 data: this.laboratoriesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المعمل',
	});


    this.searchForm = this.formBuilder.group({
     	testCode : [],
	laboratoryCode : []
    });

     
  }

  getLaboratoryRelatedTestsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<LaboratoryRelatedTest[]> => {
    return this.laboratoryRelatedTestService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.laboratoryRelatedTestService.delete(param.data.id)
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
    this.laboratoriesService = new LookupService('laboratories', this.http);
  }
}

