
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BillTelephoneLines } from 'app/shared/models/bill-telephone-lines';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BillTelephoneLinesService } from '../shared/bill-telephone-lines.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-bill-telephone-lines-new',
  templateUrl: './bill-telephone-lines-new.component.html',
  styleUrls: ['./bill-telephone-lines-new.component.scss'],
  providers: [
    ]
})

export class BillTelephoneLinesNewComponent extends AppBaseComponent implements OnInit {
  billTelephoneLinesForm: FormGroup;
  @Input() selectedBillTelephoneLines: BillTelephoneLines;
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
    @Optional() public dialogRef: MatDialogRef<BillTelephoneLinesNewComponent>,
    public billTelephoneLinesService: BillTelephoneLinesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBillTelephoneLines = new BillTelephoneLines();

    
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
     
  id : [0],
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
    this.billTelephoneLinesService.create(this.billTelephoneLinesForm.value)
        .pipe(switchMap(x => {
			return this.billTelephoneLinesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
