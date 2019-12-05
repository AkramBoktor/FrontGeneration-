
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DecisionOfTheDirectorOfTheCommission } from 'app/shared/models/decision-of-the-director-of-the-commission';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DecisionOfTheDirectorOfTheCommissionService } from '../shared/decision-of-the-director-of-the-commission.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-decision-of-the-director-of-the-commission-view',
  templateUrl: './decision-of-the-director-of-the-commission-view.component.html',
  styleUrls: ['./decision-of-the-director-of-the-commission-view.component.scss'],
  providers: []
})

export class DecisionOfTheDirectorOfTheCommissionViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDecisionOfTheDirectorOfTheCommission: DecisionOfTheDirectorOfTheCommission;
  decisionOfTheDirectorOfTheCommissionForm: FormGroup;

  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;

  
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDecisionOfTheDirectorOfTheCommissionDialog: any,
    @Optional() public dialogRef: MatDialogRef<DecisionOfTheDirectorOfTheCommissionViewComponent>,
    public decisionOfTheDirectorOfTheCommissionService: DecisionOfTheDirectorOfTheCommissionService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDecisionOfTheDirectorOfTheCommission = this.selectedDecisionOfTheDirectorOfTheCommissionDialog.data || this.selectedDecisionOfTheDirectorOfTheCommission;

    
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


    this.decisionOfTheDirectorOfTheCommissionForm = this.formBuilder.group({
      
  buildingCode : [this.selectedDecisionOfTheDirectorOfTheCommission.buildingCode],
  schoolAddress : [this.selectedDecisionOfTheDirectorOfTheCommission.schoolAddress],
  previewDate : [this.selectedDecisionOfTheDirectorOfTheCommission.previewDate],
  startDate : [this.selectedDecisionOfTheDirectorOfTheCommission.startDate],
  endDate : [this.selectedDecisionOfTheDirectorOfTheCommission.endDate],
  text : [this.selectedDecisionOfTheDirectorOfTheCommission.text],
  sectionCenter : [this.selectedDecisionOfTheDirectorOfTheCommission.sectionCenter],
  village : [this.selectedDecisionOfTheDirectorOfTheCommission.village],
  educationalAdministration : [this.selectedDecisionOfTheDirectorOfTheCommission.educationalAdministration]
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
    return this.decisionOfTheDirectorOfTheCommissionForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.decisionOfTheDirectorOfTheCommissionForm.controls)) {
      this.decisionOfTheDirectorOfTheCommissionForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
  }
}

