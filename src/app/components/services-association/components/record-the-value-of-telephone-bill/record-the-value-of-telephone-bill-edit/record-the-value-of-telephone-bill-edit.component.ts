
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RecordTheValueOfTelephoneBill } from 'app/shared/models/record-the-value-of-telephone-bill';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RecordTheValueOfTelephoneBillService } from '../shared/record-the-value-of-telephone-bill.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-record-the-value-of-telephone-bill-edit',
  templateUrl: './record-the-value-of-telephone-bill-edit.component.html',
  styleUrls: ['./record-the-value-of-telephone-bill-edit.component.scss'],
  providers: []
})

export class RecordTheValueOfTelephoneBillEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordTheValueOfTelephoneBill: RecordTheValueOfTelephoneBill;
  recordTheValueOfTelephoneBillForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private departmentsSectionsService: LookupService;
private employeeStatusesService: LookupService;

  
managementCodeSelectOptions: MaterialSelectOptions;
employeeStatusCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('managementCode', { static: true }) ManagementCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatusCode', { static: true }) EmployeeStatusCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordTheValueOfTelephoneBillDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordTheValueOfTelephoneBillEditComponent>,
    public recordTheValueOfTelephoneBillService: RecordTheValueOfTelephoneBillService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordTheValueOfTelephoneBill = new RecordTheValueOfTelephoneBill();
    this.selectedRecordTheValueOfTelephoneBill = this.selectedRecordTheValueOfTelephoneBillDialog.data || this.selectedRecordTheValueOfTelephoneBill;

    
	this.managementCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الادارة',
	});

	this.employeeStatusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود حالة الموظف',
	});

	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' حالة الموظف',
	});


    this.recordTheValueOfTelephoneBillForm = this.formBuilder.group({
      
  id : [this.selectedRecordTheValueOfTelephoneBill.id],
  debtMonth : [this.selectedRecordTheValueOfTelephoneBill.debtMonth, [ Validators.required ]],
  calculationPeriodFrom : [this.selectedRecordTheValueOfTelephoneBill.calculationPeriodFrom, [ Validators.required ]],
  calculationPeriodTo : [this.selectedRecordTheValueOfTelephoneBill.calculationPeriodTo, [ Validators.required ]],
  phoneNumber : [this.selectedRecordTheValueOfTelephoneBill.phoneNumber, [ Validators.required ]],
  invoiceSerialMonth : [this.selectedRecordTheValueOfTelephoneBill.invoiceSerialMonth, [ Validators.required ]],
  employeeCode : [this.selectedRecordTheValueOfTelephoneBill.employeeCode, [ Validators.required ]],
  employeeName : [this.selectedRecordTheValueOfTelephoneBill.employeeName, [ ]],
  administrationName : [this.selectedRecordTheValueOfTelephoneBill.administrationName, [ ]],
  invoiceValue : [this.selectedRecordTheValueOfTelephoneBill.invoiceValue, [ Validators.required ]],
  administrativeExpenses : [this.selectedRecordTheValueOfTelephoneBill.administrativeExpenses, [ Validators.required ]],
  totalInvoice : [this.selectedRecordTheValueOfTelephoneBill.totalInvoice, [ Validators.required ]],
  managementCode : [this.selectedRecordTheValueOfTelephoneBill.managementCode, [ Validators.required ]],
  employeeStatusCode : [this.selectedRecordTheValueOfTelephoneBill.employeeStatusCode, [ Validators.required ]],
  employeeStatus : [this.selectedRecordTheValueOfTelephoneBill.employeeStatus, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.recordTheValueOfTelephoneBillService.update(this.recordTheValueOfTelephoneBillForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.recordTheValueOfTelephoneBillService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.recordTheValueOfTelephoneBillForm.get(name);
  }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}
