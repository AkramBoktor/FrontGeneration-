
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthority } from 'app/shared/models/registering-the-payment-of-statistics-to-its-own-authority';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthorityEditComponent } from '../registering-the-payment-of-statistics-to-its-own-authority-edit/registering-the-payment-of-statistics-to-its-own-authority-edit.component';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthorityNewComponent } from '../registering-the-payment-of-statistics-to-its-own-authority-new/registering-the-payment-of-statistics-to-its-own-authority-new.component';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthorityViewComponent } from '../registering-the-payment-of-statistics-to-its-own-authority-view/registering-the-payment-of-statistics-to-its-own-authority-view.component';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthorityService } from '../shared/registering-the-payment-of-statistics-to-its-own-authority.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-registering-the-payment-of-statistics-to-its-own-authority-list',
  templateUrl: './registering-the-payment-of-statistics-to-its-own-authority-list.component.html',
  styleUrls: ['./registering-the-payment-of-statistics-to-its-own-authority-list.component.scss'],
  providers: []
})

export class RegisteringThePaymentOfStatisticsToItsOwnAuthorityListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority: RegisteringThePaymentOfStatisticsToItsOwnAuthority;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' رقم التحصيل ', field: 'collectionNumber' }),
	new GridColumnOptions({ headerName: ' تاريخ التحصيل', field: 'collectionDate' }),
	new GridColumnOptions({ headerName: ' المبلغ  التحصيل', field: 'collectionAmount' }),
	new GridColumnOptions({ headerName: ' من ', field: 'from' }),
	new GridColumnOptions({ headerName: ' الي', field: 'to' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RegisteringThePaymentOfStatisticsToItsOwnAuthorityViewComponent,
    editDialogClassType: RegisteringThePaymentOfStatisticsToItsOwnAuthorityEditComponent,
    newDialogClassType: RegisteringThePaymentOfStatisticsToItsOwnAuthorityNewComponent,
  });
    constructor(
        injector: Injector,
        public registeringThePaymentOfStatisticsToItsOwnAuthorityService: RegisteringThePaymentOfStatisticsToItsOwnAuthorityService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority = new RegisteringThePaymentOfStatisticsToItsOwnAuthority();

    

    this.searchForm = this.formBuilder.group({
     	collectionNumber : [],
	from : [],
	to : []
    });

     
  }

  getRegisteringThePaymentOfStatisticsToItsOwnAuthorityPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RegisteringThePaymentOfStatisticsToItsOwnAuthority[]> => {
    return this.registeringThePaymentOfStatisticsToItsOwnAuthorityService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.registeringThePaymentOfStatisticsToItsOwnAuthorityService.delete(param.data.id)
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

