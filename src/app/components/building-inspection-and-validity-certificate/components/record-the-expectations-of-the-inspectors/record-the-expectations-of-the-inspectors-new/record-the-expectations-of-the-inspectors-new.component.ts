
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RecordTheExpectationsOfTheInspectors } from 'app/shared/models/record-the-expectations-of-the-inspectors';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordTheExpectationsOfTheInspectorsService } from '../shared/record-the-expectations-of-the-inspectors.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-record-the-expectations-of-the-inspectors-new',
  templateUrl: './record-the-expectations-of-the-inspectors-new.component.html',
  styleUrls: ['./record-the-expectations-of-the-inspectors-new.component.scss'],
  providers: [
    ]
})

export class RecordTheExpectationsOfTheInspectorsNewComponent extends AppBaseComponent implements OnInit {
  recordTheExpectationsOfTheInspectorsForm: FormGroup;
  @Input() selectedRecordTheExpectationsOfTheInspectors: RecordTheExpectationsOfTheInspectors;
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
    @Optional() public dialogRef: MatDialogRef<RecordTheExpectationsOfTheInspectorsNewComponent>,
    public recordTheExpectationsOfTheInspectorsService: RecordTheExpectationsOfTheInspectorsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordTheExpectationsOfTheInspectors = new RecordTheExpectationsOfTheInspectors();

    
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
     
  id : [0],
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
    this.recordTheExpectationsOfTheInspectorsService.create(this.recordTheExpectationsOfTheInspectorsForm.value)
        .pipe(switchMap(x => {
			return this.recordTheExpectationsOfTheInspectorsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
