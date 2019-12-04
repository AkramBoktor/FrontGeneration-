
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ScheduleImplementationDataAssayProject } from 'app/shared/models/schedule-implementation-data-assay-project';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ScheduleImplementationDataAssayProjectService } from '../shared/schedule-implementation-data-assay-project.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-schedule-implementation-data-assay-project-edit',
  templateUrl: './schedule-implementation-data-assay-project-edit.component.html',
  styleUrls: ['./schedule-implementation-data-assay-project-edit.component.scss'],
  providers: []
})

export class ScheduleImplementationDataAssayProjectEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedScheduleImplementationDataAssayProject: ScheduleImplementationDataAssayProject;
  scheduleImplementationDataAssayProjectForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private constructionTypesService: LookupService;
private foundationTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
baseTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('baseType', { static: true }) BaseTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedScheduleImplementationDataAssayProjectDialog: any,
    @Optional() public dialogRef: MatDialogRef<ScheduleImplementationDataAssayProjectEditComponent>,
    public scheduleImplementationDataAssayProjectService: ScheduleImplementationDataAssayProjectService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedScheduleImplementationDataAssayProject = new ScheduleImplementationDataAssayProject();
    this.selectedScheduleImplementationDataAssayProject = this.selectedScheduleImplementationDataAssayProjectDialog.data || this.selectedScheduleImplementationDataAssayProject;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الإنشاء',
	});

	this.baseTypeSelectOptions = new MaterialSelectOptions({
	 data: this.foundationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الأساسات',
	});


    this.scheduleImplementationDataAssayProjectForm = this.formBuilder.group({
      
  id : [this.selectedScheduleImplementationDataAssayProject.id],
  buildingCode : [this.selectedScheduleImplementationDataAssayProject.buildingCode, [ Validators.required ]],
  extensionCode : [this.selectedScheduleImplementationDataAssayProject.extensionCode, [ Validators.required ]],
  planYear : [this.selectedScheduleImplementationDataAssayProject.planYear, [ ]],
  modelCode : [this.selectedScheduleImplementationDataAssayProject.modelCode, [ Validators.required ]],
  pricingYear : [this.selectedScheduleImplementationDataAssayProject.pricingYear, [ Validators.required ]],
  scheduleCode : [this.selectedScheduleImplementationDataAssayProject.scheduleCode, [ Validators.required ]],
  executionDuration : [this.selectedScheduleImplementationDataAssayProject.executionDuration, [ ]],
  floorNumber : [this.selectedScheduleImplementationDataAssayProject.floorNumber, [ ]],
  constructionType : [this.selectedScheduleImplementationDataAssayProject.constructionType, [ Validators.required ]],
  baseType : [this.selectedScheduleImplementationDataAssayProject.baseType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.scheduleImplementationDataAssayProjectService.update(this.scheduleImplementationDataAssayProjectForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.scheduleImplementationDataAssayProjectService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.scheduleImplementationDataAssayProjectForm.get(name);
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.foundationTypesService = new LookupService('foundationtypes', this.http);
  }
}
