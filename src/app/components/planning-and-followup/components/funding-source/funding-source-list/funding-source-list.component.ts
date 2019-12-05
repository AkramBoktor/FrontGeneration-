
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { FundingSource } from 'app/shared/models/funding-source';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FundingSourceEditComponent } from '../funding-source-edit/funding-source-edit.component';
import { FundingSourceNewComponent } from '../funding-source-new/funding-source-new.component';
import { FundingSourceViewComponent } from '../funding-source-view/funding-source-view.component';
import { FundingSourceService } from '../shared/funding-source.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-funding-source-list',
  templateUrl: './funding-source-list.component.html',
  styleUrls: ['./funding-source-list.component.scss'],
  providers: []
})

export class FundingSourceListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedFundingSource: FundingSource;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: '  فئة المصدر', field: 'sourceCategory' }),
	new GridColumnOptions({ headerName: 'رمز المصدر', field: 'sourceCode' }),
	new GridColumnOptions({ headerName: ' اسم المصدر', field: 'sourceName' }),
	new GridColumnOptions({ headerName: '  بداية التمويل', field: 'fundingStart' }),
	new GridColumnOptions({ headerName: '  نهاية التمويل', field: 'fundingEnd' }),
	new GridColumnOptions({ headerName: '  القيمة المقترحة', field: 'suggesteValue' }),
	new GridColumnOptions({ headerName: '  القيمة حتي تاريخة', field: 'dateValue' }),
	new GridColumnOptions({ headerName: ' القيمة في السنة الحالية', field: 'currentYearValue' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: FundingSourceViewComponent,
    editDialogClassType: FundingSourceEditComponent,
    newDialogClassType: FundingSourceNewComponent,
  });
    constructor(
        injector: Injector,
        public fundingSourceService: FundingSourceService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedFundingSource = new FundingSource();

    

    this.searchForm = this.formBuilder.group({
     	sourceCode : [],
	sourceName : [],
	fundingStart : [],
	fundingEnd : []
    });

     
  }

  getFundingSourcePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<FundingSource[]> => {
    return this.fundingSourceService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.fundingSourceService.delete(param.data.id)
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
    
  }
}

