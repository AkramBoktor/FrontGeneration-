
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RecordTheValueOfTelephoneBill } from 'app/shared/models/record-the-value-of-telephone-bill';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordTheValueOfTelephoneBillService } from '../shared/record-the-value-of-telephone-bill.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-record-the-value-of-telephone-bill-new',
  templateUrl: './record-the-value-of-telephone-bill-new.component.html',
  styleUrls: ['./record-the-value-of-telephone-bill-new.component.scss'],
  providers: [
    ]
})

export class RecordTheValueOfTelephoneBillNewComponent extends AppBaseComponent implements OnInit {
  recordTheValueOfTelephoneBillForm: FormGroup;
  @Input() selectedRecordTheValueOfTelephoneBill: RecordTheValueOfTelephoneBill;
  errorMessages: FormControlError[] = [
        
  ];

  private departmentsSectionsService: LookupService;
private employeeStatusesService: LookupService;

  
managementCodeSelectOptions: MaterialSelectOptions;
employeeStatusCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('managementCode', { static: true }) ManagementCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatusCode', { static: true }) EmployeeStatusCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RecordTheValueOfTelephoneBillNewComponent>,
    public recordTheValueOfTelephoneBillService: RecordTheValueOfTelephoneBillService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordTheValueOfTelephoneBill = new RecordTheValueOfTelephoneBill();

    
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
     
  id : [0],
  debtMonth : [this.selectedRecordTheValueOfTelephoneBill.debtMonth, [ Validators.required ]],
  calculationPeriodFrom : [this.selectedRecordTheValueOfTelephoneBill.calculationPeriodFrom, [ Validators.required ]],
  calculationPeriodTo : [this.selectedRecordTheValueOfTelephoneBill.calculationPeriodTo, [ Validators.required ]],
  phoneNumber : [this.selectedRecordTheValueOfTelephoneBill.phoneNumber, [ Validators.required ]],
  invoiceSerialMonth : [this.selectedRecordTheValueOfTelephoneBill.invoiceSerialMonth, [ Validators.required ]],
  employeeCode : [this.selectedRecordTheValueOfTelephoneBill.employeeCode, [ Validators.required ]],
  employeeName : [this.selectedRecordTheValueOfTelephoneBill.employeeName, [ ]],
  administrationName : [this.selectedRecordTheValueOfTelephoneBill.administrationName, [ ]],
  employeeStatus : [this.selectedRecordTheValueOfTelephoneBill.employeeStatus, [ ]],
  invoiceValue : [this.selectedRecordTheValueOfTelephoneBill.invoiceValue, [ Validators.required ]],
  administrativeExpenses : [this.selectedRecordTheValueOfTelephoneBill.administrativeExpenses, [ Validators.required ]],
  totalInvoice : [this.selectedRecordTheValueOfTelephoneBill.totalInvoice, [ Validators.required ]],
  managementCode : [this.selectedRecordTheValueOfTelephoneBill.managementCode, [ Validators.required ]],
  employeeStatusCode : [this.selectedRecordTheValueOfTelephoneBill.employeeStatusCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.recordTheValueOfTelephoneBillService.create(this.recordTheValueOfTelephoneBillForm.value)
        .pipe(switchMap(x => {
			return this.recordTheValueOfTelephoneBillService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.recordTheValueOfTelephoneBillForm.get(name);
    }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
 }
