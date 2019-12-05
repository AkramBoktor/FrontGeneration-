
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ScheduleImplementationDataAssayProject } from 'app/shared/models/schedule-implementation-data-assay-project';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ScheduleImplementationDataAssayProjectService } from '../shared/schedule-implementation-data-assay-project.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-schedule-implementation-data-assay-project-new',
  templateUrl: './schedule-implementation-data-assay-project-new.component.html',
  styleUrls: ['./schedule-implementation-data-assay-project-new.component.scss'],
  providers: [
    ]
})

export class ScheduleImplementationDataAssayProjectNewComponent extends AppBaseComponent implements OnInit {
  scheduleImplementationDataAssayProjectForm: FormGroup;
  @Input() selectedScheduleImplementationDataAssayProject: ScheduleImplementationDataAssayProject;
  errorMessages: FormControlError[] = [
        
  ];

  private constructionTypesService: LookupService;
private foundationTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
baseTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('baseType', { static: true }) BaseTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ScheduleImplementationDataAssayProjectNewComponent>,
    public scheduleImplementationDataAssayProjectService: ScheduleImplementationDataAssayProjectService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedScheduleImplementationDataAssayProject = new ScheduleImplementationDataAssayProject();

    
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
     
  id : [0],
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
    this.scheduleImplementationDataAssayProjectService.create(this.scheduleImplementationDataAssayProjectForm.value)
        .pipe(switchMap(x => {
			return this.scheduleImplementationDataAssayProjectService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.scheduleImplementationDataAssayProjectForm.get(name);
    }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.foundationTypesService = new LookupService('foundationtypes', this.http);
  }
 }
