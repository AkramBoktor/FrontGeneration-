
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { VacationContract } from 'app/shared/models/vacation-contract';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { VacationContractService } from '../shared/vacation-contract.service';

@Component({
  selector: 'app-vacation-contract-view',
  templateUrl: './vacation-contract-view.component.html',
  styleUrls: ['./vacation-contract-view.component.scss'],
  providers: []
})

export class VacationContractViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedVacationContract: VacationContract;
  vacationContractForm: FormGroup;

  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;
private vacationTypesService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;
vacationsTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedVacationContractDialog: any,
    @Optional() public dialogRef: MatDialogRef<VacationContractViewComponent>,
    public vacationContractService: VacationContractService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedVacationContract = this.selectedVacationContractDialog.data || this.selectedVacationContract;

    
	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة المركزية',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة الفرعية',
	});

	this.vacationsTypeSelectOptions = new MaterialSelectOptions({
	 data: this.vacationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاجازة ',
	});


    this.vacationContractForm = this.formBuilder.group({
      
  employeeCode : [this.selectedVacationContract.employeeCode],
  employeeName : [this.selectedVacationContract.employeeName],
  regularPreviousVacations : [this.selectedVacationContract.regularPreviousVacations],
  regularBalance : [this.selectedVacationContract.regularBalance],
  casualBalance : [this.selectedVacationContract.casualBalance],
  fromDate : [this.selectedVacationContract.fromDate],
  toDate : [this.selectedVacationContract.toDate],
  permission : [this.selectedVacationContract.permission],
  centralAdministration : [this.selectedVacationContract.centralAdministration],
  subAdministration : [this.selectedVacationContract.subAdministration],
  vacationsType : [this.selectedVacationContract.vacationsType]
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
    return this.vacationContractForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.vacationContractForm.controls)) {
      this.vacationContractForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.vacationTypesService = new LookupService('vacationtypes', this.http);
  }
}

