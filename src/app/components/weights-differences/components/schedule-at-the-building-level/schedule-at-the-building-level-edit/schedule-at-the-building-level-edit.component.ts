
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ScheduleAtTheBuildingLevel } from 'app/shared/models/schedule-at-the-building-level';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ScheduleAtTheBuildingLevelService } from '../shared/schedule-at-the-building-level.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-schedule-at-the-building-level-edit',
  templateUrl: './schedule-at-the-building-level-edit.component.html',
  styleUrls: ['./schedule-at-the-building-level-edit.component.scss'],
  providers: []
})

export class ScheduleAtTheBuildingLevelEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedScheduleAtTheBuildingLevel: ScheduleAtTheBuildingLevel;
  scheduleAtTheBuildingLevelForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private constructionTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedScheduleAtTheBuildingLevelDialog: any,
    @Optional() public dialogRef: MatDialogRef<ScheduleAtTheBuildingLevelEditComponent>,
    public scheduleAtTheBuildingLevelService: ScheduleAtTheBuildingLevelService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedScheduleAtTheBuildingLevel = new ScheduleAtTheBuildingLevel();
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
      
  id : [this.selectedScheduleAtTheBuildingLevel.id],
  buildingCode : [this.selectedScheduleAtTheBuildingLevel.buildingCode, [ Validators.required ]],
  date : [this.selectedScheduleAtTheBuildingLevel.date, [ ]],
  extensionCode : [this.selectedScheduleAtTheBuildingLevel.extensionCode, [ ]],
  yearPlan : [this.selectedScheduleAtTheBuildingLevel.yearPlan, [ ]],
  activityCode : [this.selectedScheduleAtTheBuildingLevel.activityCode, [ ]],
  activityAmountAccordingToItem : [this.selectedScheduleAtTheBuildingLevel.activityAmountAccordingToItem, [ ]],
  constructionType : [this.selectedScheduleAtTheBuildingLevel.constructionType, [ Validators.required ]],
  itemCode : [this.selectedScheduleAtTheBuildingLevel.itemCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.scheduleAtTheBuildingLevelService.update(this.scheduleAtTheBuildingLevelForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.scheduleAtTheBuildingLevelService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.scheduleAtTheBuildingLevelForm.get(name);
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}
