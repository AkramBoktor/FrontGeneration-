
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TypicalFinalExaminationCommitteeReport } from 'app/shared/models/typical-final-examination-committee-report';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TypicalFinalExaminationCommitteeReportService } from '../shared/typical-final-examination-committee-report.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-typical-final-examination-committee-report-view',
  templateUrl: './typical-final-examination-committee-report-view.component.html',
  styleUrls: ['./typical-final-examination-committee-report-view.component.scss'],
  providers: []
})

export class TypicalFinalExaminationCommitteeReportViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTypicalFinalExaminationCommitteeReport: TypicalFinalExaminationCommitteeReport;
  typicalFinalExaminationCommitteeReportForm: FormGroup;

  private constructionTypesService: LookupService;
private processingTypesService: LookupService;
private offeringTypesService: LookupService;
private offeringMethodsService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
processingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTypicalFinalExaminationCommitteeReportDialog: any,
    @Optional() public dialogRef: MatDialogRef<TypicalFinalExaminationCommitteeReportViewComponent>,
    public typicalFinalExaminationCommitteeReportService: TypicalFinalExaminationCommitteeReportService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalFinalExaminationCommitteeReport = this.selectedTypicalFinalExaminationCommitteeReportDialog.data || this.selectedTypicalFinalExaminationCommitteeReport;

    
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
      
  bidNumber : [this.selectedTypicalFinalExaminationCommitteeReport.bidNumber],
  buildingName : [this.selectedTypicalFinalExaminationCommitteeReport.buildingName],
  orderNumber : [this.selectedTypicalFinalExaminationCommitteeReport.orderNumber],
  supplyOrderDate : [this.selectedTypicalFinalExaminationCommitteeReport.supplyOrderDate],
  constructionPlanYear : [this.selectedTypicalFinalExaminationCommitteeReport.constructionPlanYear],
  quantity : [this.selectedTypicalFinalExaminationCommitteeReport.quantity],
  listName : [this.selectedTypicalFinalExaminationCommitteeReport.listName],
  companyName : [this.selectedTypicalFinalExaminationCommitteeReport.companyName],
  number : [this.selectedTypicalFinalExaminationCommitteeReport.number],
  constructionType : [this.selectedTypicalFinalExaminationCommitteeReport.constructionType],
  processingType : [this.selectedTypicalFinalExaminationCommitteeReport.processingType],
  offeringType : [this.selectedTypicalFinalExaminationCommitteeReport.offeringType],
  offeringMethod : [this.selectedTypicalFinalExaminationCommitteeReport.offeringMethod]
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
    return this.typicalFinalExaminationCommitteeReportForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.typicalFinalExaminationCommitteeReportForm.controls)) {
      this.typicalFinalExaminationCommitteeReportForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
  }
}

