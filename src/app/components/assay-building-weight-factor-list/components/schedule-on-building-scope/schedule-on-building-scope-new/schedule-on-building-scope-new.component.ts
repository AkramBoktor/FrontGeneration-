
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ScheduleOnBuildingScope } from 'app/shared/models/schedule-on-building-scope';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ScheduleOnBuildingScopeService } from '../shared/schedule-on-building-scope.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-schedule-on-building-scope-new',
  templateUrl: './schedule-on-building-scope-new.component.html',
  styleUrls: ['./schedule-on-building-scope-new.component.scss'],
  providers: [
    ]
})

export class ScheduleOnBuildingScopeNewComponent extends AppBaseComponent implements OnInit {
  scheduleOnBuildingScopeForm: FormGroup;
  @Input() selectedScheduleOnBuildingScope: ScheduleOnBuildingScope;
  errorMessages: FormControlError[] = [
        
  ];

  private constructionTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ScheduleOnBuildingScopeNewComponent>,
    public scheduleOnBuildingScopeService: ScheduleOnBuildingScopeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedScheduleOnBuildingScope = new ScheduleOnBuildingScope();

    
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
     
  id : [0],
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
    this.scheduleOnBuildingScopeService.create(this.scheduleOnBuildingScopeForm.value)
        .pipe(switchMap(x => {
			return this.scheduleOnBuildingScopeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.scheduleOnBuildingScopeForm.get(name);
    }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
 }
