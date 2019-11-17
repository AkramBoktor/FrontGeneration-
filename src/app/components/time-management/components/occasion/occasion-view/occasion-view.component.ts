
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Occasion } from 'app/shared/models/occasion';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { OccasionService } from '../shared/occasion.service';

@Component({
  selector: 'app-occasion-view',
  templateUrl: './occasion-view.component.html',
  styleUrls: ['./occasion-view.component.scss'],
  providers: []
})

export class OccasionViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedOccasion: Occasion;
  occasionForm: FormGroup;

  private eventCodesService: LookupService;
private mamoriyaSidesService: LookupService;

  
eventTypeSelectOptions: MaterialSelectOptions;
missionIssuerSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedOccasionDialog: any,
    @Optional() public dialogRef: MatDialogRef<OccasionViewComponent>,
    public occasionService: OccasionService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedOccasion = this.selectedOccasionDialog.data || this.selectedOccasion;

    
	this.eventTypeSelectOptions = new MaterialSelectOptions({
	 data: this.eventCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الحدث',
	});

	this.missionIssuerSelectOptions = new MaterialSelectOptions({
	 data: this.mamoriyaSidesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'جهة المأمورية',
	});


    this.occasionForm = this.formBuilder.group({
      
  employeeCode : [this.selectedOccasion.employeeCode],
  startDate : [this.selectedOccasion.startDate],
  startTime : [this.selectedOccasion.startTime],
  expiryDate : [this.selectedOccasion.expiryDate],
  endTime : [this.selectedOccasion.endTime],
  missionPurpose : [this.selectedOccasion.missionPurpose],
  exchangedEmployeeNumber : [this.selectedOccasion.exchangedEmployeeNumber],
  restDate : [this.selectedOccasion.restDate],
  eventType : [this.selectedOccasion.eventType],
  missionIssuer : [this.selectedOccasion.missionIssuer]
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
    return this.occasionForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.occasionForm.controls)) {
      this.occasionForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.eventCodesService = new LookupService('eventcodes', this.http);
this.mamoriyaSidesService = new LookupService('mamoriyasides', this.http);
  }
}

