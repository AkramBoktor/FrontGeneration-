
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RecordTheExpectationsOfTheInspectors } from 'app/shared/models/record-the-expectations-of-the-inspectors';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordTheExpectationsOfTheInspectorsService } from '../shared/record-the-expectations-of-the-inspectors.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-record-the-expectations-of-the-inspectors-view',
  templateUrl: './record-the-expectations-of-the-inspectors-view.component.html',
  styleUrls: ['./record-the-expectations-of-the-inspectors-view.component.scss'],
  providers: []
})

export class RecordTheExpectationsOfTheInspectorsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordTheExpectationsOfTheInspectors: RecordTheExpectationsOfTheInspectors;
  recordTheExpectationsOfTheInspectorsForm: FormGroup;

  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;
private adjectivesService: LookupService;

  
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
responsibilitySelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordTheExpectationsOfTheInspectorsDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordTheExpectationsOfTheInspectorsViewComponent>,
    public recordTheExpectationsOfTheInspectorsService: RecordTheExpectationsOfTheInspectorsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  buildingCode : [this.selectedRecordTheExpectationsOfTheInspectors.buildingCode],
  schoolAddress : [this.selectedRecordTheExpectationsOfTheInspectors.schoolAddress],
  previewDate : [this.selectedRecordTheExpectationsOfTheInspectors.previewDate],
  startDate : [this.selectedRecordTheExpectationsOfTheInspectors.startDate],
  endDate : [this.selectedRecordTheExpectationsOfTheInspectors.endDate],
  responseNumber : [this.selectedRecordTheExpectationsOfTheInspectors.responseNumber],
  responseName : [this.selectedRecordTheExpectationsOfTheInspectors.responseName],
  sectionCenter : [this.selectedRecordTheExpectationsOfTheInspectors.sectionCenter],
  village : [this.selectedRecordTheExpectationsOfTheInspectors.village],
  educationalAdministration : [this.selectedRecordTheExpectationsOfTheInspectors.educationalAdministration],
  responsibility : [this.selectedRecordTheExpectationsOfTheInspectors.responsibility]
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
    return this.recordTheExpectationsOfTheInspectorsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.recordTheExpectationsOfTheInspectorsForm.controls)) {
      this.recordTheExpectationsOfTheInspectorsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
this.adjectivesService = new LookupService('adjectives', this.http);
  }
}

