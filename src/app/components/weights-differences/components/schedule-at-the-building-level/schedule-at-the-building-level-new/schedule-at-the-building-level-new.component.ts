
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ScheduleAtTheBuildingLevel } from 'app/shared/models/schedule-at-the-building-level';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ScheduleAtTheBuildingLevelService } from '../shared/schedule-at-the-building-level.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-schedule-at-the-building-level-new',
  templateUrl: './schedule-at-the-building-level-new.component.html',
  styleUrls: ['./schedule-at-the-building-level-new.component.scss'],
  providers: [
    ]
})

export class ScheduleAtTheBuildingLevelNewComponent extends AppBaseComponent implements OnInit {
  scheduleAtTheBuildingLevelForm: FormGroup;
  @Input() selectedScheduleAtTheBuildingLevel: ScheduleAtTheBuildingLevel;
  errorMessages: FormControlError[] = [
        
  ];

  private constructionTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ScheduleAtTheBuildingLevelNewComponent>,
    public scheduleAtTheBuildingLevelService: ScheduleAtTheBuildingLevelService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedScheduleAtTheBuildingLevel = new ScheduleAtTheBuildingLevel();

    
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
     
  id : [0],
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
    this.scheduleAtTheBuildingLevelService.create(this.scheduleAtTheBuildingLevelForm.value)
        .pipe(switchMap(x => {
			return this.scheduleAtTheBuildingLevelService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.scheduleAtTheBuildingLevelForm.get(name);
    }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
 }
