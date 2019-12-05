
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { PublishingData } from 'app/shared/models/publishing-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PublishingDataEditComponent } from '../publishing-data-edit/publishing-data-edit.component';
import { PublishingDataNewComponent } from '../publishing-data-new/publishing-data-new.component';
import { PublishingDataViewComponent } from '../publishing-data-view/publishing-data-view.component';
import { PublishingDataService } from '../shared/publishing-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-publishing-data-list',
  templateUrl: './publishing-data-list.component.html',
  styleUrls: ['./publishing-data-list.component.scss'],
  providers: []
})

export class PublishingDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private offeringTypesService: LookupService;
private publishingAuthoritiesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
newspaperNameSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('newspaperName', { static: true }) NewspaperNameSelectComponent: MaterialSelectComponent;

  
  @Input() selectedPublishingData: PublishingData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'رقم النشر', field: 'publicationNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ النشر', field: 'publicationDate' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'اسم الجريدة', field: 'newspaperName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PublishingDataViewComponent,
    editDialogClassType: PublishingDataEditComponent,
    newDialogClassType: PublishingDataNewComponent,
  });
    constructor(
        injector: Injector,
        public publishingDataService: PublishingDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPublishingData = new PublishingData();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.newspaperNameSelectOptions = new MaterialSelectOptions({
	 data: this.publishingAuthoritiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'اسم الجريدة',
	});


    this.searchForm = this.formBuilder.group({
     	bidNumber : [],
	publicationNumber : [],
	publicationDate : [],
	offeringType : [],
	newspaperName : []
    });

     
  }

  getPublishingDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PublishingData[]> => {
    return this.publishingDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.publishingDataService.delete(param.data.id)
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
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.publishingAuthoritiesService = new LookupService('publishingauthorities', this.http);
  }
}

