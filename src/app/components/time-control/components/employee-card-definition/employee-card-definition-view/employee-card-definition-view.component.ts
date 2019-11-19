
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EmployeeCardDefinition } from 'app/shared/models/employee-card-definition';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EmployeeCardDefinitionService } from '../shared/employee-card-definition.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-employee-card-definition-view',
  templateUrl: './employee-card-definition-view.component.html',
  styleUrls: ['./employee-card-definition-view.component.scss'],
  providers: []
})

export class EmployeeCardDefinitionViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeeCardDefinition: EmployeeCardDefinition;
  employeeCardDefinitionForm: FormGroup;

  private branchCodesService: LookupService;
private employeeStatusesService: LookupService;
private cardemissionsService: LookupService;
private cardCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
cardIssuingSelectOptions: MaterialSelectOptions;
cardCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeeCardDefinitionDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeeCardDefinitionViewComponent>,
    public employeeCardDefinitionService: EmployeeCardDefinitionService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeCardDefinition = this.selectedEmployeeCardDefinitionDialog.data || this.selectedEmployeeCardDefinition;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الفرع التابع لها',
	});

	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});

	this.cardIssuingSelectOptions = new MaterialSelectOptions({
	 data: this.cardemissionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'اصدار الكارت',
	});

	this.cardCodeSelectOptions = new MaterialSelectOptions({
	 data: this.cardCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الكارت',
	});


    this.employeeCardDefinitionForm = this.formBuilder.group({
      
  employeeCode : [this.selectedEmployeeCardDefinition.employeeCode],
  jobTitle : [this.selectedEmployeeCardDefinition.jobTitle],
  receiptWorkDate : [this.selectedEmployeeCardDefinition.receiptWorkDate],
  branchCode : [this.selectedEmployeeCardDefinition.branchCode],
  employeeStatus : [this.selectedEmployeeCardDefinition.employeeStatus],
  cardIssuing : [this.selectedEmployeeCardDefinition.cardIssuing],
  cardCode : [this.selectedEmployeeCardDefinition.cardCode]
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
    return this.employeeCardDefinitionForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.employeeCardDefinitionForm.controls)) {
      this.employeeCardDefinitionForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.cardemissionsService = new LookupService('cardemissions', this.http);
this.cardCodesService = new LookupService('cardcodes', this.http);
  }
}

