
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranch } from 'app/shared/models/correction-data-spaces-of-the-educational-building-cairo-branch';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranchService } from '../shared/correction-data-spaces-of-the-educational-building-cairo-branch.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-correction-data-spaces-of-the-educational-building-cairo-branch-edit',
  templateUrl: './correction-data-spaces-of-the-educational-building-cairo-branch-edit.component.html',
  styleUrls: ['./correction-data-spaces-of-the-educational-building-cairo-branch-edit.component.scss'],
  providers: []
})

export class CorrectionDataSpacesOfTheEducationalBuildingCairoBranchEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranch: CorrectionDataSpacesOfTheEducationalBuildingCairoBranch;
  correctionDataSpacesOfTheEducationalBuildingCairoBranchForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;
private educationalLevelsService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;
stageSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('stage', { static: true }) StageSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranchDialog: any,
    @Optional() public dialogRef: MatDialogRef<CorrectionDataSpacesOfTheEducationalBuildingCairoBranchEditComponent>,
    public correctionDataSpacesOfTheEducationalBuildingCairoBranchService: CorrectionDataSpacesOfTheEducationalBuildingCairoBranchService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranch = new CorrectionDataSpacesOfTheEducationalBuildingCairoBranch();
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
      
  id : [this.selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranch.id],
  governorate : [this.selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranch.governorate, [ Validators.required ]],
  department : [this.selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranch.department, [ Validators.required ]],
  stage : [this.selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranch.stage, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.correctionDataSpacesOfTheEducationalBuildingCairoBranchService.update(this.correctionDataSpacesOfTheEducationalBuildingCairoBranchForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.correctionDataSpacesOfTheEducationalBuildingCairoBranchService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.correctionDataSpacesOfTheEducationalBuildingCairoBranchForm.get(name);
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
  }
}
