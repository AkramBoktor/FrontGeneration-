
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ScheduleOnBuildingScope } from 'app/shared/models/schedule-on-building-scope';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ScheduleOnBuildingScopeService } from '../shared/schedule-on-building-scope.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-schedule-on-building-scope-view',
  templateUrl: './schedule-on-building-scope-view.component.html',
  styleUrls: ['./schedule-on-building-scope-view.component.scss'],
  providers: []
})

export class ScheduleOnBuildingScopeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedScheduleOnBuildingScope: ScheduleOnBuildingScope;
  scheduleOnBuildingScopeForm: FormGroup;

  private constructionTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedScheduleOnBuildingScopeDialog: any,
    @Optional() public dialogRef: MatDialogRef<ScheduleOnBuildingScopeViewComponent>,
    public scheduleOnBuildingScopeService: ScheduleOnBuildingScopeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedScheduleOnBuildingScope = this.selectedScheduleOnBuildingScopeDialog.data || this.selectedScheduleOnBuildingScope;

    
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


    this.scheduleOnBuildingScopeForm = this.formBuilder.group({
      
  buildingCode : [this.selectedScheduleOnBuildingScope.buildingCode],
  date : [this.selectedScheduleOnBuildingScope.date],
  extensionCode : [this.selectedScheduleOnBuildingScope.extensionCode],
  planYear : [this.selectedScheduleOnBuildingScope.planYear],
  activityCode : [this.selectedScheduleOnBuildingScope.activityCode],
  activityQuantityAccordingToItem : [this.selectedScheduleOnBuildingScope.activityQuantityAccordingToItem],
  constructionType : [this.selectedScheduleOnBuildingScope.constructionType],
  itemCode : [this.selectedScheduleOnBuildingScope.itemCode]
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
    return this.scheduleOnBuildingScopeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.scheduleOnBuildingScopeForm.controls)) {
      this.scheduleOnBuildingScopeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}

