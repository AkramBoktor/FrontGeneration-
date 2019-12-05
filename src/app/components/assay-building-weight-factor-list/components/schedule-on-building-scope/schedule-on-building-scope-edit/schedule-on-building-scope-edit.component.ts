
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ScheduleOnBuildingScope } from 'app/shared/models/schedule-on-building-scope';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ScheduleOnBuildingScopeService } from '../shared/schedule-on-building-scope.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-schedule-on-building-scope-edit',
  templateUrl: './schedule-on-building-scope-edit.component.html',
  styleUrls: ['./schedule-on-building-scope-edit.component.scss'],
  providers: []
})

export class ScheduleOnBuildingScopeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedScheduleOnBuildingScope: ScheduleOnBuildingScope;
  scheduleOnBuildingScopeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private constructionTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedScheduleOnBuildingScopeDialog: any,
    @Optional() public dialogRef: MatDialogRef<ScheduleOnBuildingScopeEditComponent>,
    public scheduleOnBuildingScopeService: ScheduleOnBuildingScopeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedScheduleOnBuildingScope = new ScheduleOnBuildingScope();
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
      
  id : [this.selectedScheduleOnBuildingScope.id],
  buildingCode : [this.selectedScheduleOnBuildingScope.buildingCode, [ Validators.required ]],
  date : [this.selectedScheduleOnBuildingScope.date, [ ]],
  extensionCode : [this.selectedScheduleOnBuildingScope.extensionCode, [ ]],
  planYear : [this.selectedScheduleOnBuildingScope.planYear, [ ]],
  activityCode : [this.selectedScheduleOnBuildingScope.activityCode, [ Validators.required ]],
  activityQuantityAccordingToItem : [this.selectedScheduleOnBuildingScope.activityQuantityAccordingToItem, [ ]],
  constructionType : [this.selectedScheduleOnBuildingScope.constructionType, [ ]],
  itemCode : [this.selectedScheduleOnBuildingScope.itemCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.scheduleOnBuildingScopeService.update(this.scheduleOnBuildingScopeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.scheduleOnBuildingScopeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.scheduleOnBuildingScopeForm.get(name);
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}
