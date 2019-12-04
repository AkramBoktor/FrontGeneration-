
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranch } from 'app/shared/models/correction-data-spaces-of-the-educational-building-cairo-branch';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranchService } from '../shared/correction-data-spaces-of-the-educational-building-cairo-branch.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-correction-data-spaces-of-the-educational-building-cairo-branch-new',
  templateUrl: './correction-data-spaces-of-the-educational-building-cairo-branch-new.component.html',
  styleUrls: ['./correction-data-spaces-of-the-educational-building-cairo-branch-new.component.scss'],
  providers: [
    ]
})

export class CorrectionDataSpacesOfTheEducationalBuildingCairoBranchNewComponent extends AppBaseComponent implements OnInit {
  correctionDataSpacesOfTheEducationalBuildingCairoBranchForm: FormGroup;
  @Input() selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranch: CorrectionDataSpacesOfTheEducationalBuildingCairoBranch;
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
    @Optional() public dialogRef: MatDialogRef<CorrectionDataSpacesOfTheEducationalBuildingCairoBranchNewComponent>,
    public correctionDataSpacesOfTheEducationalBuildingCairoBranchService: CorrectionDataSpacesOfTheEducationalBuildingCairoBranchService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranch = new CorrectionDataSpacesOfTheEducationalBuildingCairoBranch();

    
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
     
  id : [0],
  governorate : [this.selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranch.governorate, [ Validators.required ]],
  department : [this.selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranch.department, [ Validators.required ]],
  stage : [this.selectedCorrectionDataSpacesOfTheEducationalBuildingCairoBranch.stage, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.correctionDataSpacesOfTheEducationalBuildingCairoBranchService.create(this.correctionDataSpacesOfTheEducationalBuildingCairoBranchForm.value)
        .pipe(switchMap(x => {
			return this.correctionDataSpacesOfTheEducationalBuildingCairoBranchService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
