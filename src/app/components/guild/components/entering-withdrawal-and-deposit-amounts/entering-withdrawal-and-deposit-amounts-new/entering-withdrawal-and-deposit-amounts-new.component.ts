
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EnteringWithdrawalAndDepositAmounts } from 'app/shared/models/entering-withdrawal-and-deposit-amounts';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EnteringWithdrawalAndDepositAmountsService } from '../shared/entering-withdrawal-and-deposit-amounts.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-entering-withdrawal-and-deposit-amounts-new',
  templateUrl: './entering-withdrawal-and-deposit-amounts-new.component.html',
  styleUrls: ['./entering-withdrawal-and-deposit-amounts-new.component.scss'],
  providers: [
    ]
})

export class EnteringWithdrawalAndDepositAmountsNewComponent extends AppBaseComponent implements OnInit {
  enteringWithdrawalAndDepositAmountsForm: FormGroup;
  @Input() selectedEnteringWithdrawalAndDepositAmounts: EnteringWithdrawalAndDepositAmounts;
  errorMessages: FormControlError[] = [
        
  ];

  private entityCodesService: LookupService;
private processTypesService: LookupService;

  
entityCodeSelectOptions: MaterialSelectOptions;
operationTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('entityCode', { static: true }) EntityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('operationType', { static: true }) OperationTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EnteringWithdrawalAndDepositAmountsNewComponent>,
    public enteringWithdrawalAndDepositAmountsService: EnteringWithdrawalAndDepositAmountsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEnteringWithdrawalAndDepositAmounts = new EnteringWithdrawalAndDepositAmounts();

    
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
     
  id : [0],
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
    this.enteringWithdrawalAndDepositAmountsService.create(this.enteringWithdrawalAndDepositAmountsForm.value)
        .pipe(switchMap(x => {
			return this.enteringWithdrawalAndDepositAmountsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.enteringWithdrawalAndDepositAmountsForm.get(name);
    }

  initializeLookupServices() {
    this.entityCodesService = new LookupService('entitycodes', this.http);
this.processTypesService = new LookupService('processtypes', this.http);
  }
 }
