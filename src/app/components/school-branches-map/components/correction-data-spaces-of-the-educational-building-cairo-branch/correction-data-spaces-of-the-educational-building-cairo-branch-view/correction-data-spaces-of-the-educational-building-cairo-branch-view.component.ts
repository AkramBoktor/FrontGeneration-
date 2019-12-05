
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranch } from 'app/shared/models/correction-data-spaces-of-the-educational-building-cairo-branch';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranchService } from '../shared/correction-data-spaces-of-the-educational-building-cairo-branch.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-correction-data-spaces-of-the-educational-building-cairo-branch-view',
  templateUrl: './correction-data-spaces-of-the-educational-building-cairo-branch-view.component.html',
  styleUrls: ['./correction-data-spaces-of-the-educational-building-cairo-branch-view.component.scss'],
  providers: []
})

export class CorrectionDataSpacesOfTheEducationalBuildingCairoBranchViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranch: CorrectionDataSpacesOfTheEducationalBuildingCairoBranch;
  correctionDataSpacesOfTheEducationalBuildingCairoBranchForm: FormGroup;

  private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;
private educationalLevelsService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;
stageSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranchDialog: any,
    @Optional() public dialogRef: MatDialogRef<CorrectionDataSpacesOfTheEducationalBuildingCairoBranchViewComponent>,
    public correctionDataSpacesOfTheEducationalBuildingCairoBranchService: CorrectionDataSpacesOfTheEducationalBuildingCairoBranchService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranch = this.selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranchDialog.data || this.selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranch;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه ',
	});

	this.departmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القسم',
	});

	this.stageSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المرحله',
	});


    this.correctionDataSpacesOfTheEducationalBuildingCairoBranchForm = this.formBuilder.group({
      
  governorate : [this.selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranch.governorate],
  department : [this.selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranch.department],
  stage : [this.selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranch.stage]
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
    return this.correctionDataSpacesOfTheEducationalBuildingCairoBranchForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.correctionDataSpacesOfTheEducationalBuildingCairoBranchForm.controls)) {
      this.correctionDataSpacesOfTheEducationalBuildingCairoBranchForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
  }
}

