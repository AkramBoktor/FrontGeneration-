
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SummaryOfTechnicalReport } from 'app/shared/models/summary-of-technical-report';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SummaryOfTechnicalReportService } from '../shared/summary-of-technical-report.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-summary-of-technical-report-new',
  templateUrl: './summary-of-technical-report-new.component.html',
  styleUrls: ['./summary-of-technical-report-new.component.scss'],
  providers: [
    ]
})

export class SummaryOfTechnicalReportNewComponent extends AppBaseComponent implements OnInit {
  summaryOfTechnicalReportForm: FormGroup;
  @Input() selectedSummaryOfTechnicalReport: SummaryOfTechnicalReport;
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
    @Optional() public dialogRef: MatDialogRef<SummaryOfTechnicalReportNewComponent>,
    public summaryOfTechnicalReportService: SummaryOfTechnicalReportService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSummaryOfTechnicalReport = new SummaryOfTechnicalReport();

    
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
     
  id : [0],
  buildingCode : [this.selectedSummaryOfTechnicalReport.buildingCode, [ Validators.required ]],
  schoolAddress : [this.selectedSummaryOfTechnicalReport.schoolAddress, [ ]],
  previewDate : [this.selectedSummaryOfTechnicalReport.previewDate, [ ]],
  startDate : [this.selectedSummaryOfTechnicalReport.startDate, [ ]],
  endDate : [this.selectedSummaryOfTechnicalReport.endDate, [ ]],
  statementType : [this.selectedSummaryOfTechnicalReport.statementType, [ Validators.required ]],
  text : [this.selectedSummaryOfTechnicalReport.text, [ Validators.required ]],
  sectionCenter : [this.selectedSummaryOfTechnicalReport.sectionCenter, [ Validators.required ]],
  village : [this.selectedSummaryOfTechnicalReport.village, [ Validators.required ]],
  educationalAdministration : [this.selectedSummaryOfTechnicalReport.educationalAdministration, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.summaryOfTechnicalReportService.create(this.summaryOfTechnicalReportForm.value)
        .pipe(switchMap(x => {
			return this.summaryOfTechnicalReportService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.summaryOfTechnicalReportForm.get(name);
    }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
  }
 }
