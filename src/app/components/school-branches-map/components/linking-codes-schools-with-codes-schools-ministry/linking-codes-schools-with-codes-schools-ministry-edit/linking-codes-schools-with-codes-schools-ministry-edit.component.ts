
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LinkingCodesSchoolsWithCodesSchoolsMinistry } from 'app/shared/models/linking-codes-schools-with-codes-schools-ministry';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { LinkingCodesSchoolsWithCodesSchoolsMinistryService } from '../shared/linking-codes-schools-with-codes-schools-ministry.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-linking-codes-schools-with-codes-schools-ministry-edit',
  templateUrl: './linking-codes-schools-with-codes-schools-ministry-edit.component.html',
  styleUrls: ['./linking-codes-schools-with-codes-schools-ministry-edit.component.scss'],
  providers: []
})

export class LinkingCodesSchoolsWithCodesSchoolsMinistryEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLinkingCodesSchoolsWithCodesSchoolsMinistry: LinkingCodesSchoolsWithCodesSchoolsMinistry;
  linkingCodesSchoolsWithCodesSchoolsMinistryForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

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

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('administration', { static: true }) AdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('centerDepartment', { static: true }) CenterDepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('villageNeighborhood', { static: true }) VillageNeighborhoodSelectComponent: MaterialSelectComponent;
	@ViewChild('stage', { static: true }) StageSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLinkingCodesSchoolsWithCodesSchoolsMinistryDialog: any,
    @Optional() public dialogRef: MatDialogRef<LinkingCodesSchoolsWithCodesSchoolsMinistryEditComponent>,
    public linkingCodesSchoolsWithCodesSchoolsMinistryService: LinkingCodesSchoolsWithCodesSchoolsMinistryService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry = new LinkingCodesSchoolsWithCodesSchoolsMinistry();
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
      
  id : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.id],
  authoritySchoolCode : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.authoritySchoolCode, [ Validators.required ]],
  schoolAddress : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.schoolAddress, [ Validators.required ]],
  periodsNumber : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.periodsNumber, [ Validators.required ]],
  periodName1 : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.periodName1, [ Validators.required ]],
  pupilsCount1 : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.pupilsCount1, [ Validators.required ]],
  periodName2 : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.periodName2, [ Validators.required ]],
  pupilsCount2 : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.pupilsCount2, [ Validators.required ]],
  hostedSchool : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.hostedSchool, [ Validators.required ]],
  hostedSchoolPupilsCount : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.hostedSchoolPupilsCount, [ Validators.required ]],
  ministrySchoolCode : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.ministrySchoolCode, [ Validators.required ]],
  governorate : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.governorate, [ Validators.required ]],
  administration : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.administration, [ Validators.required ]],
  centerDepartment : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.centerDepartment, [ Validators.required ]],
  villageNeighborhood : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.villageNeighborhood, [ Validators.required ]],
  stage : [this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry.stage, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.linkingCodesSchoolsWithCodesSchoolsMinistryService.update(this.linkingCodesSchoolsWithCodesSchoolsMinistryForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.linkingCodesSchoolsWithCodesSchoolsMinistryService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.linkingCodesSchoolsWithCodesSchoolsMinistryForm.get(name);
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
  }
}
