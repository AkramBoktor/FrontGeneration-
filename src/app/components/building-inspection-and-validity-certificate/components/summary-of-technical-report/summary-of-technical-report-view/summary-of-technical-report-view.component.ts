
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SummaryOfTechnicalReport } from 'app/shared/models/summary-of-technical-report';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SummaryOfTechnicalReportService } from '../shared/summary-of-technical-report.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-summary-of-technical-report-view',
  templateUrl: './summary-of-technical-report-view.component.html',
  styleUrls: ['./summary-of-technical-report-view.component.scss'],
  providers: []
})

export class SummaryOfTechnicalReportViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSummaryOfTechnicalReport: SummaryOfTechnicalReport;
  summaryOfTechnicalReportForm: FormGroup;

  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;

  
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSummaryOfTechnicalReportDialog: any,
    @Optional() public dialogRef: MatDialogRef<SummaryOfTechnicalReportViewComponent>,
    public summaryOfTechnicalReportService: SummaryOfTechnicalReportService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSummaryOfTechnicalReport = this.selectedSummaryOfTechnicalReportDialog.data || this.selectedSummaryOfTechnicalReport;

    
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


    this.summaryOfTechnicalReportForm = this.formBuilder.group({
      
  buildingCode : [this.selectedSummaryOfTechnicalReport.buildingCode],
  schoolAddress : [this.selectedSummaryOfTechnicalReport.schoolAddress],
  previewDate : [this.selectedSummaryOfTechnicalReport.previewDate],
  startDate : [this.selectedSummaryOfTechnicalReport.startDate],
  endDate : [this.selectedSummaryOfTechnicalReport.endDate],
  statementType : [this.selectedSummaryOfTechnicalReport.statementType],
  text : [this.selectedSummaryOfTechnicalReport.text],
  sectionCenter : [this.selectedSummaryOfTechnicalReport.sectionCenter],
  village : [this.selectedSummaryOfTechnicalReport.village],
  educationalAdministration : [this.selectedSummaryOfTechnicalReport.educationalAdministration]
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
    return this.summaryOfTechnicalReportForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.summaryOfTechnicalReportForm.controls)) {
      this.summaryOfTechnicalReportForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
  }
}

