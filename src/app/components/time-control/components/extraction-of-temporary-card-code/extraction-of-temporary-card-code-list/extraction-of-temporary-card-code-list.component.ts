
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ExtractionOfTemporaryCardCode } from 'app/shared/models/extraction-of-temporary-card-code';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExtractionOfTemporaryCardCodeEditComponent } from '../extraction-of-temporary-card-code-edit/extraction-of-temporary-card-code-edit.component';
import { ExtractionOfTemporaryCardCodeNewComponent } from '../extraction-of-temporary-card-code-new/extraction-of-temporary-card-code-new.component';
import { ExtractionOfTemporaryCardCodeViewComponent } from '../extraction-of-temporary-card-code-view/extraction-of-temporary-card-code-view.component';
import { ExtractionOfTemporaryCardCodeService } from '../shared/extraction-of-temporary-card-code.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-extraction-of-temporary-card-code-list',
  templateUrl: './extraction-of-temporary-card-code-list.component.html',
  styleUrls: ['./extraction-of-temporary-card-code-list.component.scss'],
  providers: []
})

export class ExtractionOfTemporaryCardCodeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private cardCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
cardCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('cardCode', { static: true }) CardCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedExtractionOfTemporaryCardCode: ExtractionOfTemporaryCardCode;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الكارت الؤقت', field: 'temporaryCardNumber' }),
	new GridColumnOptions({ headerName: 'اصدار الرقم المؤقت', field: 'temporaryNumberIssuing' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'كود الكارت', field: 'cardCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ExtractionOfTemporaryCardCodeViewComponent,
    editDialogClassType: ExtractionOfTemporaryCardCodeEditComponent,
    newDialogClassType: ExtractionOfTemporaryCardCodeNewComponent,
  });
    constructor(
        injector: Injector,
        public extractionOfTemporaryCardCodeService: ExtractionOfTemporaryCardCodeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedExtractionOfTemporaryCardCode = new ExtractionOfTemporaryCardCode();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.cardCodeSelectOptions = new MaterialSelectOptions({
	 data: this.cardCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الكارت',
	});


    this.searchForm = this.formBuilder.group({
     	branchCode : [],
	cardCode : []
    });

     
  }

  getExtractionOfTemporaryCardCodePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ExtractionOfTemporaryCardCode[]> => {
    return this.extractionOfTemporaryCardCodeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.extractionOfTemporaryCardCodeService.delete(param.data.id)
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
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.cardCodesService = new LookupService('cardcodes', this.http);
  }
}

