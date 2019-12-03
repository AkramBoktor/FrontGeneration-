
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RecordTheInspectionDateInTheTechnicalReport } from 'app/shared/models/record-the-inspection-date-in-the-technical-report';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordTheInspectionDateInTheTechnicalReportService } from '../shared/record-the-inspection-date-in-the-technical-report.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-record-the-inspection-date-in-the-technical-report-view',
  templateUrl: './record-the-inspection-date-in-the-technical-report-view.component.html',
  styleUrls: ['./record-the-inspection-date-in-the-technical-report-view.component.scss'],
  providers: []
})

export class RecordTheInspectionDateInTheTechnicalReportViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordTheInspectionDateInTheTechnicalReport: RecordTheInspectionDateInTheTechnicalReport;
  recordTheInspectionDateInTheTechnicalReportForm: FormGroup;

  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;

  
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordTheInspectionDateInTheTechnicalReportDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordTheInspectionDateInTheTechnicalReportViewComponent>,
    public recordTheInspectionDateInTheTechnicalReportService: RecordTheInspectionDateInTheTechnicalReportService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  buildingCode : [this.selectedRecordTheInspectionDateInTheTechnicalReport.buildingCode],
  schoolAddress : [this.selectedRecordTheInspectionDateInTheTechnicalReport.schoolAddress],
  previewDate : [this.selectedRecordTheInspectionDateInTheTechnicalReport.previewDate],
  startDate : [this.selectedRecordTheInspectionDateInTheTechnicalReport.startDate],
  endDate : [this.selectedRecordTheInspectionDateInTheTechnicalReport.endDate],
  sectionCenter : [this.selectedRecordTheInspectionDateInTheTechnicalReport.sectionCenter],
  village : [this.selectedRecordTheInspectionDateInTheTechnicalReport.village],
  educationalAdministration : [this.selectedRecordTheInspectionDateInTheTechnicalReport.educationalAdministration]
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
    return this.recordTheInspectionDateInTheTechnicalReportForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.recordTheInspectionDateInTheTechnicalReportForm.controls)) {
      this.recordTheInspectionDateInTheTechnicalReportForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
  }
}

