
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ExaminationAndOtherTest } from 'app/shared/models/examination-and-other-test';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExaminationAndOtherTestService } from '../shared/examination-and-other-test.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-examination-and-other-test-new',
  templateUrl: './examination-and-other-test-new.component.html',
  styleUrls: ['./examination-and-other-test-new.component.scss'],
  providers: [
    ]
})

export class ExaminationAndOtherTestNewComponent extends AppBaseComponent implements OnInit {
  examinationAndOtherTestForm: FormGroup;
  @Input() selectedExaminationAndOtherTest: ExaminationAndOtherTest;
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
    @Optional() public dialogRef: MatDialogRef<ExaminationAndOtherTestNewComponent>,
    public examinationAndOtherTestService: ExaminationAndOtherTestService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExaminationAndOtherTest = new ExaminationAndOtherTest();

    
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
     
  id : [0],
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
    this.examinationAndOtherTestService.create(this.examinationAndOtherTestForm.value)
        .pipe(switchMap(x => {
			return this.examinationAndOtherTestService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
