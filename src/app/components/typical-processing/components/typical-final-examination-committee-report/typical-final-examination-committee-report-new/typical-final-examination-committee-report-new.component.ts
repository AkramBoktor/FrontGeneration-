
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TypicalFinalExaminationCommitteeReport } from 'app/shared/models/typical-final-examination-committee-report';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TypicalFinalExaminationCommitteeReportService } from '../shared/typical-final-examination-committee-report.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-typical-final-examination-committee-report-new',
  templateUrl: './typical-final-examination-committee-report-new.component.html',
  styleUrls: ['./typical-final-examination-committee-report-new.component.scss'],
  providers: [
    ]
})

export class TypicalFinalExaminationCommitteeReportNewComponent extends AppBaseComponent implements OnInit {
  typicalFinalExaminationCommitteeReportForm: FormGroup;
  @Input() selectedTypicalFinalExaminationCommitteeReport: TypicalFinalExaminationCommitteeReport;
  errorMessages: FormControlError[] = [
        
  ];

  private constructionTypesService: LookupService;
private processingTypesService: LookupService;
private offeringTypesService: LookupService;
private offeringMethodsService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
processingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TypicalFinalExaminationCommitteeReportNewComponent>,
    public typicalFinalExaminationCommitteeReportService: TypicalFinalExaminationCommitteeReportService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalFinalExaminationCommitteeReport = new TypicalFinalExaminationCommitteeReport();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});


    this.typicalFinalExaminationCommitteeReportForm = this.formBuilder.group({
     
  id : [0],
  bidNumber : [this.selectedTypicalFinalExaminationCommitteeReport.bidNumber, [ ]],
  buildingName : [this.selectedTypicalFinalExaminationCommitteeReport.buildingName, [ ]],
  orderNumber : [this.selectedTypicalFinalExaminationCommitteeReport.orderNumber, [ ]],
  supplyOrderDate : [this.selectedTypicalFinalExaminationCommitteeReport.supplyOrderDate, [ ]],
  constructionPlanYear : [this.selectedTypicalFinalExaminationCommitteeReport.constructionPlanYear, [ ]],
  quantity : [this.selectedTypicalFinalExaminationCommitteeReport.quantity, [ ]],
  listName : [this.selectedTypicalFinalExaminationCommitteeReport.listName, [ ]],
  companyName : [this.selectedTypicalFinalExaminationCommitteeReport.companyName, [ ]],
  number : [this.selectedTypicalFinalExaminationCommitteeReport.number, [ ]],
  constructionType : [this.selectedTypicalFinalExaminationCommitteeReport.constructionType, [ ]],
  processingType : [this.selectedTypicalFinalExaminationCommitteeReport.processingType, [ ]],
  offeringType : [this.selectedTypicalFinalExaminationCommitteeReport.offeringType, [ Validators.required ]],
  offeringMethod : [this.selectedTypicalFinalExaminationCommitteeReport.offeringMethod, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.typicalFinalExaminationCommitteeReportService.create(this.typicalFinalExaminationCommitteeReportForm.value)
        .pipe(switchMap(x => {
			return this.typicalFinalExaminationCommitteeReportService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.typicalFinalExaminationCommitteeReportForm.get(name);
    }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
  }
 }
