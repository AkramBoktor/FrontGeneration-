
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PeriodOfWorkForThePharmacy } from 'app/shared/models/period-of-work-for-the-pharmacy';
import { switchMap } from 'rxjs/operators';
import { PeriodOfWorkForThePharmacyService } from '../shared/period-of-work-for-the-pharmacy.service';




@Component({
  selector: 'app-period-of-work-for-the-pharmacy-edit',
  templateUrl: './period-of-work-for-the-pharmacy-edit.component.html',
  styleUrls: ['./period-of-work-for-the-pharmacy-edit.component.scss'],
  providers: []
})

export class PeriodOfWorkForThePharmacyEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPeriodOfWorkForThePharmacy: PeriodOfWorkForThePharmacy;
  periodOfWorkForThePharmacyForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPeriodOfWorkForThePharmacyDialog: any,
    @Optional() public dialogRef: MatDialogRef<PeriodOfWorkForThePharmacyEditComponent>,
    public periodOfWorkForThePharmacyService: PeriodOfWorkForThePharmacyService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPeriodOfWorkForThePharmacy = new PeriodOfWorkForThePharmacy();
    this.selectedPeriodOfWorkForThePharmacy = this.selectedPeriodOfWorkForThePharmacyDialog.data || this.selectedPeriodOfWorkForThePharmacy;

    

    this.periodOfWorkForThePharmacyForm = this.formBuilder.group({
      
  id : [this.selectedPeriodOfWorkForThePharmacy.id],
  day : [this.selectedPeriodOfWorkForThePharmacy.day, [ Validators.required ]],
  from : [this.selectedPeriodOfWorkForThePharmacy.from, [ Validators.required ]],
  to : [this.selectedPeriodOfWorkForThePharmacy.to, [ Validators.required ]],
  employeeCode : [this.selectedPeriodOfWorkForThePharmacy.employeeCode, [ Validators.required ]],
  employeeName : [this.selectedPeriodOfWorkForThePharmacy.employeeName, [ ]],
  notes : [this.selectedPeriodOfWorkForThePharmacy.notes, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.periodOfWorkForThePharmacyService.update(this.periodOfWorkForThePharmacyForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.periodOfWorkForThePharmacyService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.periodOfWorkForThePharmacyForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
