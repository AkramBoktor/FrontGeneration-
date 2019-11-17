
import { Component, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PeriodOfWorkForTheClinic } from 'app/shared/models/period-of-work-for-the-clinic';
import { switchMap } from 'rxjs/operators';
import { PeriodOfWorkForTheClinicService } from '../shared/period-of-work-for-the-clinic.service';


@Component({
  selector: 'app-period-of-work-for-the-clinic-new',
  templateUrl: './period-of-work-for-the-clinic-new.component.html',
  styleUrls: ['./period-of-work-for-the-clinic-new.component.scss'],
  providers: [
    ]
})

export class PeriodOfWorkForTheClinicNewComponent extends AppBaseComponent implements OnInit {
  periodOfWorkForTheClinicForm: FormGroup;
  @Input() selectedPeriodOfWorkForTheClinic: PeriodOfWorkForTheClinic;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PeriodOfWorkForTheClinicNewComponent>,
    public periodOfWorkForTheClinicService: PeriodOfWorkForTheClinicService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPeriodOfWorkForTheClinic = new PeriodOfWorkForTheClinic();

    

    this.periodOfWorkForTheClinicForm = this.formBuilder.group({
     
  id : [0],
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
    this.periodOfWorkForTheClinicService.create(this.periodOfWorkForTheClinicForm.value)
        .pipe(switchMap(x => {
			return this.periodOfWorkForTheClinicService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.periodOfWorkForTheClinicForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
