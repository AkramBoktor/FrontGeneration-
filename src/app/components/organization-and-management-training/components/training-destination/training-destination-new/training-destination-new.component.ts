
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TrainingDestination } from 'app/shared/models/training-destination';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { TrainingDestinationService } from '../shared/training-destination.service';


@Component({
  selector: 'app-training-destination-new',
  templateUrl: './training-destination-new.component.html',
  styleUrls: ['./training-destination-new.component.scss'],
  providers: [
    ]
})

export class TrainingDestinationNewComponent extends AppBaseComponent implements OnInit {
  trainingDestinationForm: FormGroup;
  @Input() selectedTrainingDestination: TrainingDestination;
  errorMessages: FormControlError[] = [
        
  ];

  private entityTypeService: LookupService;
private majorClassificationsService: LookupService;

  
destinationTypeSelectOptions: MaterialSelectOptions;
institutionDestinationSpecializationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('destinationType', { static: true }) DestinationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('institutionDestinationSpecialization', { static: true }) InstitutionDestinationSpecializationSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TrainingDestinationNewComponent>,
    public trainingDestinationService: TrainingDestinationService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTrainingDestination = new TrainingDestination();

    
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
     
  id : [0],
  destinationCode : [this.selectedTrainingDestination.destinationCode, [ Validators.required ]],
  name : [this.selectedTrainingDestination.name, [ Validators.required ]],
  titleAddress : [this.selectedTrainingDestination.titleAddress, [ Validators.required ]],
  phoneNumber : [this.selectedTrainingDestination.phoneNumber, [ Validators.required ]],
  fax : [this.selectedTrainingDestination.fax, [ Validators.required ]],
  responsibleManagerName : [this.selectedTrainingDestination.responsibleManagerName, [ Validators.required ]],
  destinationType : [this.selectedTrainingDestination.destinationType, [ Validators.required ]],
  institutionDestinationSpecialization : [this.selectedTrainingDestination.institutionDestinationSpecialization, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.trainingDestinationService.create(this.trainingDestinationForm.value)
        .pipe(switchMap(x => {
			return this.trainingDestinationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.trainingDestinationForm.get(name);
    }

  initializeLookupServices() {
    this.entityTypeService = new LookupService('entitytypes', this.http);
this.majorClassificationsService = new LookupService('majorclassifications', this.http);
  }
 }
