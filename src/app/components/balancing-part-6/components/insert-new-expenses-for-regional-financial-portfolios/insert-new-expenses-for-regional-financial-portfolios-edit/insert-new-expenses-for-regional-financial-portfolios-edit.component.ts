
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { InsertNewExpensesForRegionalFinancialPortfolios } from 'app/shared/models/insert-new-expenses-for-regional-financial-portfolios';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { InsertNewExpensesForRegionalFinancialPortfoliosService } from '../shared/insert-new-expenses-for-regional-financial-portfolios.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-insert-new-expenses-for-regional-financial-portfolios-edit',
  templateUrl: './insert-new-expenses-for-regional-financial-portfolios-edit.component.html',
  styleUrls: ['./insert-new-expenses-for-regional-financial-portfolios-edit.component.scss'],
  providers: []
})

export class InsertNewExpensesForRegionalFinancialPortfoliosEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedInsertNewExpensesForRegionalFinancialPortfolios: InsertNewExpensesForRegionalFinancialPortfolios;
  insertNewExpensesForRegionalFinancialPortfoliosForm: FormGroup;
  errorMessages: FormControlError[] = [
          
	{
	 errorName: 'minLength',
	 errorMessage: ''
	}
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedInsertNewExpensesForRegionalFinancialPortfoliosDialog: any,
    @Optional() public dialogRef: MatDialogRef<InsertNewExpensesForRegionalFinancialPortfoliosEditComponent>,
    public insertNewExpensesForRegionalFinancialPortfoliosService: InsertNewExpensesForRegionalFinancialPortfoliosService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInsertNewExpensesForRegionalFinancialPortfolios = new InsertNewExpensesForRegionalFinancialPortfolios();
    this.selectedInsertNewExpensesForRegionalFinancialPortfolios = this.selectedInsertNewExpensesForRegionalFinancialPortfoliosDialog.data || this.selectedInsertNewExpensesForRegionalFinancialPortfolios;

    

    this.insertNewExpensesForRegionalFinancialPortfoliosForm = this.formBuilder.group({
      
  id : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.id],
  areaCode : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.areaCode, [ Validators.required ]],
  areaName : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.areaName, [ Validators.required ]],
  budgetYear : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.budgetYear, [ Validators.required ]],
  fundingSourceNumber : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.fundingSourceNumber, [ Validators.required ]],
  fundingSourceName : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.fundingSourceName, [ Validators.required ]],
  originalClipboardSerial : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.originalClipboardSerial, [ Validators.required ]],
  serialClipboardArea : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.serialClipboardArea, [ Validators.required ]],
  financingClipboardDate : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.financingClipboardDate, [ Validators.required ]],
  balanceProvince : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.balanceProvince, [ Validators.required ]],
  oldClipboardAmount : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.oldClipboardAmount, [ Validators.required ]],
  newClipboardAmount : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.newClipboardAmount, [ Validators.required,Validators.minLength(1) ]],
  settlementAmount : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.settlementAmount, [ Validators.required ]],
  remainingFromPreviousSubmission : [this.selectedInsertNewExpensesForRegionalFinancialPortfolios.remainingFromPreviousSubmission, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.insertNewExpensesForRegionalFinancialPortfoliosService.update(this.insertNewExpensesForRegionalFinancialPortfoliosForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.insertNewExpensesForRegionalFinancialPortfoliosService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.insertNewExpensesForRegionalFinancialPortfoliosForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
