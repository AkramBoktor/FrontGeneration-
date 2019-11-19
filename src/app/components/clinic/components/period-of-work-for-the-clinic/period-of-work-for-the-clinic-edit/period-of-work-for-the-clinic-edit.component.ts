
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PeriodOfWorkForTheClinic } from 'app/shared/models/period-of-work-for-the-clinic';
import { switchMap } from 'rxjs/operators';
import { PeriodOfWorkForTheClinicService } from '../shared/period-of-work-for-the-clinic.service';




@Component({
  selector: 'app-period-of-work-for-the-clinic-edit',
  templateUrl: './period-of-work-for-the-clinic-edit.component.html',
  styleUrls: ['./period-of-work-for-the-clinic-edit.component.scss'],
  providers: []
})

export class PeriodOfWorkForTheClinicEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPeriodOfWorkForTheClinic: PeriodOfWorkForTheClinic;
  periodOfWorkForTheClinicForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPeriodOfWorkForTheClinicDialog: any,
    @Optional() public dialogRef: MatDialogRef<PeriodOfWorkForTheClinicEditComponent>,
    public periodOfWorkForTheClinicService: PeriodOfWorkForTheClinicService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPeriodOfWorkForTheClinic = new PeriodOfWorkForTheClinic();
    this.selectedPeriodOfWorkForTheClinic = this.selectedPeriodOfWorkForTheClinicDialog.data || this.selectedPeriodOfWorkForTheClinic;

    

    this.periodOfWorkForTheClinicForm = this.formBuilder.group({
      
  id : [this.selectedPeriodOfWorkForTheClinic.id],
  day : [this.selectedPeriodOfWorkForTheClinic.day, [ Validators.required ]],
  from : [this.selectedPeriodOfWorkForTheClinic.from, [ Validators.required ]],
  to : [this.selectedPeriodOfWorkForTheClinic.to, [ Validators.required ]],
  employeeCode : [this.selectedPeriodOfWorkForTheClinic.employeeCode, [ Validators.required ]],
  notes : [this.selectedPeriodOfWorkForTheClinic.notes, [ Validators.required ]],
  employeeName : [this.selectedPeriodOfWorkForTheClinic.employeeName, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.periodOfWorkForTheClinicService.update(this.periodOfWorkForTheClinicForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.periodOfWorkForTheClinicService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.periodOfWorkForTheClinicForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
