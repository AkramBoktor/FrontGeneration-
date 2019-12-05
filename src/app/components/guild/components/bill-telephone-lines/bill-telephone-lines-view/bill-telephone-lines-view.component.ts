
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BillTelephoneLines } from 'app/shared/models/bill-telephone-lines';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { BillTelephoneLinesService } from '../shared/bill-telephone-lines.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-bill-telephone-lines-view',
  templateUrl: './bill-telephone-lines-view.component.html',
  styleUrls: ['./bill-telephone-lines-view.component.scss'],
  providers: []
})

export class BillTelephoneLinesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBillTelephoneLines: BillTelephoneLines;
  billTelephoneLinesForm: FormGroup;

  private subDepartmentsService: LookupService;
private employeeStatusesService: LookupService;
private lineTypesService: LookupService;

  
administrationCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
lineTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBillTelephoneLinesDialog: any,
    @Optional() public dialogRef: MatDialogRef<BillTelephoneLinesViewComponent>,
    public billTelephoneLinesService: BillTelephoneLinesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBillTelephoneLines = this.selectedBillTelephoneLinesDialog.data || this.selectedBillTelephoneLines;

    
	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});

	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' حاله الموظف',
	});

	this.lineTypeSelectOptions = new MaterialSelectOptions({
	 data: this.lineTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع الخط',
	});


    this.billTelephoneLinesForm = this.formBuilder.group({
      
  employeeCode : [this.selectedBillTelephoneLines.employeeCode],
  phoneNumber : [this.selectedBillTelephoneLines.phoneNumber],
  invoiceValue : [this.selectedBillTelephoneLines.invoiceValue],
  administrationCode : [this.selectedBillTelephoneLines.administrationCode],
  employeeStatus : [this.selectedBillTelephoneLines.employeeStatus],
  lineType : [this.selectedBillTelephoneLines.lineType]
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
    return this.billTelephoneLinesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.billTelephoneLinesForm.controls)) {
      this.billTelephoneLinesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.lineTypesService = new LookupService('linetypes', this.http);
  }
}

