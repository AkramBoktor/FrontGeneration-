
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { InsertNewExpensesForRegionalFinancialPortfolios } from 'app/shared/models/insert-new-expenses-for-regional-financial-portfolios';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { InsertNewExpensesForRegionalFinancialPortfoliosService } from '../shared/insert-new-expenses-for-regional-financial-portfolios.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-insert-new-expenses-for-regional-financial-portfolios-new',
  templateUrl: './insert-new-expenses-for-regional-financial-portfolios-new.component.html',
  styleUrls: ['./insert-new-expenses-for-regional-financial-portfolios-new.component.scss'],
  providers: [
    ]
})

export class InsertNewExpensesForRegionalFinancialPortfoliosNewComponent extends AppBaseComponent implements OnInit {
  insertNewExpensesForRegionalFinancialPortfoliosForm: FormGroup;
  @Input() selectedInsertNewExpensesForRegionalFinancialPortfolios: InsertNewExpensesForRegionalFinancialPortfolios;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'minLength',
	 errorMessage: ''
	}
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<InsertNewExpensesForRegionalFinancialPortfoliosNewComponent>,
    public insertNewExpensesForRegionalFinancialPortfoliosService: InsertNewExpensesForRegionalFinancialPortfoliosService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInsertNewExpensesForRegionalFinancialPortfolios = new InsertNewExpensesForRegionalFinancialPortfolios();

    

    this.insertNewExpensesForRegionalFinancialPortfoliosForm = this.formBuilder.group({
     
  id : [0],
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
    this.insertNewExpensesForRegionalFinancialPortfoliosService.create(this.insertNewExpensesForRegionalFinancialPortfoliosForm.value)
        .pipe(switchMap(x => {
			return this.insertNewExpensesForRegionalFinancialPortfoliosService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.insertNewExpensesForRegionalFinancialPortfoliosForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
