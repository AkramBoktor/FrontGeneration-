
import { Component, Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TransferContractedEmployee } from 'app/shared/models/transfer-contracted-employee';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TransferContractedEmployeeService } from '../shared/transfer-contracted-employee.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-transfer-contracted-employee-edit',
  templateUrl: './transfer-contracted-employee-edit.component.html',
  styleUrls: ['./transfer-contracted-employee-edit.component.scss'],
  providers: []
})

export class TransferContractedEmployeeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTransferContractedEmployee: TransferContractedEmployee;
  transferContractedEmployeeForm: FormGroup;
  errorMessages: FormControlError[] = [

    {
      errorName: 'Less',
      errorMessage: ''
    },
    {
      errorName: 'Greater',
      errorMessage: 'Must enter it greater.'
    }
  ];

  private jobTypesService: LookupService;
  private centralDepartmentsService: LookupService;
  private subDepartmentsService: LookupService;


  jobTitleSelectOptions: MaterialSelectOptions;
  fromCentralAdministrationSelectOptions: MaterialSelectOptions;
  fromSubAdministrationSelectOptions: MaterialSelectOptions;
  toCentralAdministrationSelectOptions: MaterialSelectOptions;
  toSubAdministrationSelectOptions: MaterialSelectOptions;


  @ViewChild('jobTitle', { static: true }) JobTitleSelectComponent: MaterialSelectComponent;
  @ViewChild('fromCentralAdministration', { static: true }) FromCentralAdministrationSelectComponent: MaterialSelectComponent;
  @ViewChild('fromSubAdministration', { static: true }) FromSubAdministrationSelectComponent: MaterialSelectComponent;
  @ViewChild('toCentralAdministration', { static: true }) ToCentralAdministrationSelectComponent: MaterialSelectComponent;
  @ViewChild('toSubAdministration', { static: true }) ToSubAdministrationSelectComponent: MaterialSelectComponent;



  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTransferContractedEmployeeDialog: any,
    @Optional() public dialogRef: MatDialogRef<TransferContractedEmployeeEditComponent>,
    public transferContractedEmployeeService: TransferContractedEmployeeService) {
    super(injector);
  }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTransferContractedEmployee = new TransferContractedEmployee();
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

      id: [this.selectedTransferContractedEmployee.id],
      employeeCode: [this.selectedTransferContractedEmployee.employeeCode, [Validators.required]],
      periodNumber: [this.selectedTransferContractedEmployee.periodNumber, [Validators.required]],
      periodStartDate: [this.selectedTransferContractedEmployee.periodStartDate, []],
      periodEndDate: [this.selectedTransferContractedEmployee.periodEndDate, []],
      hiringDate: [this.selectedTransferContractedEmployee.hiringDate, []],
      transferDate: [this.selectedTransferContractedEmployee.transferDate, [Validators.required]],
      executionOrderDate: [this.selectedTransferContractedEmployee.executionOrderDate, [Validators.required]],
      executionOrderNumber: [this.selectedTransferContractedEmployee.executionOrderNumber, [Validators.required]],
      jobTitle: [this.selectedTransferContractedEmployee.jobTitle, []],
      fromCentralAdministration: [this.selectedTransferContractedEmployee.fromCentralAdministration, []],
      fromSubAdministration: [this.selectedTransferContractedEmployee.fromSubAdministration, []],
      toCentralAdministration: [this.selectedTransferContractedEmployee.toCentralAdministration, [Validators.required]],
      toSubAdministration: [this.selectedTransferContractedEmployee.toSubAdministration, [Validators.required]]
    }, {
      validators: [
        ValidatorFunctions.validateLess("PeriodStartDate", "PeriodEndDate"),
        ValidatorFunctions.validateGreater("PeriodEndDate", "PeriodStartDate")]
    });



  }

  onSubmit() {
    this.transferContractedEmployeeService.update(this.transferContractedEmployeeForm.value, this.getControls('id').value)
      .pipe(switchMap(x => {
        return this.transferContractedEmployeeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
      }))
      .subscribe(
        (result) => {
          if (this.dialogRef) {
            this.dialogRef.close(true);
          }
        });
  }

  getControls(name: string) {
    return this.transferContractedEmployeeForm.get(name);
  }

  initializeLookupServices() {
    this.jobTypesService = new LookupService('jobtypes', this.http);
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}
