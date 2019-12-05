
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TechnicalOpinionOfConsultant } from 'app/shared/models/technical-opinion-of-consultant';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TechnicalOpinionOfConsultantService } from '../shared/technical-opinion-of-consultant.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-technical-opinion-of-consultant-view',
  templateUrl: './technical-opinion-of-consultant-view.component.html',
  styleUrls: ['./technical-opinion-of-consultant-view.component.scss'],
  providers: []
})

export class TechnicalOpinionOfConsultantViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTechnicalOpinionOfConsultant: TechnicalOpinionOfConsultant;
  technicalOpinionOfConsultantForm: FormGroup;

  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;

  
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTechnicalOpinionOfConsultantDialog: any,
    @Optional() public dialogRef: MatDialogRef<TechnicalOpinionOfConsultantViewComponent>,
    public technicalOpinionOfConsultantService: TechnicalOpinionOfConsultantService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTechnicalOpinionOfConsultant = this.selectedTechnicalOpinionOfConsultantDialog.data || this.selectedTechnicalOpinionOfConsultant;

    
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


    this.technicalOpinionOfConsultantForm = this.formBuilder.group({
      
  buildingCode : [this.selectedTechnicalOpinionOfConsultant.buildingCode],
  schoolAddress : [this.selectedTechnicalOpinionOfConsultant.schoolAddress],
  previewDate : [this.selectedTechnicalOpinionOfConsultant.previewDate],
  startDate : [this.selectedTechnicalOpinionOfConsultant.startDate],
  endDate : [this.selectedTechnicalOpinionOfConsultant.endDate],
  statementType : [this.selectedTechnicalOpinionOfConsultant.statementType],
  text : [this.selectedTechnicalOpinionOfConsultant.text],
  sectionCenter : [this.selectedTechnicalOpinionOfConsultant.sectionCenter],
  village : [this.selectedTechnicalOpinionOfConsultant.village],
  educationalAdministration : [this.selectedTechnicalOpinionOfConsultant.educationalAdministration]
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
    return this.technicalOpinionOfConsultantForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.technicalOpinionOfConsultantForm.controls)) {
      this.technicalOpinionOfConsultantForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
  }
}

