
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BuildingValidityCertificate } from 'app/shared/models/building-validity-certificate';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { BuildingValidityCertificateService } from '../shared/building-validity-certificate.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-building-validity-certificate-view',
  templateUrl: './building-validity-certificate-view.component.html',
  styleUrls: ['./building-validity-certificate-view.component.scss'],
  providers: []
})

export class BuildingValidityCertificateViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBuildingValidityCertificate: BuildingValidityCertificate;
  buildingValidityCertificateForm: FormGroup;

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

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBuildingValidityCertificateDialog: any,
    @Optional() public dialogRef: MatDialogRef<BuildingValidityCertificateViewComponent>,
    public buildingValidityCertificateService: BuildingValidityCertificateService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  buildingCode : [this.selectedBuildingValidityCertificate.buildingCode],
  schoolAddress : [this.selectedBuildingValidityCertificate.schoolAddress],
  previewDate : [this.selectedBuildingValidityCertificate.previewDate],
  startDate : [this.selectedBuildingValidityCertificate.startDate],
  endDate : [this.selectedBuildingValidityCertificate.endDate],
  statementType : [this.selectedBuildingValidityCertificate.statementType],
  text : [this.selectedBuildingValidityCertificate.text],
  sectionCenter : [this.selectedBuildingValidityCertificate.sectionCenter],
  village : [this.selectedBuildingValidityCertificate.village],
  educationalAdministration : [this.selectedBuildingValidityCertificate.educationalAdministration],
  validityPosition : [this.selectedBuildingValidityCertificate.validityPosition],
  educationValidity : [this.selectedBuildingValidityCertificate.educationValidity]
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
    return this.buildingValidityCertificateForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.buildingValidityCertificateForm.controls)) {
      this.buildingValidityCertificateForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
this.validityPositionsService = new LookupService('validitypositions', this.http);
this.educationValiditiesService = new LookupService('educationvalidities', this.http);
  }
}

