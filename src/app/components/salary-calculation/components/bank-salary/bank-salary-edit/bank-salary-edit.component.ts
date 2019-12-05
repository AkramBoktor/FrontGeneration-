
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { BankSalary } from 'app/shared/models/bank-salary';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { BankSalaryService } from '../shared/bank-salary.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-bank-salary-edit',
  templateUrl: './bank-salary-edit.component.html',
  styleUrls: ['./bank-salary-edit.component.scss'],
  providers: []
})

export class BankSalaryEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBankSalary: BankSalary;
  bankSalaryForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private selectsService: LookupService;
private bankCodesService: LookupService;

  
selectSelectOptions: MaterialSelectOptions;
bankCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('select', { static: true }) SelectSelectComponent: MaterialSelectComponent;
	@ViewChild('bankCode', { static: true }) BankCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBankSalaryDialog: any,
    @Optional() public dialogRef: MatDialogRef<BankSalaryEditComponent>,
    public bankSalaryService: BankSalaryService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBankSalary = new BankSalary();
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
      
  id : [this.selectedBankSalary.id],
  employeeCode : [this.selectedBankSalary.employeeCode, [ Validators.required ]],
  bank : [this.selectedBankSalary.bank, [ Validators.required ]],
  accountNumber : [this.selectedBankSalary.accountNumber, [ Validators.required ]],
  select : [this.selectedBankSalary.select, [ Validators.required ]],
  bankCode : [this.selectedBankSalary.bankCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.bankSalaryService.update(this.bankSalaryForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.bankSalaryService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.bankSalaryForm.get(name);
  }

  initializeLookupServices() {
    this.selectsService = new LookupService('selects', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
  }
}
