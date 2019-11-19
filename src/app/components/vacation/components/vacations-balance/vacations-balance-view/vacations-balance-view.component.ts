
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { VacationsBalance } from 'app/shared/models/vacations-balance';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { VacationsBalanceService } from '../shared/vacations-balance.service';

@Component({
  selector: 'app-vacations-balance-view',
  templateUrl: './vacations-balance-view.component.html',
  styleUrls: ['./vacations-balance-view.component.scss'],
  providers: []
})

export class VacationsBalanceViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedVacationsBalance: VacationsBalance;
  vacationsBalanceForm: FormGroup;

  private vacationBalanceTypesService: LookupService;
private appointmentTypesService: LookupService;

  
creditTypeSelectOptions: MaterialSelectOptions;
appointmentTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedVacationsBalanceDialog: any,
    @Optional() public dialogRef: MatDialogRef<VacationsBalanceViewComponent>,
    public vacationsBalanceService: VacationsBalanceService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedVacationsBalance = this.selectedVacationsBalanceDialog.data || this.selectedVacationsBalance;

    
	this.creditTypeSelectOptions = new MaterialSelectOptions({
	 data: this.vacationBalanceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الرصيد',
	});

	this.appointmentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.appointmentTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التعين',
	});


    this.vacationsBalanceForm = this.formBuilder.group({
      
  employeeCode : [this.selectedVacationsBalance.employeeCode],
  employeeBalance : [this.selectedVacationsBalance.employeeBalance],
  fromDate : [this.selectedVacationsBalance.fromDate],
  toDate : [this.selectedVacationsBalance.toDate],
  creditType : [this.selectedVacationsBalance.creditType],
  appointmentType : [this.selectedVacationsBalance.appointmentType]
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
    return this.vacationsBalanceForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.vacationsBalanceForm.controls)) {
      this.vacationsBalanceForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.vacationBalanceTypesService = new LookupService('vacationbalancetypes', this.http);
this.appointmentTypesService = new LookupService('appointmenttypes', this.http);
  }
}

