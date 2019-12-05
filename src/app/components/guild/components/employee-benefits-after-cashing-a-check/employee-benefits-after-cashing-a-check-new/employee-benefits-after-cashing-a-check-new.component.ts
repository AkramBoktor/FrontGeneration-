
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EmployeeBenefitsAfterCashingACheck } from 'app/shared/models/employee-benefits-after-cashing-a-check';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeeBenefitsAfterCashingACheckService } from '../shared/employee-benefits-after-cashing-a-check.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-employee-benefits-after-cashing-a-check-new',
  templateUrl: './employee-benefits-after-cashing-a-check-new.component.html',
  styleUrls: ['./employee-benefits-after-cashing-a-check-new.component.scss'],
  providers: [
    ]
})

export class EmployeeBenefitsAfterCashingACheckNewComponent extends AppBaseComponent implements OnInit {
  employeeBenefitsAfterCashingACheckForm: FormGroup;
  @Input() selectedEmployeeBenefitsAfterCashingACheck: EmployeeBenefitsAfterCashingACheck;
  errorMessages: FormControlError[] = [
        
  ];

  private subsidyTypesService: LookupService;

  
subsidyTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('subsidyType', { static: true }) SubsidyTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EmployeeBenefitsAfterCashingACheckNewComponent>,
    public employeeBenefitsAfterCashingACheckService: EmployeeBenefitsAfterCashingACheckService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeBenefitsAfterCashingACheck = new EmployeeBenefitsAfterCashingACheck();

    
	this.subsidyTypeSelectOptions = new MaterialSelectOptions({
	 data: this.subsidyTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع الاعانة',
	});


    this.employeeBenefitsAfterCashingACheckForm = this.formBuilder.group({
     
  id : [0],
  checkNumber : [this.selectedEmployeeBenefitsAfterCashingACheck.checkNumber, [ Validators.required ]],
  checkDate : [this.selectedEmployeeBenefitsAfterCashingACheck.checkDate, [ Validators.required ]],
  checkAmount : [this.selectedEmployeeBenefitsAfterCashingACheck.checkAmount, [ Validators.required ]],
  employeeCode : [this.selectedEmployeeBenefitsAfterCashingACheck.employeeCode, [ Validators.required ]],
  subsidyAmount : [this.selectedEmployeeBenefitsAfterCashingACheck.subsidyAmount, [ Validators.required ]],
  exchangeDate : [this.selectedEmployeeBenefitsAfterCashingACheck.exchangeDate, [ Validators.required ]],
  subsidyType : [this.selectedEmployeeBenefitsAfterCashingACheck.subsidyType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.employeeBenefitsAfterCashingACheckService.create(this.employeeBenefitsAfterCashingACheckForm.value)
        .pipe(switchMap(x => {
			return this.employeeBenefitsAfterCashingACheckService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.employeeBenefitsAfterCashingACheckForm.get(name);
    }

  initializeLookupServices() {
    this.subsidyTypesService = new LookupService('subsidytypes', this.http);
  }
 }
