
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DecisionOfTheDirectorOfTheCommission } from 'app/shared/models/decision-of-the-director-of-the-commission';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DecisionOfTheDirectorOfTheCommissionService } from '../shared/decision-of-the-director-of-the-commission.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-decision-of-the-director-of-the-commission-edit',
  templateUrl: './decision-of-the-director-of-the-commission-edit.component.html',
  styleUrls: ['./decision-of-the-director-of-the-commission-edit.component.scss'],
  providers: []
})

export class DecisionOfTheDirectorOfTheCommissionEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDecisionOfTheDirectorOfTheCommission: DecisionOfTheDirectorOfTheCommission;
  decisionOfTheDirectorOfTheCommissionForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDecisionOfTheDirectorOfTheCommissionDialog: any,
    @Optional() public dialogRef: MatDialogRef<DecisionOfTheDirectorOfTheCommissionEditComponent>,
    public decisionOfTheDirectorOfTheCommissionService: DecisionOfTheDirectorOfTheCommissionService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDecisionOfTheDirectorOfTheCommission = new DecisionOfTheDirectorOfTheCommission();
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
      
  id : [this.selectedDecisionOfTheDirectorOfTheCommission.id],
  buildingCode : [this.selectedDecisionOfTheDirectorOfTheCommission.buildingCode, [ Validators.required ]],
  schoolAddress : [this.selectedDecisionOfTheDirectorOfTheCommission.schoolAddress, [ ]],
  previewDate : [this.selectedDecisionOfTheDirectorOfTheCommission.previewDate, [ ]],
  startDate : [this.selectedDecisionOfTheDirectorOfTheCommission.startDate, [ ]],
  endDate : [this.selectedDecisionOfTheDirectorOfTheCommission.endDate, [ ]],
  text : [this.selectedDecisionOfTheDirectorOfTheCommission.text, [ Validators.required ]],
  sectionCenter : [this.selectedDecisionOfTheDirectorOfTheCommission.sectionCenter, [ Validators.required ]],
  village : [this.selectedDecisionOfTheDirectorOfTheCommission.village, [ Validators.required ]],
  educationalAdministration : [this.selectedDecisionOfTheDirectorOfTheCommission.educationalAdministration, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.decisionOfTheDirectorOfTheCommissionService.update(this.decisionOfTheDirectorOfTheCommissionForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.decisionOfTheDirectorOfTheCommissionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.decisionOfTheDirectorOfTheCommissionForm.get(name);
  }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
  }
}
