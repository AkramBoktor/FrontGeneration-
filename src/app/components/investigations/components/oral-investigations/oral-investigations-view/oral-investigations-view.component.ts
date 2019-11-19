
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { OralInvestigations } from 'app/shared/models/oral-investigations';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { OralInvestigationsService } from '../shared/oral-investigations.service';

@Component({
  selector: 'app-oral-investigations-view',
  templateUrl: './oral-investigations-view.component.html',
  styleUrls: ['./oral-investigations-view.component.scss'],
  providers: []
})

export class OralInvestigationsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedOralInvestigations: OralInvestigations;
  oralInvestigationsForm: FormGroup;

  private branchCodesService: LookupService;
private violationsService: LookupService;
private penaltiesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
violationCodeSelectOptions: MaterialSelectOptions;
punishmentSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedOralInvestigationsDialog: any,
    @Optional() public dialogRef: MatDialogRef<OralInvestigationsViewComponent>,
    public oralInvestigationsService: OralInvestigationsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedOralInvestigations = this.selectedOralInvestigationsDialog.data || this.selectedOralInvestigations;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.violationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.violationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المخالفة',
	});

	this.punishmentSelectOptions = new MaterialSelectOptions({
	 data: this.penaltiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العقوبة',
	});


    this.oralInvestigationsForm = this.formBuilder.group({
      
  investigationFileNumber : [this.selectedOralInvestigations.investigationFileNumber],
  lawyerPenaltyCode : [this.selectedOralInvestigations.lawyerPenaltyCode],
  punishmentDate : [this.selectedOralInvestigations.punishmentDate],
  executiveOrderNumber : [this.selectedOralInvestigations.executiveOrderNumber],
  issuanceExecutiveOrderDate : [this.selectedOralInvestigations.issuanceExecutiveOrderDate],
  employeeCode : [this.selectedOralInvestigations.employeeCode],
  employeeName : [this.selectedOralInvestigations.employeeName],
  branchCode : [this.selectedOralInvestigations.branchCode],
  violationCode : [this.selectedOralInvestigations.violationCode],
  punishment : [this.selectedOralInvestigations.punishment]
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
    return this.oralInvestigationsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.oralInvestigationsForm.controls)) {
      this.oralInvestigationsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.violationsService = new LookupService('violations', this.http);
this.penaltiesService = new LookupService('penalties', this.http);
  }
}

