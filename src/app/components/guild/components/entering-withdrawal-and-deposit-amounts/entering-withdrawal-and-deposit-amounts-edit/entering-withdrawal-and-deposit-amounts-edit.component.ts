
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EnteringWithdrawalAndDepositAmounts } from 'app/shared/models/entering-withdrawal-and-deposit-amounts';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EnteringWithdrawalAndDepositAmountsService } from '../shared/entering-withdrawal-and-deposit-amounts.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-entering-withdrawal-and-deposit-amounts-edit',
  templateUrl: './entering-withdrawal-and-deposit-amounts-edit.component.html',
  styleUrls: ['./entering-withdrawal-and-deposit-amounts-edit.component.scss'],
  providers: []
})

export class EnteringWithdrawalAndDepositAmountsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEnteringWithdrawalAndDepositAmounts: EnteringWithdrawalAndDepositAmounts;
  enteringWithdrawalAndDepositAmountsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private entityCodesService: LookupService;
private processTypesService: LookupService;

  
entityCodeSelectOptions: MaterialSelectOptions;
operationTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('entityCode', { static: true }) EntityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('operationType', { static: true }) OperationTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEnteringWithdrawalAndDepositAmountsDialog: any,
    @Optional() public dialogRef: MatDialogRef<EnteringWithdrawalAndDepositAmountsEditComponent>,
    public enteringWithdrawalAndDepositAmountsService: EnteringWithdrawalAndDepositAmountsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEnteringWithdrawalAndDepositAmounts = new EnteringWithdrawalAndDepositAmounts();
    this.selectedEnteringWithdrawalAndDepositAmounts = this.selectedEnteringWithdrawalAndDepositAmountsDialog.data || this.selectedEnteringWithdrawalAndDepositAmounts;

    
	this.entityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الجهة ',
	});

	this.operationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '  نوع العملية',
	});


    this.enteringWithdrawalAndDepositAmountsForm = this.formBuilder.group({
      
  id : [this.selectedEnteringWithdrawalAndDepositAmounts.id],
  checkNumber : [this.selectedEnteringWithdrawalAndDepositAmounts.checkNumber, [ Validators.required ]],
  checkDate : [this.selectedEnteringWithdrawalAndDepositAmounts.checkDate, [ Validators.required ]],
  checkAmount : [this.selectedEnteringWithdrawalAndDepositAmounts.checkAmount, [ Validators.required ]],
  operationDate : [this.selectedEnteringWithdrawalAndDepositAmounts.operationDate, [ Validators.required ]],
  statement : [this.selectedEnteringWithdrawalAndDepositAmounts.statement, [ ]],
  entityCode : [this.selectedEnteringWithdrawalAndDepositAmounts.entityCode, [ Validators.required ]],
  operationType : [this.selectedEnteringWithdrawalAndDepositAmounts.operationType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.enteringWithdrawalAndDepositAmountsService.update(this.enteringWithdrawalAndDepositAmountsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.enteringWithdrawalAndDepositAmountsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.enteringWithdrawalAndDepositAmountsForm.get(name);
  }

  initializeLookupServices() {
    this.entityCodesService = new LookupService('entitycodes', this.http);
this.processTypesService = new LookupService('processtypes', this.http);
  }
}
