
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ScheduleAtTheBuildingLevel } from 'app/shared/models/schedule-at-the-building-level';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ScheduleAtTheBuildingLevelService } from '../shared/schedule-at-the-building-level.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-schedule-at-the-building-level-view',
  templateUrl: './schedule-at-the-building-level-view.component.html',
  styleUrls: ['./schedule-at-the-building-level-view.component.scss'],
  providers: []
})

export class ScheduleAtTheBuildingLevelViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedScheduleAtTheBuildingLevel: ScheduleAtTheBuildingLevel;
  scheduleAtTheBuildingLevelForm: FormGroup;

  private constructionTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedScheduleAtTheBuildingLevelDialog: any,
    @Optional() public dialogRef: MatDialogRef<ScheduleAtTheBuildingLevelViewComponent>,
    public scheduleAtTheBuildingLevelService: ScheduleAtTheBuildingLevelService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedScheduleAtTheBuildingLevel = this.selectedScheduleAtTheBuildingLevelDialog.data || this.selectedScheduleAtTheBuildingLevel;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.scheduleAtTheBuildingLevelForm = this.formBuilder.group({
      
  buildingCode : [this.selectedScheduleAtTheBuildingLevel.buildingCode],
  date : [this.selectedScheduleAtTheBuildingLevel.date],
  extensionCode : [this.selectedScheduleAtTheBuildingLevel.extensionCode],
  yearPlan : [this.selectedScheduleAtTheBuildingLevel.yearPlan],
  activityCode : [this.selectedScheduleAtTheBuildingLevel.activityCode],
  activityAmountAccordingToItem : [this.selectedScheduleAtTheBuildingLevel.activityAmountAccordingToItem],
  constructionType : [this.selectedScheduleAtTheBuildingLevel.constructionType],
  itemCode : [this.selectedScheduleAtTheBuildingLevel.itemCode]
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
    return this.scheduleAtTheBuildingLevelForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.scheduleAtTheBuildingLevelForm.controls)) {
      this.scheduleAtTheBuildingLevelForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}

