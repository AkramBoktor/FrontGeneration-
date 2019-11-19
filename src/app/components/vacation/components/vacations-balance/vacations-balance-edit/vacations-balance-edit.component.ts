
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { VacationsBalance } from 'app/shared/models/vacations-balance';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { VacationsBalanceService } from '../shared/vacations-balance.service';




@Component({
  selector: 'app-vacations-balance-edit',
  templateUrl: './vacations-balance-edit.component.html',
  styleUrls: ['./vacations-balance-edit.component.scss'],
  providers: []
})

export class VacationsBalanceEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedVacationsBalance: VacationsBalance;
  vacationsBalanceForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private vacationBalanceTypesService: LookupService;
private appointmentTypesService: LookupService;

  
creditTypeSelectOptions: MaterialSelectOptions;
appointmentTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('creditType', { static: true }) CreditTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('appointmentType', { static: true }) AppointmentTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedVacationsBalanceDialog: any,
    @Optional() public dialogRef: MatDialogRef<VacationsBalanceEditComponent>,
    public vacationsBalanceService: VacationsBalanceService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedVacationsBalance = new VacationsBalance();
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
      
  id : [this.selectedVacationsBalance.id],
  employeeCode : [this.selectedVacationsBalance.employeeCode, [ Validators.required ]],
  employeeBalance : [this.selectedVacationsBalance.employeeBalance, [ Validators.required ]],
  fromDate : [this.selectedVacationsBalance.fromDate, [ Validators.required ]],
  toDate : [this.selectedVacationsBalance.toDate, [ Validators.required ]],
  creditType : [this.selectedVacationsBalance.creditType, [ Validators.required ]],
  appointmentType : [this.selectedVacationsBalance.appointmentType, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.vacationsBalanceService.update(this.vacationsBalanceForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.vacationsBalanceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.vacationsBalanceForm.get(name);
  }

  initializeLookupServices() {
    this.vacationBalanceTypesService = new LookupService('vacationbalancetypes', this.http);
this.appointmentTypesService = new LookupService('appointmenttypes', this.http);
  }
}
