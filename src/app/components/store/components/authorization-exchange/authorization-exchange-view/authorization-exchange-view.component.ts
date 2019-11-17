
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AuthorizationExchange } from 'app/shared/models/authorization-exchange';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AuthorizationExchangeService } from '../shared/authorization-exchange.service';

@Component({
  selector: 'app-authorization-exchange-view',
  templateUrl: './authorization-exchange-view.component.html',
  styleUrls: ['./authorization-exchange-view.component.scss'],
  providers: []
})

export class AuthorizationExchangeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAuthorizationExchange: AuthorizationExchange;
  authorizationExchangeForm: FormGroup;

  private bondCodesService: LookupService;
private subDepartmentsService: LookupService;
private itemTypesService: LookupService;
private itemStatusesService: LookupService;

  
exchangeCodeSelectOptions: MaterialSelectOptions;
exchangeNumberSelectOptions: MaterialSelectOptions;
typeSelectOptions: MaterialSelectOptions;
statusSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAuthorizationExchangeDialog: any,
    @Optional() public dialogRef: MatDialogRef<AuthorizationExchangeViewComponent>,
    public authorizationExchangeService: AuthorizationExchangeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAuthorizationExchange = this.selectedAuthorizationExchangeDialog.data || this.selectedAuthorizationExchange;

    
	this.exchangeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bondCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود السند الصرف ',
	});

	this.exchangeNumberSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم جهة الصرف',
	});

	this.typeSelectOptions = new MaterialSelectOptions({
	 data: this.itemTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع  ',
	});

	this.statusSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة ',
	});


    this.authorizationExchangeForm = this.formBuilder.group({
      
  exchangeStoreNumber : [this.selectedAuthorizationExchange.exchangeStoreNumber],
  exchangeDate : [this.selectedAuthorizationExchange.exchangeDate],
  itemNo : [this.selectedAuthorizationExchange.itemNo],
  productName : [this.selectedAuthorizationExchange.productName],
  quantity : [this.selectedAuthorizationExchange.quantity],
  price : [this.selectedAuthorizationExchange.price],
  exchangeAuthorizationNumber : [this.selectedAuthorizationExchange.exchangeAuthorizationNumber],
  exchangeCode : [this.selectedAuthorizationExchange.exchangeCode],
  exchangeNumber : [this.selectedAuthorizationExchange.exchangeNumber],
  type : [this.selectedAuthorizationExchange.type],
  status : [this.selectedAuthorizationExchange.status]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.authorizationExchangeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.authorizationExchangeForm.controls)) {
      this.authorizationExchangeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.bondCodesService = new LookupService('bondcodes', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.itemTypesService = new LookupService('itemtypes', this.http);
this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
}

