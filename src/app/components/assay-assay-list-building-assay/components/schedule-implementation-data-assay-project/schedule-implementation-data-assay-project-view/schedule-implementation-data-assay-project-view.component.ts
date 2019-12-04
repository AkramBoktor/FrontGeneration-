
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ScheduleImplementationDataAssayProject } from 'app/shared/models/schedule-implementation-data-assay-project';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ScheduleImplementationDataAssayProjectService } from '../shared/schedule-implementation-data-assay-project.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-schedule-implementation-data-assay-project-view',
  templateUrl: './schedule-implementation-data-assay-project-view.component.html',
  styleUrls: ['./schedule-implementation-data-assay-project-view.component.scss'],
  providers: []
})

export class ScheduleImplementationDataAssayProjectViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedScheduleImplementationDataAssayProject: ScheduleImplementationDataAssayProject;
  scheduleImplementationDataAssayProjectForm: FormGroup;

  private constructionTypesService: LookupService;
private foundationTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
baseTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedScheduleImplementationDataAssayProjectDialog: any,
    @Optional() public dialogRef: MatDialogRef<ScheduleImplementationDataAssayProjectViewComponent>,
    public scheduleImplementationDataAssayProjectService: ScheduleImplementationDataAssayProjectService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  buildingCode : [this.selectedScheduleImplementationDataAssayProject.buildingCode],
  extensionCode : [this.selectedScheduleImplementationDataAssayProject.extensionCode],
  planYear : [this.selectedScheduleImplementationDataAssayProject.planYear],
  modelCode : [this.selectedScheduleImplementationDataAssayProject.modelCode],
  pricingYear : [this.selectedScheduleImplementationDataAssayProject.pricingYear],
  scheduleCode : [this.selectedScheduleImplementationDataAssayProject.scheduleCode],
  executionDuration : [this.selectedScheduleImplementationDataAssayProject.executionDuration],
  floorNumber : [this.selectedScheduleImplementationDataAssayProject.floorNumber],
  constructionType : [this.selectedScheduleImplementationDataAssayProject.constructionType],
  baseType : [this.selectedScheduleImplementationDataAssayProject.baseType]
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
    return this.scheduleImplementationDataAssayProjectForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.scheduleImplementationDataAssayProjectForm.controls)) {
      this.scheduleImplementationDataAssayProjectForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.foundationTypesService = new LookupService('foundationtypes', this.http);
  }
}

