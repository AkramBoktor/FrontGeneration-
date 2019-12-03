
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ThePlannedStartDateForTheSchedule } from 'app/shared/models/the-planned-start-date-for-the-schedule';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ThePlannedStartDateForTheScheduleService } from '../shared/the-planned-start-date-for-the-schedule.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-planned-start-date-for-the-schedule-edit',
  templateUrl: './the-planned-start-date-for-the-schedule-edit.component.html',
  styleUrls: ['./the-planned-start-date-for-the-schedule-edit.component.scss'],
  providers: []
})

export class ThePlannedStartDateForTheScheduleEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedThePlannedStartDateForTheSchedule: ThePlannedStartDateForTheSchedule;
  thePlannedStartDateForTheScheduleForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private offeringTypesService: LookupService;
private constructionTypesService: LookupService;
private governoratesService: LookupService;

  
subtractionTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
governorateCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('subtractionType', { static: true }) SubtractionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('governorateCode', { static: true }) GovernorateCodeSelectComponent: MaterialSelectComponent;

  
tenderCodeIsVisible: boolean;

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedThePlannedStartDateForTheScheduleDialog: any,
    @Optional() public dialogRef: MatDialogRef<ThePlannedStartDateForTheScheduleEditComponent>,
    public thePlannedStartDateForTheScheduleService: ThePlannedStartDateForTheScheduleService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedThePlannedStartDateForTheSchedule = new ThePlannedStartDateForTheSchedule();
    this.selectedThePlannedStartDateForTheSchedule = this.selectedThePlannedStartDateForTheScheduleDialog.data || this.selectedThePlannedStartDateForTheSchedule;

    
	this.subtractionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.governorateCodeSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المحافظة',
	});


    this.thePlannedStartDateForTheScheduleForm = this.formBuilder.group({
      
  id : [this.selectedThePlannedStartDateForTheSchedule.id],
  buildingNumberEducational : [this.selectedThePlannedStartDateForTheSchedule.buildingNumberEducational, [ Validators.required ]],
  tenderCode : [this.selectedThePlannedStartDateForTheSchedule.tenderCode, [ ]],
  yearPlan : [this.selectedThePlannedStartDateForTheSchedule.yearPlan, [ ]],
  serialSupplement : [this.selectedThePlannedStartDateForTheSchedule.serialSupplement, [ ]],
  typeOFStartDateForChart : [this.selectedThePlannedStartDateForTheSchedule.typeOFStartDateForChart, [ Validators.required ]],
  startDateForChart : [this.selectedThePlannedStartDateForTheSchedule.startDateForChart, [ Validators.required ]],
  notes : [this.selectedThePlannedStartDateForTheSchedule.notes, [ ]],
  subtractionType : [this.selectedThePlannedStartDateForTheSchedule.subtractionType, [ ]],
  constructionType : [this.selectedThePlannedStartDateForTheSchedule.constructionType, [ ]],
  governorateCode : [this.selectedThePlannedStartDateForTheSchedule.governorateCode, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.thePlannedStartDateForTheScheduleService.update(this.thePlannedStartDateForTheScheduleForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.thePlannedStartDateForTheScheduleService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.thePlannedStartDateForTheScheduleForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.governoratesService = new LookupService('governorates', this.http);
  }
}
