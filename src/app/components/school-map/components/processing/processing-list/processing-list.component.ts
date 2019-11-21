
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { Processing } from 'app/shared/models/processing';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ProcessingEditComponent } from '../processing-edit/processing-edit.component';
import { ProcessingNewComponent } from '../processing-new/processing-new.component';
import { ProcessingViewComponent } from '../processing-view/processing-view.component';
import { ProcessingService } from '../shared/processing.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-processing-list',
  templateUrl: './processing-list.component.html',
  styleUrls: ['./processing-list.component.scss'],
  providers: []
})

export class ProcessingListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private educationalSpacesService: LookupService;
private processingTypesService: LookupService;

  
spaceCodeSelectOptions: MaterialSelectOptions;
processingTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('spaceCode', { static: true }) SpaceCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedProcessing: Processing;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'مسلسل الملحق', field: 'serialSupplement' }),
	new GridColumnOptions({ headerName: 'رقم الدور', field: 'floorNumber' }),
	new GridColumnOptions({ headerName: 'العدد من التجهيز', field: 'processingNumber' }),
	new GridColumnOptions({ headerName: 'كود المركز الاقليمي', field: 'regionalCenterCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'كود الفراغ', field: 'spaceCode' }),
	new GridColumnOptions({ headerName: 'نوع التجهيز', field: 'processingType' }),
	new GridColumnOptions({ headerName: 'الحاله للتجهيز', field: 'processingState' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ProcessingViewComponent,
    editDialogClassType: ProcessingEditComponent,
    newDialogClassType: ProcessingNewComponent,
  });
    constructor(
        injector: Injector,
        public processingService: ProcessingService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedProcessing = new Processing();

    
	this.spaceCodeSelectOptions = new MaterialSelectOptions({
	 data: this.educationalSpacesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفراغ',
	});

	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	serialSupplement : [],
	floorNumber : [],
	processingNumber : [],
	spaceCode : [],
	processingType : []
    });

     
  }

  getProcessingsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Processing[]> => {
    return this.processingService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.processingService.delete(param.data.id)
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
    this.educationalSpacesService = new LookupService('educationalspaces', this.http);
this.processingTypesService = new LookupService('processingtypes', this.http);
  }
}

