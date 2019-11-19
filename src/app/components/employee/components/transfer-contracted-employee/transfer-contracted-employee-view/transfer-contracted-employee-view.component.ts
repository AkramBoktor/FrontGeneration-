
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TransferContractedEmployee } from 'app/shared/models/transfer-contracted-employee';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TransferContractedEmployeeService } from '../shared/transfer-contracted-employee.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-transfer-contracted-employee-view',
  templateUrl: './transfer-contracted-employee-view.component.html',
  styleUrls: ['./transfer-contracted-employee-view.component.scss'],
  providers: []
})

export class TransferContractedEmployeeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTransferContractedEmployee: TransferContractedEmployee;
  transferContractedEmployeeForm: FormGroup;

  private jobTypesService: LookupService;
  private centralDepartmentsService: LookupService;
  private subDepartmentsService: LookupService;


  jobTitleSelectOptions: MaterialSelectOptions;
  fromCentralAdministrationSelectOptions: MaterialSelectOptions;
  fromSubAdministrationSelectOptions: MaterialSelectOptions;
  toCentralAdministrationSelectOptions: MaterialSelectOptions;
  toSubAdministrationSelectOptions: MaterialSelectOptions;



  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTransferContractedEmployeeDialog: any,
    @Optional() public dialogRef: MatDialogRef<TransferContractedEmployeeViewComponent>,
    public transferContractedEmployeeService: TransferContractedEmployeeService) {
    super(injector);
  }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTransferContractedEmployee = this.selectedTransferContractedEmployeeDialog.data || this.selectedTransferContractedEmployee;


    this.jobTitleSelectOptions = new MaterialSelectOptions({
      data: this.jobTypesService.getAll(),
      errorMessages: this.errorMessages,
      label: 'الوظيفه',
    });

    this.fromCentralAdministrationSelectOptions = new MaterialSelectOptions({
      data: this.centralDepartmentsService.getAll(),
      errorMessages: this.errorMessages,
      label: 'الاداره المركزيه المنقول منها',
    });

    this.fromSubAdministrationSelectOptions = new MaterialSelectOptions({
      data: this.subDepartmentsService.getAll(),
      errorMessages: this.errorMessages,
      label: 'الادارة الفرعية المنقول منها',
    });

    this.toCentralAdministrationSelectOptions = new MaterialSelectOptions({
      data: this.centralDepartmentsService.getAll(),
      errorMessages: this.errorMessages,
      label: 'الاداره المركزيه المنقول لها',
    });

    this.toSubAdministrationSelectOptions = new MaterialSelectOptions({
      data: this.subDepartmentsService.getAll(),
      errorMessages: this.errorMessages,
      label: 'الاداره الفرعيه المنقول لها',
    });


    this.transferContractedEmployeeForm = this.formBuilder.group({

      employeeCode: [this.selectedTransferContractedEmployee.employeeCode],
      periodNumber: [this.selectedTransferContractedEmployee.periodNumber],
      periodStartDate: [this.selectedTransferContractedEmployee.periodStartDate],
      periodEndDate: [this.selectedTransferContractedEmployee.periodEndDate],
      hiringDate: [this.selectedTransferContractedEmployee.hiringDate],
      transferDate: [this.selectedTransferContractedEmployee.transferDate],
      executionOrderDate: [this.selectedTransferContractedEmployee.executionOrderDate],
      executionOrderNumber: [this.selectedTransferContractedEmployee.executionOrderNumber],
      jobTitle: [this.selectedTransferContractedEmployee.jobTitle],
      fromCentralAdministration: [this.selectedTransferContractedEmployee.fromCentralAdministration],
      fromSubAdministration: [this.selectedTransferContractedEmployee.fromSubAdministration],
      toCentralAdministration: [this.selectedTransferContractedEmployee.toCentralAdministration],
      toSubAdministration: [this.selectedTransferContractedEmployee.toSubAdministration]
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
        errorName: 'Less',
        errorMessage: ''
      },
      {
        errorName: 'Greater',
        errorMessage: 'Must enter it greater.'
      }
    ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
  }

  getControls(name: string) {
    return this.transferContractedEmployeeForm.get(name);
  }


  disableControls() {
    for (const control of Object.keys(this.transferContractedEmployeeForm.controls)) {
      this.transferContractedEmployeeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.jobTypesService = new LookupService('jobtypes', this.http);
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}

