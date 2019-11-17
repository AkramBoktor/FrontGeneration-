
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TrainingDestination } from 'app/shared/models/training-destination';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TrainingDestinationService } from '../shared/training-destination.service';

@Component({
  selector: 'app-training-destination-view',
  templateUrl: './training-destination-view.component.html',
  styleUrls: ['./training-destination-view.component.scss'],
  providers: []
})

export class TrainingDestinationViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTrainingDestination: TrainingDestination;
  trainingDestinationForm: FormGroup;

  private entityTypeService: LookupService;
private majorClassificationsService: LookupService;

  
destinationTypeSelectOptions: MaterialSelectOptions;
institutionDestinationSpecializationSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTrainingDestinationDialog: any,
    @Optional() public dialogRef: MatDialogRef<TrainingDestinationViewComponent>,
    public trainingDestinationService: TrainingDestinationService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTrainingDestination = this.selectedTrainingDestinationDialog.data || this.selectedTrainingDestination;

    
	this.destinationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entityTypeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهه',
	});

	this.institutionDestinationSpecializationSelectOptions = new MaterialSelectOptions({
	 data: this.majorClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تخصص الجهه',
	});


    this.trainingDestinationForm = this.formBuilder.group({
      
  destinationCode : [this.selectedTrainingDestination.destinationCode],
  name : [this.selectedTrainingDestination.name],
  titleAddress : [this.selectedTrainingDestination.titleAddress],
  phoneNumber : [this.selectedTrainingDestination.phoneNumber],
  fax : [this.selectedTrainingDestination.fax],
  responsibleManagerName : [this.selectedTrainingDestination.responsibleManagerName],
  destinationType : [this.selectedTrainingDestination.destinationType],
  institutionDestinationSpecialization : [this.selectedTrainingDestination.institutionDestinationSpecialization]
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
    return this.trainingDestinationForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.trainingDestinationForm.controls)) {
      this.trainingDestinationForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.entityTypeService = new LookupService('entitytypes', this.http);
this.majorClassificationsService = new LookupService('majorclassifications', this.http);
  }
}

