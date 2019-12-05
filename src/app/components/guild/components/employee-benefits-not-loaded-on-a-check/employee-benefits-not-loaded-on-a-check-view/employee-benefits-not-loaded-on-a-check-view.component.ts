
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EmployeeBenefitsNotLoadedOnACheck } from 'app/shared/models/employee-benefits-not-loaded-on-a-check';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EmployeeBenefitsNotLoadedOnACheckService } from '../shared/employee-benefits-not-loaded-on-a-check.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-employee-benefits-not-loaded-on-a-check-view',
  templateUrl: './employee-benefits-not-loaded-on-a-check-view.component.html',
  styleUrls: ['./employee-benefits-not-loaded-on-a-check-view.component.scss'],
  providers: []
})

export class EmployeeBenefitsNotLoadedOnACheckViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeeBenefitsNotLoadedOnACheck: EmployeeBenefitsNotLoadedOnACheck;
  employeeBenefitsNotLoadedOnACheckForm: FormGroup;

  private subDepartmentsService: LookupService;
private subsidyTypesService: LookupService;

  
affiliateManagementSelectOptions: MaterialSelectOptions;
subsidyTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeeBenefitsNotLoadedOnACheckDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeeBenefitsNotLoadedOnACheckViewComponent>,
    public employeeBenefitsNotLoadedOnACheckService: EmployeeBenefitsNotLoadedOnACheckService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeBenefitsNotLoadedOnACheck = this.selectedEmployeeBenefitsNotLoadedOnACheckDialog.data || this.selectedEmployeeBenefitsNotLoadedOnACheck;

    
	this.affiliateManagementSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' الاداره التابع لها',
	});

	this.subsidyTypeSelectOptions = new MaterialSelectOptions({
	 data: this.subsidyTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '  نوع الاعانه',
	});


    this.employeeBenefitsNotLoadedOnACheckForm = this.formBuilder.group({
      
  employeeName : [this.selectedEmployeeBenefitsNotLoadedOnACheck.employeeName],
  subsidyNoandName : [this.selectedEmployeeBenefitsNotLoadedOnACheck.subsidyNoandName],
  subsidyAmount : [this.selectedEmployeeBenefitsNotLoadedOnACheck.subsidyAmount],
  exchangeDate : [this.selectedEmployeeBenefitsNotLoadedOnACheck.exchangeDate],
  receipt : [this.selectedEmployeeBenefitsNotLoadedOnACheck.receipt],
  affiliateManagement : [this.selectedEmployeeBenefitsNotLoadedOnACheck.affiliateManagement],
  subsidyType : [this.selectedEmployeeBenefitsNotLoadedOnACheck.subsidyType]
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
    return this.employeeBenefitsNotLoadedOnACheckForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.employeeBenefitsNotLoadedOnACheckForm.controls)) {
      this.employeeBenefitsNotLoadedOnACheckForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.subsidyTypesService = new LookupService('subsidytypes', this.http);
  }
}

