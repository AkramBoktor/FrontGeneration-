
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { CanceledTender } from 'app/shared/models/canceled-tender';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CanceledTenderEditComponent } from '../canceled-tender-edit/canceled-tender-edit.component';
import { CanceledTenderNewComponent } from '../canceled-tender-new/canceled-tender-new.component';
import { CanceledTenderViewComponent } from '../canceled-tender-view/canceled-tender-view.component';
import { CanceledTenderService } from '../shared/canceled-tender.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-canceled-tender-list',
  templateUrl: './canceled-tender-list.component.html',
  styleUrls: ['./canceled-tender-list.component.scss'],
  providers: []
})

export class CanceledTenderListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
      ];
  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedCanceledTender: CanceledTender;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم مناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'رقم العطاء', field: 'tenderNumber' }),
	new GridColumnOptions({ headerName: 'كود المقاول', field: 'contractorCode' }),
	new GridColumnOptions({ headerName: 'رقم المدرسة', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: 'اسم المدرسة', field: 'schoolName' }),
	new GridColumnOptions({ headerName: 'سبب الاستبعاد', field: 'exclusionReason' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CanceledTenderViewComponent,
    editDialogClassType: CanceledTenderEditComponent,
    newDialogClassType: CanceledTenderNewComponent,
  });
    constructor(
        injector: Injector,
        public canceledTenderService: CanceledTenderService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCanceledTender = new CanceledTender();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.searchForm = this.formBuilder.group({
     	bidNumber : [],
	tenderNumber : [],
	contractorCode : [],
	schoolNumber : [],
	schoolName : [],
	exclusionReason : [],
	offeringType : []
    });

     
  }

  getCanceledTendersPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CanceledTender[]> => {
    return this.canceledTenderService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.canceledTenderService.delete(param.data.id)
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
  }
}

