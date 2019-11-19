
import { Component, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PeriodOfWorkForThePharmacy } from 'app/shared/models/period-of-work-for-the-pharmacy';
import { switchMap } from 'rxjs/operators';
import { PeriodOfWorkForThePharmacyService } from '../shared/period-of-work-for-the-pharmacy.service';


@Component({
  selector: 'app-period-of-work-for-the-pharmacy-new',
  templateUrl: './period-of-work-for-the-pharmacy-new.component.html',
  styleUrls: ['./period-of-work-for-the-pharmacy-new.component.scss'],
  providers: [
    ]
})

export class PeriodOfWorkForThePharmacyNewComponent extends AppBaseComponent implements OnInit {
  periodOfWorkForThePharmacyForm: FormGroup;
  @Input() selectedPeriodOfWorkForThePharmacy: PeriodOfWorkForThePharmacy;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PeriodOfWorkForThePharmacyNewComponent>,
    public periodOfWorkForThePharmacyService: PeriodOfWorkForThePharmacyService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPeriodOfWorkForThePharmacy = new PeriodOfWorkForThePharmacy();

    

    this.periodOfWorkForThePharmacyForm = this.formBuilder.group({
     
  id : [0],
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
    this.periodOfWorkForThePharmacyService.create(this.periodOfWorkForThePharmacyForm.value)
        .pipe(switchMap(x => {
			return this.periodOfWorkForThePharmacyService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.periodOfWorkForThePharmacyForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
