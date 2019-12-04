
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ThePlannedStartDateForTheSchedule } from 'app/shared/models/the-planned-start-date-for-the-schedule';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ThePlannedStartDateForTheScheduleService } from '../shared/the-planned-start-date-for-the-schedule.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-planned-start-date-for-the-schedule-view',
  templateUrl: './the-planned-start-date-for-the-schedule-view.component.html',
  styleUrls: ['./the-planned-start-date-for-the-schedule-view.component.scss'],
  providers: []
})

export class ThePlannedStartDateForTheScheduleViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedThePlannedStartDateForTheSchedule: ThePlannedStartDateForTheSchedule;
  thePlannedStartDateForTheScheduleForm: FormGroup;

  private offeringTypesService: LookupService;
private constructionTypesService: LookupService;
private governoratesService: LookupService;

  
subtractionTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
governorateCodeSelectOptions: MaterialSelectOptions;

  
tenderCodeIsVisible: boolean;

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedThePlannedStartDateForTheScheduleDialog: any,
    @Optional() public dialogRef: MatDialogRef<ThePlannedStartDateForTheScheduleViewComponent>,
    public thePlannedStartDateForTheScheduleService: ThePlannedStartDateForTheScheduleService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  buildingNumberEducational : [this.selectedThePlannedStartDateForTheSchedule.buildingNumberEducational],
  tenderCode : [this.selectedThePlannedStartDateForTheSchedule.tenderCode],
  yearPlan : [this.selectedThePlannedStartDateForTheSchedule.yearPlan],
  serialSupplement : [this.selectedThePlannedStartDateForTheSchedule.serialSupplement],
  typeOFStartDateForChart : [this.selectedThePlannedStartDateForTheSchedule.typeOFStartDateForChart],
  startDateForChart : [this.selectedThePlannedStartDateForTheSchedule.startDateForChart],
  notes : [this.selectedThePlannedStartDateForTheSchedule.notes],
  subtractionType : [this.selectedThePlannedStartDateForTheSchedule.subtractionType],
  constructionType : [this.selectedThePlannedStartDateForTheSchedule.constructionType],
  governorateCode : [this.selectedThePlannedStartDateForTheSchedule.governorateCode]
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
    return this.thePlannedStartDateForTheScheduleForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.thePlannedStartDateForTheScheduleForm.controls)) {
      this.thePlannedStartDateForTheScheduleForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.governoratesService = new LookupService('governorates', this.http);
  }
}

