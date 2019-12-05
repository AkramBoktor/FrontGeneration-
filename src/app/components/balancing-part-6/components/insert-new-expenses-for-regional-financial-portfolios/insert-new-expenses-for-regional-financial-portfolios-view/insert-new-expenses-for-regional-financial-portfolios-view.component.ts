
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { InsertNewExpensesForRegionalFinancialPortfolios } from 'app/shared/models/insert-new-expenses-for-regional-financial-portfolios';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { InsertNewExpensesForRegionalFinancialPortfoliosService } from '../shared/insert-new-expenses-for-regional-financial-portfolios.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-insert-new-expenses-for-regional-financial-portfolios-view',
  templateUrl: './insert-new-expenses-for-regional-financial-portfolios-view.component.html',
  styleUrls: ['./insert-new-expenses-for-regional-financial-portfolios-view.component.scss'],
  providers: []
})

export class InsertNewExpensesForRegionalFinancialPortfoliosViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedInsertNewExpensesForRegionalFinancialPortfolios: InsertNewExpensesForRegionalFinancialPortfolios;
  insertNewExpensesForRegionalFinancialPortfoliosForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedInsertNewExpensesForRegionalFinancialPortfoliosDialog: any,
    @Optional() public dialogRef: MatDialogRef<InsertNewExpensesForRegionalFinancialPortfoliosViewComponent>,
    public insertNewExpensesForRegionalFinancialPortfoliosService: InsertNewExpensesForRegionalFinancialPortfoliosService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInsertNewExpensesForRegionalFinancialPortfolios = this.selectedInsertNewExpensesForRegionalFinancialPortfoliosDialog.data || this.selectedInsertNewExpensesForRegionalFinancialPortfolios;

    

    this.insertNewExpensesForRegionalFinancialPortfoliosForm = this.formBuilder.group({
      
  areaCode : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.areaCode],
  areaName : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.areaName],
  budgetYear : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.budgetYear],
  fundingSourceNumber : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.fundingSourceNumber],
  fundingSourceName : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.fundingSourceName],
  originalClipboardSerial : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.originalClipboardSerial],
  serialClipboardArea : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.serialClipboardArea],
  financingClipboardDate : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.financingClipboardDate],
  balanceProvince : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.balanceProvince],
  oldClipboardAmount : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.oldClipboardAmount],
  newClipboardAmount : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.newClipboardAmount],
  settlementAmount : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.settlementAmount],
  remainingFromPreviousSubmission : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.remainingFromPreviousSubmission]
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
          
	{
	 errorName: 'minLength',
	 errorMessage: ''
	}
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.insertNewExpensesForRegionalFinancialPortfoliosForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.insertNewExpensesForRegionalFinancialPortfoliosForm.controls)) {
      this.insertNewExpensesForRegionalFinancialPortfoliosForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

