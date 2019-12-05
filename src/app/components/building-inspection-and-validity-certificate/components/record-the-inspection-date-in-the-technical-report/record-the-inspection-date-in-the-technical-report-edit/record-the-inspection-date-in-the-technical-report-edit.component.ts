
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RecordTheInspectionDateInTheTechnicalReport } from 'app/shared/models/record-the-inspection-date-in-the-technical-report';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RecordTheInspectionDateInTheTechnicalReportService } from '../shared/record-the-inspection-date-in-the-technical-report.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-record-the-inspection-date-in-the-technical-report-edit',
  templateUrl: './record-the-inspection-date-in-the-technical-report-edit.component.html',
  styleUrls: ['./record-the-inspection-date-in-the-technical-report-edit.component.scss'],
  providers: []
})

export class RecordTheInspectionDateInTheTechnicalReportEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordTheInspectionDateInTheTechnicalReport: RecordTheInspectionDateInTheTechnicalReport;
  recordTheInspectionDateInTheTechnicalReportForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordTheInspectionDateInTheTechnicalReportDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordTheInspectionDateInTheTechnicalReportEditComponent>,
    public recordTheInspectionDateInTheTechnicalReportService: RecordTheInspectionDateInTheTechnicalReportService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordTheInspectionDateInTheTechnicalReport = new RecordTheInspectionDateInTheTechnicalReport();
    this.selectedRecordTheInspectionDateInTheTechnicalReport = this.selectedRecordTheInspectionDateInTheTechnicalReportDialog.data || this.selectedRecordTheInspectionDateInTheTechnicalReport;

    
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
      
  id : [this.selectedRecordTheInspectionDateInTheTechnicalReport.id],
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
    this.recordTheInspectionDateInTheTechnicalReportService.update(this.recordTheInspectionDateInTheTechnicalReportForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.recordTheInspectionDateInTheTechnicalReportService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.recordTheInspectionDateInTheTechnicalReportForm.get(name);
  }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
  }
}
