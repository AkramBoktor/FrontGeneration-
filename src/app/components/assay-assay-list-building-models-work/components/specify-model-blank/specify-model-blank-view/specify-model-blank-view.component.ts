
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SpecifyModelBlank } from 'app/shared/models/specify-model-blank';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SpecifyModelBlankService } from '../shared/specify-model-blank.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-specify-model-blank-view',
  templateUrl: './specify-model-blank-view.component.html',
  styleUrls: ['./specify-model-blank-view.component.scss'],
  providers: []
})

export class SpecifyModelBlankViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSpecifyModelBlank: SpecifyModelBlank;
  specifyModelBlankForm: FormGroup;

  private formTypesService: LookupService;
private educationalLevelsService: LookupService;
private educationalSpacesService: LookupService;

  
modelTypeSelectOptions: MaterialSelectOptions;
educationalStageSelectOptions: MaterialSelectOptions;
spaceCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSpecifyModelBlankDialog: any,
    @Optional() public dialogRef: MatDialogRef<SpecifyModelBlankViewComponent>,
    public specifyModelBlankService: SpecifyModelBlankService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSpecifyModelBlank = this.selectedSpecifyModelBlankDialog.data || this.selectedSpecifyModelBlank;

    
	this.modelTypeSelectOptions = new MaterialSelectOptions({
	 data: this.formTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع النموذج',
	});

	this.educationalStageSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المرحلة التعليمية',
	});

	this.spaceCodeSelectOptions = new MaterialSelectOptions({
	 data: this.educationalSpacesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفراغ',
	});


    this.specifyModelBlankForm = this.formBuilder.group({
      
  modelCode : [this.selectedSpecifyModelBlank.modelCode],
  floorNumber : [this.selectedSpecifyModelBlank.floorNumber],
  count : [this.selectedSpecifyModelBlank.count],
  modelType : [this.selectedSpecifyModelBlank.modelType],
  educationalStage : [this.selectedSpecifyModelBlank.educationalStage],
  spaceCode : [this.selectedSpecifyModelBlank.spaceCode]
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
    return this.specifyModelBlankForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.specifyModelBlankForm.controls)) {
      this.specifyModelBlankForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.formTypesService = new LookupService('formtypes', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
this.educationalSpacesService = new LookupService('educationalspaces', this.http);
  }
}

