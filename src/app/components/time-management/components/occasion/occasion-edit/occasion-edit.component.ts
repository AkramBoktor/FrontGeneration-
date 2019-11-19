
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Occasion } from 'app/shared/models/occasion';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { OccasionService } from '../shared/occasion.service';




@Component({
  selector: 'app-occasion-edit',
  templateUrl: './occasion-edit.component.html',
  styleUrls: ['./occasion-edit.component.scss'],
  providers: []
})

export class OccasionEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedOccasion: Occasion;
  occasionForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private eventCodesService: LookupService;
private mamoriyaSidesService: LookupService;

  
eventTypeSelectOptions: MaterialSelectOptions;
missionIssuerSelectOptions: MaterialSelectOptions;

  
	@ViewChild('eventType', { static: true }) EventTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('missionIssuer', { static: true }) MissionIssuerSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedOccasionDialog: any,
    @Optional() public dialogRef: MatDialogRef<OccasionEditComponent>,
    public occasionService: OccasionService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedOccasion = new Occasion();
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
      
  id : [this.selectedOccasion.id],
  employeeCode : [this.selectedOccasion.employeeCode, [ Validators.required ]],
  startDate : [this.selectedOccasion.startDate, [ Validators.required ]],
  startTime : [this.selectedOccasion.startTime, [ Validators.required ]],
  expiryDate : [this.selectedOccasion.expiryDate, [ Validators.required ]],
  endTime : [this.selectedOccasion.endTime, [ Validators.required ]],
  missionPurpose : [this.selectedOccasion.missionPurpose, [ Validators.required ]],
  exchangedEmployeeNumber : [this.selectedOccasion.exchangedEmployeeNumber, [ ]],
  restDate : [this.selectedOccasion.restDate, [ ]],
  eventType : [this.selectedOccasion.eventType, [ Validators.required ]],
  missionIssuer : [this.selectedOccasion.missionIssuer, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.occasionService.update(this.occasionForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.occasionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.occasionForm.get(name);
  }

  initializeLookupServices() {
    this.eventCodesService = new LookupService('eventcodes', this.http);
this.mamoriyaSidesService = new LookupService('mamoriyasides', this.http);
  }
}
