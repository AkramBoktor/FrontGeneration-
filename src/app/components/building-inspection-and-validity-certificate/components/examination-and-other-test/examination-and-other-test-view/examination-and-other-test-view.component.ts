
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ExaminationAndOtherTest } from 'app/shared/models/examination-and-other-test';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ExaminationAndOtherTestService } from '../shared/examination-and-other-test.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-examination-and-other-test-view',
  templateUrl: './examination-and-other-test-view.component.html',
  styleUrls: ['./examination-and-other-test-view.component.scss'],
  providers: []
})

export class ExaminationAndOtherTestViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExaminationAndOtherTest: ExaminationAndOtherTest;
  examinationAndOtherTestForm: FormGroup;

  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;

  
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExaminationAndOtherTestDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExaminationAndOtherTestViewComponent>,
    public examinationAndOtherTestService: ExaminationAndOtherTestService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExaminationAndOtherTest = this.selectedExaminationAndOtherTestDialog.data || this.selectedExaminationAndOtherTest;

    
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


    this.examinationAndOtherTestForm = this.formBuilder.group({
      
  buildingCode : [this.selectedExaminationAndOtherTest.buildingCode],
  schoolAddress : [this.selectedExaminationAndOtherTest.schoolAddress],
  previewDate : [this.selectedExaminationAndOtherTest.previewDate],
  startDate : [this.selectedExaminationAndOtherTest.startDate],
  endDate : [this.selectedExaminationAndOtherTest.endDate],
  extensionNumber : [this.selectedExaminationAndOtherTest.extensionNumber],
  text : [this.selectedExaminationAndOtherTest.text],
  sectionCenter : [this.selectedExaminationAndOtherTest.sectionCenter],
  village : [this.selectedExaminationAndOtherTest.village],
  educationalAdministration : [this.selectedExaminationAndOtherTest.educationalAdministration]
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
    return this.examinationAndOtherTestForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.examinationAndOtherTestForm.controls)) {
      this.examinationAndOtherTestForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
  }
}

