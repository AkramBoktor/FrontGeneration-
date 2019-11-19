
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TrainingDestination } from 'app/shared/models/training-destination';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { TrainingDestinationService } from '../shared/training-destination.service';




@Component({
  selector: 'app-training-destination-edit',
  templateUrl: './training-destination-edit.component.html',
  styleUrls: ['./training-destination-edit.component.scss'],
  providers: []
})

export class TrainingDestinationEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTrainingDestination: TrainingDestination;
  trainingDestinationForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private entityCodesService: LookupService;
private entityTypeService: LookupService;
private majorClassificationsService: LookupService;

  
destinationCodeSelectOptions: MaterialSelectOptions;
destinationTypeSelectOptions: MaterialSelectOptions;
institutionDestinationSpecializationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('destinationCode', { static: true }) DestinationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('destinationType', { static: true }) DestinationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('institutionDestinationSpecialization', { static: true }) InstitutionDestinationSpecializationSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTrainingDestinationDialog: any,
    @Optional() public dialogRef: MatDialogRef<TrainingDestinationEditComponent>,
    public trainingDestinationService: TrainingDestinationService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTrainingDestination = new TrainingDestination();
    this.selectedTrainingDestination = this.selectedTrainingDestinationDialog.data || this.selectedTrainingDestination;

    
	this.destinationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهه',
	});

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
      
  id : [this.selectedTrainingDestination.id],
  name : [this.selectedTrainingDestination.name, [ Validators.required ]],
  titleAddress : [this.selectedTrainingDestination.titleAddress, [ Validators.required ]],
  phoneNumber : [this.selectedTrainingDestination.phoneNumber, [ Validators.required ]],
  fax : [this.selectedTrainingDestination.fax, [ Validators.required ]],
  responsibleManagerName : [this.selectedTrainingDestination.responsibleManagerName, [ Validators.required ]],
  destinationCode : [this.selectedTrainingDestination.destinationCode, [ Validators.required ]],
  destinationType : [this.selectedTrainingDestination.destinationType, [ Validators.required ]],
  institutionDestinationSpecialization : [this.selectedTrainingDestination.institutionDestinationSpecialization, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.trainingDestinationService.update(this.trainingDestinationForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.trainingDestinationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.trainingDestinationForm.get(name);
  }

  initializeLookupServices() {
    this.entityCodesService = new LookupService('entitycodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.majorClassificationsService = new LookupService('majorclassifications', this.http);
  }
}
