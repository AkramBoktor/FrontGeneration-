
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RecordTheValueOfTelephoneBill } from 'app/shared/models/record-the-value-of-telephone-bill';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordTheValueOfTelephoneBillService } from '../shared/record-the-value-of-telephone-bill.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-record-the-value-of-telephone-bill-view',
  templateUrl: './record-the-value-of-telephone-bill-view.component.html',
  styleUrls: ['./record-the-value-of-telephone-bill-view.component.scss'],
  providers: []
})

export class RecordTheValueOfTelephoneBillViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordTheValueOfTelephoneBill: RecordTheValueOfTelephoneBill;
  recordTheValueOfTelephoneBillForm: FormGroup;

  private departmentsSectionsService: LookupService;
private employeeStatusesService: LookupService;

  
managementCodeSelectOptions: MaterialSelectOptions;
employeeStatusCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordTheValueOfTelephoneBillDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordTheValueOfTelephoneBillViewComponent>,
    public recordTheValueOfTelephoneBillService: RecordTheValueOfTelephoneBillService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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


    this.recordTheValueOfTelephoneBillForm = this.formBuilder.group({
      
  debtMonth : [this.selectedRecordTheValueOfTelephoneBill.debtMonth],
  calculationPeriodFrom : [this.selectedRecordTheValueOfTelephoneBill.calculationPeriodFrom],
  calculationPeriodTo : [this.selectedRecordTheValueOfTelephoneBill.calculationPeriodTo],
  phoneNumber : [this.selectedRecordTheValueOfTelephoneBill.phoneNumber],
  invoiceSerialMonth : [this.selectedRecordTheValueOfTelephoneBill.invoiceSerialMonth],
  employeeCode : [this.selectedRecordTheValueOfTelephoneBill.employeeCode],
  employeeName : [this.selectedRecordTheValueOfTelephoneBill.employeeName],
  administrationName : [this.selectedRecordTheValueOfTelephoneBill.administrationName],
  employeeStatus : [this.selectedRecordTheValueOfTelephoneBill.employeeStatus],
  invoiceValue : [this.selectedRecordTheValueOfTelephoneBill.invoiceValue],
  administrativeExpenses : [this.selectedRecordTheValueOfTelephoneBill.administrativeExpenses],
  totalInvoice : [this.selectedRecordTheValueOfTelephoneBill.totalInvoice],
  managementCode : [this.selectedRecordTheValueOfTelephoneBill.managementCode],
  employeeStatusCode : [this.selectedRecordTheValueOfTelephoneBill.employeeStatusCode]
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
    return this.recordTheValueOfTelephoneBillForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.recordTheValueOfTelephoneBillForm.controls)) {
      this.recordTheValueOfTelephoneBillForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}

