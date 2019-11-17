
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AuthorizationExchange } from 'app/shared/models/authorization-exchange';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { AuthorizationExchangeService } from '../shared/authorization-exchange.service';




@Component({
  selector: 'app-authorization-exchange-edit',
  templateUrl: './authorization-exchange-edit.component.html',
  styleUrls: ['./authorization-exchange-edit.component.scss'],
  providers: []
})

export class AuthorizationExchangeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAuthorizationExchange: AuthorizationExchange;
  authorizationExchangeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private bondCodesService: LookupService;
private subDepartmentsService: LookupService;
private gendersService: LookupService;
private itemStatusesService: LookupService;

  
exchangeCodeSelectOptions: MaterialSelectOptions;
exchangeNumberSelectOptions: MaterialSelectOptions;
typeSelectOptions: MaterialSelectOptions;
statusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('exchangeCode', { static: true }) ExchangeCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('exchangeNumber', { static: true }) ExchangeNumberSelectComponent: MaterialSelectComponent;
	@ViewChild('type', { static: true }) TypeSelectComponent: MaterialSelectComponent;
	@ViewChild('status', { static: true }) StatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAuthorizationExchangeDialog: any,
    @Optional() public dialogRef: MatDialogRef<AuthorizationExchangeEditComponent>,
    public authorizationExchangeService: AuthorizationExchangeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAuthorizationExchange = new AuthorizationExchange();
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
	 data: this.gendersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع  ',
	});

	this.statusSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة ',
	});


    this.authorizationExchangeForm = this.formBuilder.group({
      
  id : [this.selectedAuthorizationExchange.id],
  exchangeStoreNumber : [this.selectedAuthorizationExchange.exchangeStoreNumber, [ Validators.required ]],
  exchangeDate : [this.selectedAuthorizationExchange.exchangeDate, [ Validators.required ]],
  itemNo : [this.selectedAuthorizationExchange.itemNo, [ Validators.required ]],
  productName : [this.selectedAuthorizationExchange.productName, [ Validators.required ]],
  quantity : [this.selectedAuthorizationExchange.quantity, [ Validators.required ]],
  price : [this.selectedAuthorizationExchange.price, [ Validators.required ]],
  exchangeAuthorizationNumber : [this.selectedAuthorizationExchange.exchangeAuthorizationNumber, [ Validators.required ]],
  exchangeCode : [this.selectedAuthorizationExchange.exchangeCode, [ Validators.required ]],
  exchangeNumber : [this.selectedAuthorizationExchange.exchangeNumber, [ Validators.required ]],
  type : [this.selectedAuthorizationExchange.type, [ Validators.required ]],
  status : [this.selectedAuthorizationExchange.status, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.authorizationExchangeService.update(this.authorizationExchangeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.authorizationExchangeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.authorizationExchangeForm.get(name);
  }

  initializeLookupServices() {
    this.bondCodesService = new LookupService('bondcodes', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.gendersService = new LookupService('genders', this.http);
this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
}
