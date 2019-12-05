
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BankSalary } from 'app/shared/models/bank-salary';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BankSalaryService } from '../shared/bank-salary.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-bank-salary-new',
  templateUrl: './bank-salary-new.component.html',
  styleUrls: ['./bank-salary-new.component.scss'],
  providers: [
    ]
})

export class BankSalaryNewComponent extends AppBaseComponent implements OnInit {
  bankSalaryForm: FormGroup;
  @Input() selectedBankSalary: BankSalary;
  errorMessages: FormControlError[] = [
        
  ];

  private selectsService: LookupService;
private bankCodesService: LookupService;

  
selectSelectOptions: MaterialSelectOptions;
bankCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('select', { static: true }) SelectSelectComponent: MaterialSelectComponent;
	@ViewChild('bankCode', { static: true }) BankCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<BankSalaryNewComponent>,
    public bankSalaryService: BankSalaryService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBankSalary = new BankSalary();

    
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
     
  id : [0],
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
    this.bankSalaryService.create(this.bankSalaryForm.value)
        .pipe(switchMap(x => {
			return this.bankSalaryService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.bankSalaryForm.get(name);
    }

  initializeLookupServices() {
    this.selectsService = new LookupService('selects', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
  }
 }
