
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TemporarySeizureData } from 'app/shared/models/temporary-seizure-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TemporarySeizureDataEditComponent } from '../temporary-seizure-data-edit/temporary-seizure-data-edit.component';
import { TemporarySeizureDataNewComponent } from '../temporary-seizure-data-new/temporary-seizure-data-new.component';
import { TemporarySeizureDataViewComponent } from '../temporary-seizure-data-view/temporary-seizure-data-view.component';
import { TemporarySeizureDataService } from '../shared/temporary-seizure-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-temporary-seizure-data-list',
  templateUrl: './temporary-seizure-data-list.component.html',
  styleUrls: ['./temporary-seizure-data-list.component.scss'],
  providers: []
})

export class TemporarySeizureDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedTemporarySeizureData: TemporarySeizureData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المدرسة', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: 'رقم الاستيلاء المؤقت', field: 'temporarySeizureNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الاستيلاء المؤقت', field: 'dateOfTemporarySeizure' }),
	new GridColumnOptions({ headerName: 'عدد النشر بالوقائع المصرية', field: 'numberOfPublicationsInEgyptianFacts' }),
	new GridColumnOptions({ headerName: 'تاريخ النشر بالوقائع المصرية', field: 'dateOfPublicationInTheEgyptianFacts' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TemporarySeizureDataViewComponent,
    editDialogClassType: TemporarySeizureDataEditComponent,
    newDialogClassType: TemporarySeizureDataNewComponent,
  });
    constructor(
        injector: Injector,
        public temporarySeizureDataService: TemporarySeizureDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTemporarySeizureData = new TemporarySeizureData();

    

    this.searchForm = this.formBuilder.group({
     	schoolNumber : [],
	temporarySeizureNumber : [],
	dateOfTemporarySeizure : [],
	numberOfPublicationsInEgyptianFacts : [],
	dateOfPublicationInTheEgyptianFacts : []
    });

     
  }

  getTemporarySeizureDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TemporarySeizureData[]> => {
    return this.temporarySeizureDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.temporarySeizureDataService.delete(param.data.id)
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

