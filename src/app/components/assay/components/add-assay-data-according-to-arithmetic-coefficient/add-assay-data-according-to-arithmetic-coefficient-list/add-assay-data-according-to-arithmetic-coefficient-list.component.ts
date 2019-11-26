
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AddAssayDataAccordingToArithmeticCoefficient } from 'app/shared/models/add-assay-data-according-to-arithmetic-coefficient';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AddAssayDataAccordingToArithmeticCoefficientEditComponent } from '../add-assay-data-according-to-arithmetic-coefficient-edit/add-assay-data-according-to-arithmetic-coefficient-edit.component';
import { AddAssayDataAccordingToArithmeticCoefficientNewComponent } from '../add-assay-data-according-to-arithmetic-coefficient-new/add-assay-data-according-to-arithmetic-coefficient-new.component';
import { AddAssayDataAccordingToArithmeticCoefficientViewComponent } from '../add-assay-data-according-to-arithmetic-coefficient-view/add-assay-data-according-to-arithmetic-coefficient-view.component';
import { AddAssayDataAccordingToArithmeticCoefficientService } from '../shared/add-assay-data-according-to-arithmetic-coefficient.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-add-assay-data-according-to-arithmetic-coefficient-list',
  templateUrl: './add-assay-data-according-to-arithmetic-coefficient-list.component.html',
  styleUrls: ['./add-assay-data-according-to-arithmetic-coefficient-list.component.scss'],
  providers: []
})

export class AddAssayDataAccordingToArithmeticCoefficientListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private modelCodesService: LookupService;
private constructionTypesService: LookupService;
private workTypesService: LookupService;

  
modelCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
workTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('modelCode', { static: true }) ModelCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAddAssayDataAccordingToArithmeticCoefficient: AddAssayDataAccordingToArithmeticCoefficient;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اسم البند', field: 'itemName' }),
	new GridColumnOptions({ headerName: 'الكمية', field: 'quntity' }),
	new GridColumnOptions({ headerName: 'السعر', field: 'price' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AddAssayDataAccordingToArithmeticCoefficientViewComponent,
    editDialogClassType: AddAssayDataAccordingToArithmeticCoefficientEditComponent,
    newDialogClassType: AddAssayDataAccordingToArithmeticCoefficientNewComponent,
  });
    constructor(
        injector: Injector,
        public addAssayDataAccordingToArithmeticCoefficientService: AddAssayDataAccordingToArithmeticCoefficientService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAddAssayDataAccordingToArithmeticCoefficient = new AddAssayDataAccordingToArithmeticCoefficient();

    
	this.modelCodeSelectOptions = new MaterialSelectOptions({
	 data: this.modelCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود النموذج',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	extensionCode : [],
	planYear : [],
	priceYear : [],
	modelCode : [],
	constructionType : [],
	workType : []
    });

     
  }

  getAddAssayDataAccordingToArithmeticCoefficientPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AddAssayDataAccordingToArithmeticCoefficient[]> => {
    return this.addAssayDataAccordingToArithmeticCoefficientService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.addAssayDataAccordingToArithmeticCoefficientService.delete(param.data.id)
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
    this.modelCodesService = new LookupService('modelcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
  }
}

