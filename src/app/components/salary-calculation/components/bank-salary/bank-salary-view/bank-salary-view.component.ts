
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BankSalary } from 'app/shared/models/bank-salary';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { BankSalaryService } from '../shared/bank-salary.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-bank-salary-view',
  templateUrl: './bank-salary-view.component.html',
  styleUrls: ['./bank-salary-view.component.scss'],
  providers: []
})

export class BankSalaryViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBankSalary: BankSalary;
  bankSalaryForm: FormGroup;

  private selectsService: LookupService;
private bankCodesService: LookupService;

  
selectSelectOptions: MaterialSelectOptions;
bankCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBankSalaryDialog: any,
    @Optional() public dialogRef: MatDialogRef<BankSalaryViewComponent>,
    public bankSalaryService: BankSalaryService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBankSalary = this.selectedBankSalaryDialog.data || this.selectedBankSalary;

    
	this.selectSelectOptions = new MaterialSelectOptions({
	 data: this.selectsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاختيار',
	});

	this.bankCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bankCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البنك',
	});


    this.bankSalaryForm = this.formBuilder.group({
      
  employeeCode : [this.selectedBankSalary.employeeCode],
  bank : [this.selectedBankSalary.bank],
  accountNumber : [this.selectedBankSalary.accountNumber],
  select : [this.selectedBankSalary.select],
  bankCode : [this.selectedBankSalary.bankCode]
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
    return this.bankSalaryForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.bankSalaryForm.controls)) {
      this.bankSalaryForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.selectsService = new LookupService('selects', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
  }
}

