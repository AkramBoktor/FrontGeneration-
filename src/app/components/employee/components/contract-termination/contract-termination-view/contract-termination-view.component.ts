
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ContractTermination } from 'app/shared/models/contract-termination';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ContractTerminationService } from '../shared/contract-termination.service';

@Component({
  selector: 'app-contract-termination-view',
  templateUrl: './contract-termination-view.component.html',
  styleUrls: ['./contract-termination-view.component.scss'],
  providers: []
})

export class ContractTerminationViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContractTermination: ContractTermination;
  contractTerminationForm: FormGroup;

  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContractTerminationDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContractTerminationViewComponent>,
    public contractTerminationService: ContractTerminationService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractTermination = this.selectedContractTerminationDialog.data || this.selectedContractTermination;

    
	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره المركزيه',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره الفرعيه',
	});


    this.contractTerminationForm = this.formBuilder.group({
      
  employeeCode : [this.selectedContractTermination.employeeCode],
  periodNumber : [this.selectedContractTermination.periodNumber],
  periodStartDate : [this.selectedContractTermination.periodStartDate],
  contractAmount : [this.selectedContractTermination.contractAmount],
  hiringDate : [this.selectedContractTermination.hiringDate],
  terminationReason : [this.selectedContractTermination.terminationReason],
  terminationDate : [this.selectedContractTermination.terminationDate],
  notes : [this.selectedContractTermination.notes],
  periodEndDate : [this.selectedContractTermination.periodEndDate],
  centralAdministration : [this.selectedContractTermination.centralAdministration],
  subAdministration : [this.selectedContractTermination.subAdministration]
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
	 errorName: 'minLength',
	 errorMessage: 'Don`t enter less than 1'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'Don`t enter less than 1'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'Don`t enter less than 1'
	}
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.contractTerminationForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.contractTerminationForm.controls)) {
      this.contractTerminationForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}

