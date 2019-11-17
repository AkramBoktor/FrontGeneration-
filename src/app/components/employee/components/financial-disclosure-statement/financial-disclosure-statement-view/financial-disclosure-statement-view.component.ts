
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FinancialDisclosureStatement } from 'app/shared/models/financial-disclosure-statement';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FinancialDisclosureStatementService } from '../shared/financial-disclosure-statement.service';

@Component({
  selector: 'app-financial-disclosure-statement-view',
  templateUrl: './financial-disclosure-statement-view.component.html',
  styleUrls: ['./financial-disclosure-statement-view.component.scss'],
  providers: []
})

export class FinancialDisclosureStatementViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFinancialDisclosureStatement: FinancialDisclosureStatement;
  financialDisclosureStatementForm: FormGroup;

  private financialCrisisAdoptionsService: LookupService;

  
submissionReasonSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFinancialDisclosureStatementDialog: any,
    @Optional() public dialogRef: MatDialogRef<FinancialDisclosureStatementViewComponent>,
    public financialDisclosureStatementService: FinancialDisclosureStatementService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFinancialDisclosureStatement = this.selectedFinancialDisclosureStatementDialog.data || this.selectedFinancialDisclosureStatement;

    
	this.submissionReasonSelectOptions = new MaterialSelectOptions({
	 data: this.financialCrisisAdoptionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'سبب  تقديم الاقرار',
	});


    this.financialDisclosureStatementForm = this.formBuilder.group({
      
  employeeCode : [this.selectedFinancialDisclosureStatement.employeeCode],
  submissionDate : [this.selectedFinancialDisclosureStatement.submissionDate],
  fileDeliveryDate : [this.selectedFinancialDisclosureStatement.fileDeliveryDate],
  fileReceiptDate : [this.selectedFinancialDisclosureStatement.fileReceiptDate],
  submissionReason : [this.selectedFinancialDisclosureStatement.submissionReason]
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
    return this.financialDisclosureStatementForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.financialDisclosureStatementForm.controls)) {
      this.financialDisclosureStatementForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.financialCrisisAdoptionsService = new LookupService('financialcrisisadoptions', this.http);
  }
}

