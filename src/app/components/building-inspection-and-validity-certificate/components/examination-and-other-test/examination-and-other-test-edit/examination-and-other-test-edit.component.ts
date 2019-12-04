
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ExaminationAndOtherTest } from 'app/shared/models/examination-and-other-test';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ExaminationAndOtherTestService } from '../shared/examination-and-other-test.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-examination-and-other-test-edit',
  templateUrl: './examination-and-other-test-edit.component.html',
  styleUrls: ['./examination-and-other-test-edit.component.scss'],
  providers: []
})

export class ExaminationAndOtherTestEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExaminationAndOtherTest: ExaminationAndOtherTest;
  examinationAndOtherTestForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;

  
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExaminationAndOtherTestDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExaminationAndOtherTestEditComponent>,
    public examinationAndOtherTestService: ExaminationAndOtherTestService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExaminationAndOtherTest = new ExaminationAndOtherTest();
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
      
  id : [this.selectedExaminationAndOtherTest.id],
  buildingCode : [this.selectedExaminationAndOtherTest.buildingCode, [ Validators.required ]],
  schoolAddress : [this.selectedExaminationAndOtherTest.schoolAddress, [ ]],
  previewDate : [this.selectedExaminationAndOtherTest.previewDate, [ ]],
  startDate : [this.selectedExaminationAndOtherTest.startDate, [ ]],
  endDate : [this.selectedExaminationAndOtherTest.endDate, [ ]],
  extensionNumber : [this.selectedExaminationAndOtherTest.extensionNumber, [ Validators.required ]],
  text : [this.selectedExaminationAndOtherTest.text, [ Validators.required ]],
  sectionCenter : [this.selectedExaminationAndOtherTest.sectionCenter, [ Validators.required ]],
  village : [this.selectedExaminationAndOtherTest.village, [ Validators.required ]],
  educationalAdministration : [this.selectedExaminationAndOtherTest.educationalAdministration, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.examinationAndOtherTestService.update(this.examinationAndOtherTestForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.examinationAndOtherTestService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.examinationAndOtherTestForm.get(name);
  }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
  }
}
