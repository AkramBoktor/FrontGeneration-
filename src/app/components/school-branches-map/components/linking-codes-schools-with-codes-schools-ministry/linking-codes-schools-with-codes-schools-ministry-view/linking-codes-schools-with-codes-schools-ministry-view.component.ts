
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { LinkingCodesSchoolsWithCodesSchoolsMinistry } from 'app/shared/models/linking-codes-schools-with-codes-schools-ministry';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { LinkingCodesSchoolsWithCodesSchoolsMinistryService } from '../shared/linking-codes-schools-with-codes-schools-ministry.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-linking-codes-schools-with-codes-schools-ministry-view',
  templateUrl: './linking-codes-schools-with-codes-schools-ministry-view.component.html',
  styleUrls: ['./linking-codes-schools-with-codes-schools-ministry-view.component.scss'],
  providers: []
})

export class LinkingCodesSchoolsWithCodesSchoolsMinistryViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLinkingCodesSchoolsWithCodesSchoolsMinistry: LinkingCodesSchoolsWithCodesSchoolsMinistry;
  linkingCodesSchoolsWithCodesSchoolsMinistryForm: FormGroup;

  private governoratesService: LookupService;
private centralDepartmentsService: LookupService;
private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private educationalLevelsService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
administrationSelectOptions: MaterialSelectOptions;
centerDepartmentSelectOptions: MaterialSelectOptions;
villageNeighborhoodSelectOptions: MaterialSelectOptions;
stageSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLinkingCodesSchoolsWithCodesSchoolsMinistryDialog: any,
    @Optional() public dialogRef: MatDialogRef<LinkingCodesSchoolsWithCodesSchoolsMinistryViewComponent>,
    public linkingCodesSchoolsWithCodesSchoolsMinistryService: LinkingCodesSchoolsWithCodesSchoolsMinistryService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry = this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistryDialog.data || this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.administrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة',
	});

	this.centerDepartmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مركز/قسم',
	});

	this.villageNeighborhoodSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'قرية/حي',
	});

	this.stageSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المرحلة',
	});


    this.linkingCodesSchoolsWithCodesSchoolsMinistryForm = this.formBuilder.group({
      
  authoritySchoolCode : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.authoritySchoolCode],
  schoolAddress : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.schoolAddress],
  periodsNumber : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.periodsNumber],
  periodName1 : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.periodName1],
  pupilsCount1 : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.pupilsCount1],
  periodName2 : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.periodName2],
  pupilsCount2 : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.pupilsCount2],
  hostedSchool : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.hostedSchool],
  hostedSchoolPupilsCount : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.hostedSchoolPupilsCount],
  ministrySchoolCode : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.ministrySchoolCode],
  governorate : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.governorate],
  administration : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.administration],
  centerDepartment : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.centerDepartment],
  villageNeighborhood : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.villageNeighborhood],
  stage : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.stage]
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
    return this.linkingCodesSchoolsWithCodesSchoolsMinistryForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.linkingCodesSchoolsWithCodesSchoolsMinistryForm.controls)) {
      this.linkingCodesSchoolsWithCodesSchoolsMinistryForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
  }
}

