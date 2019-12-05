
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RecordTheExpectationsOfTheInspectors } from 'app/shared/models/record-the-expectations-of-the-inspectors';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RecordTheExpectationsOfTheInspectorsService } from '../shared/record-the-expectations-of-the-inspectors.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-record-the-expectations-of-the-inspectors-edit',
  templateUrl: './record-the-expectations-of-the-inspectors-edit.component.html',
  styleUrls: ['./record-the-expectations-of-the-inspectors-edit.component.scss'],
  providers: []
})

export class RecordTheExpectationsOfTheInspectorsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordTheExpectationsOfTheInspectors: RecordTheExpectationsOfTheInspectors;
  recordTheExpectationsOfTheInspectorsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;
private adjectivesService: LookupService;

  
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
responsibilitySelectOptions: MaterialSelectOptions;

  
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('responsibility', { static: true }) ResponsibilitySelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordTheExpectationsOfTheInspectorsDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordTheExpectationsOfTheInspectorsEditComponent>,
    public recordTheExpectationsOfTheInspectorsService: RecordTheExpectationsOfTheInspectorsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordTheExpectationsOfTheInspectors = new RecordTheExpectationsOfTheInspectors();
    this.selectedRecordTheExpectationsOfTheInspectors = this.selectedRecordTheExpectationsOfTheInspectorsDialog.data || this.selectedRecordTheExpectationsOfTheInspectors;

    
	this.sectionCenterSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القسم/المركز',
	});

	this.villageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القرية/الشياخة',
	});

	this.educationalAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة التعليمية',
	});

	this.responsibilitySelectOptions = new MaterialSelectOptions({
	 data: this.adjectivesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صفة المسئول',
	});


    this.recordTheExpectationsOfTheInspectorsForm = this.formBuilder.group({
      
  id : [this.selectedRecordTheExpectationsOfTheInspectors.id],
  buildingCode : [this.selectedRecordTheExpectationsOfTheInspectors.buildingCode, [ Validators.required ]],
  schoolAddress : [this.selectedRecordTheExpectationsOfTheInspectors.schoolAddress, [ ]],
  previewDate : [this.selectedRecordTheExpectationsOfTheInspectors.previewDate, [ ]],
  startDate : [this.selectedRecordTheExpectationsOfTheInspectors.startDate, [ ]],
  endDate : [this.selectedRecordTheExpectationsOfTheInspectors.endDate, [ ]],
  responseNumber : [this.selectedRecordTheExpectationsOfTheInspectors.responseNumber, [ Validators.required ]],
  responseName : [this.selectedRecordTheExpectationsOfTheInspectors.responseName, [ ]],
  sectionCenter : [this.selectedRecordTheExpectationsOfTheInspectors.sectionCenter, [ Validators.required ]],
  village : [this.selectedRecordTheExpectationsOfTheInspectors.village, [ Validators.required ]],
  educationalAdministration : [this.selectedRecordTheExpectationsOfTheInspectors.educationalAdministration, [ Validators.required ]],
  responsibility : [this.selectedRecordTheExpectationsOfTheInspectors.responsibility, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.recordTheExpectationsOfTheInspectorsService.update(this.recordTheExpectationsOfTheInspectorsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.recordTheExpectationsOfTheInspectorsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.recordTheExpectationsOfTheInspectorsForm.get(name);
  }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
this.adjectivesService = new LookupService('adjectives', this.http);
  }
}
