
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { BillTelephoneLines } from 'app/shared/models/bill-telephone-lines';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { BillTelephoneLinesService } from '../shared/bill-telephone-lines.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-bill-telephone-lines-edit',
  templateUrl: './bill-telephone-lines-edit.component.html',
  styleUrls: ['./bill-telephone-lines-edit.component.scss'],
  providers: []
})

export class BillTelephoneLinesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBillTelephoneLines: BillTelephoneLines;
  billTelephoneLinesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private subDepartmentsService: LookupService;
private employeeStatusesService: LookupService;
private lineTypesService: LookupService;

  
administrationCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
lineTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('lineType', { static: true }) LineTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBillTelephoneLinesDialog: any,
    @Optional() public dialogRef: MatDialogRef<BillTelephoneLinesEditComponent>,
    public billTelephoneLinesService: BillTelephoneLinesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBillTelephoneLines = new BillTelephoneLines();
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
      
  id : [this.selectedBillTelephoneLines.id],
  employeeCode : [this.selectedBillTelephoneLines.employeeCode, [ Validators.required ]],
  phoneNumber : [this.selectedBillTelephoneLines.phoneNumber, [ Validators.required ]],
  invoiceValue : [this.selectedBillTelephoneLines.invoiceValue, [ Validators.required ]],
  administrationCode : [this.selectedBillTelephoneLines.administrationCode, [ Validators.required ]],
  employeeStatus : [this.selectedBillTelephoneLines.employeeStatus, [ Validators.required ]],
  lineType : [this.selectedBillTelephoneLines.lineType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.billTelephoneLinesService.update(this.billTelephoneLinesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.billTelephoneLinesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.billTelephoneLinesForm.get(name);
  }

  initializeLookupServices() {
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.lineTypesService = new LookupService('linetypes', this.http);
  }
}
