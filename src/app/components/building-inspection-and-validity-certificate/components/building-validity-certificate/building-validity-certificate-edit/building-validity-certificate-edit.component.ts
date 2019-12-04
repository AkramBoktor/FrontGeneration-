
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { BuildingValidityCertificate } from 'app/shared/models/building-validity-certificate';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { BuildingValidityCertificateService } from '../shared/building-validity-certificate.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-building-validity-certificate-edit',
  templateUrl: './building-validity-certificate-edit.component.html',
  styleUrls: ['./building-validity-certificate-edit.component.scss'],
  providers: []
})

export class BuildingValidityCertificateEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBuildingValidityCertificate: BuildingValidityCertificate;
  buildingValidityCertificateForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;
private validityPositionsService: LookupService;
private educationValiditiesService: LookupService;

  
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
validityPositionSelectOptions: MaterialSelectOptions;
educationValiditySelectOptions: MaterialSelectOptions;

  
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('validityPosition', { static: true }) ValidityPositionSelectComponent: MaterialSelectComponent;
	@ViewChild('educationValidity', { static: true }) EducationValiditySelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBuildingValidityCertificateDialog: any,
    @Optional() public dialogRef: MatDialogRef<BuildingValidityCertificateEditComponent>,
    public buildingValidityCertificateService: BuildingValidityCertificateService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBuildingValidityCertificate = new BuildingValidityCertificate();
    this.selectedBuildingValidityCertificate = this.selectedBuildingValidityCertificateDialog.data || this.selectedBuildingValidityCertificate;

    
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

	this.validityPositionSelectOptions = new MaterialSelectOptions({
	 data: this.validityPositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف الصلاحية',
	});

	this.educationValiditySelectOptions = new MaterialSelectOptions({
	 data: this.educationValiditiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صلاحية المدرسة للعملية التعليميه',
	});


    this.buildingValidityCertificateForm = this.formBuilder.group({
      
  id : [this.selectedBuildingValidityCertificate.id],
  buildingCode : [this.selectedBuildingValidityCertificate.buildingCode, [ Validators.required ]],
  schoolAddress : [this.selectedBuildingValidityCertificate.schoolAddress, [ ]],
  previewDate : [this.selectedBuildingValidityCertificate.previewDate, [ ]],
  startDate : [this.selectedBuildingValidityCertificate.startDate, [ ]],
  endDate : [this.selectedBuildingValidityCertificate.endDate, [ ]],
  statementType : [this.selectedBuildingValidityCertificate.statementType, [ Validators.required ]],
  text : [this.selectedBuildingValidityCertificate.text, [ Validators.required ]],
  sectionCenter : [this.selectedBuildingValidityCertificate.sectionCenter, [ Validators.required ]],
  village : [this.selectedBuildingValidityCertificate.village, [ Validators.required ]],
  educationalAdministration : [this.selectedBuildingValidityCertificate.educationalAdministration, [ Validators.required ]],
  validityPosition : [this.selectedBuildingValidityCertificate.validityPosition, [ Validators.required ]],
  educationValidity : [this.selectedBuildingValidityCertificate.educationValidity, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.buildingValidityCertificateService.update(this.buildingValidityCertificateForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.buildingValidityCertificateService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.buildingValidityCertificateForm.get(name);
  }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
this.validityPositionsService = new LookupService('validitypositions', this.http);
this.educationValiditiesService = new LookupService('educationvalidities', this.http);
  }
}
