
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RecordTheInspectionDateInTheTechnicalReport } from 'app/shared/models/record-the-inspection-date-in-the-technical-report';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordTheInspectionDateInTheTechnicalReportService } from '../shared/record-the-inspection-date-in-the-technical-report.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-record-the-inspection-date-in-the-technical-report-new',
  templateUrl: './record-the-inspection-date-in-the-technical-report-new.component.html',
  styleUrls: ['./record-the-inspection-date-in-the-technical-report-new.component.scss'],
  providers: [
    ]
})

export class RecordTheInspectionDateInTheTechnicalReportNewComponent extends AppBaseComponent implements OnInit {
  recordTheInspectionDateInTheTechnicalReportForm: FormGroup;
  @Input() selectedRecordTheInspectionDateInTheTechnicalReport: RecordTheInspectionDateInTheTechnicalReport;
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
    @Optional() public dialogRef: MatDialogRef<RecordTheInspectionDateInTheTechnicalReportNewComponent>,
    public recordTheInspectionDateInTheTechnicalReportService: RecordTheInspectionDateInTheTechnicalReportService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordTheInspectionDateInTheTechnicalReport = new RecordTheInspectionDateInTheTechnicalReport();

    
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


    this.recordTheInspectionDateInTheTechnicalReportForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedRecordTheInspectionDateInTheTechnicalReport.buildingCode, [ Validators.required ]],
  schoolAddress : [this.selectedRecordTheInspectionDateInTheTechnicalReport.schoolAddress, [ ]],
  previewDate : [this.selectedRecordTheInspectionDateInTheTechnicalReport.previewDate, [ Validators.required ]],
  startDate : [this.selectedRecordTheInspectionDateInTheTechnicalReport.startDate, [ ]],
  endDate : [this.selectedRecordTheInspectionDateInTheTechnicalReport.endDate, [ ]],
  sectionCenter : [this.selectedRecordTheInspectionDateInTheTechnicalReport.sectionCenter, [ ]],
  village : [this.selectedRecordTheInspectionDateInTheTechnicalReport.village, [ ]],
  educationalAdministration : [this.selectedRecordTheInspectionDateInTheTechnicalReport.educationalAdministration, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.recordTheInspectionDateInTheTechnicalReportService.create(this.recordTheInspectionDateInTheTechnicalReportForm.value)
        .pipe(switchMap(x => {
			return this.recordTheInspectionDateInTheTechnicalReportService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.recordTheInspectionDateInTheTechnicalReportForm.get(name);
    }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
  }
 }
