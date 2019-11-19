
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeCardDefinition } from 'app/shared/models/employee-card-definition';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EmployeeCardDefinitionService } from '../shared/employee-card-definition.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-employee-card-definition-edit',
  templateUrl: './employee-card-definition-edit.component.html',
  styleUrls: ['./employee-card-definition-edit.component.scss'],
  providers: []
})

export class EmployeeCardDefinitionEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeeCardDefinition: EmployeeCardDefinition;
  employeeCardDefinitionForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private employeeStatusesService: LookupService;
private cardemissionsService: LookupService;
private cardCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
cardIssuingSelectOptions: MaterialSelectOptions;
cardCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('cardIssuing', { static: true }) CardIssuingSelectComponent: MaterialSelectComponent;
	@ViewChild('cardCode', { static: true }) CardCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeeCardDefinitionDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeeCardDefinitionEditComponent>,
    public employeeCardDefinitionService: EmployeeCardDefinitionService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeCardDefinition = new EmployeeCardDefinition();
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
      
  id : [this.selectedEmployeeCardDefinition.id],
  employeeCode : [this.selectedEmployeeCardDefinition.employeeCode, [ Validators.required ]],
  jobTitle : [this.selectedEmployeeCardDefinition.jobTitle, [ Validators.required ]],
  receiptWorkDate : [this.selectedEmployeeCardDefinition.receiptWorkDate, [ Validators.required ]],
  branchCode : [this.selectedEmployeeCardDefinition.branchCode, [ Validators.required ]],
  employeeStatus : [this.selectedEmployeeCardDefinition.employeeStatus, [ Validators.required ]],
  cardIssuing : [this.selectedEmployeeCardDefinition.cardIssuing, [ Validators.required ]],
  cardCode : [this.selectedEmployeeCardDefinition.cardCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.employeeCardDefinitionService.update(this.employeeCardDefinitionForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.employeeCardDefinitionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.employeeCardDefinitionForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.cardemissionsService = new LookupService('cardemissions', this.http);
this.cardCodesService = new LookupService('cardcodes', this.http);
  }
}
