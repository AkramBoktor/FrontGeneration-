
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SpecifyModelBlank } from 'app/shared/models/specify-model-blank';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SpecifyModelBlankService } from '../shared/specify-model-blank.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-specify-model-blank-edit',
  templateUrl: './specify-model-blank-edit.component.html',
  styleUrls: ['./specify-model-blank-edit.component.scss'],
  providers: []
})

export class SpecifyModelBlankEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSpecifyModelBlank: SpecifyModelBlank;
  specifyModelBlankForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private formTypesService: LookupService;
private educationalLevelsService: LookupService;
private educationalSpacesService: LookupService;

  
modelTypeSelectOptions: MaterialSelectOptions;
educationalStageSelectOptions: MaterialSelectOptions;
spaceCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('modelType', { static: true }) ModelTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalStage', { static: true }) EducationalStageSelectComponent: MaterialSelectComponent;
	@ViewChild('spaceCode', { static: true }) SpaceCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSpecifyModelBlankDialog: any,
    @Optional() public dialogRef: MatDialogRef<SpecifyModelBlankEditComponent>,
    public specifyModelBlankService: SpecifyModelBlankService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSpecifyModelBlank = new SpecifyModelBlank();
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
      
  id : [this.selectedSpecifyModelBlank.id],
  modelCode : [this.selectedSpecifyModelBlank.modelCode, [ Validators.required ]],
  floorNumber : [this.selectedSpecifyModelBlank.floorNumber, [ Validators.required ]],
  count : [this.selectedSpecifyModelBlank.count, [ Validators.required ]],
  modelType : [this.selectedSpecifyModelBlank.modelType, [ Validators.required ]],
  educationalStage : [this.selectedSpecifyModelBlank.educationalStage, [ Validators.required ]],
  spaceCode : [this.selectedSpecifyModelBlank.spaceCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.specifyModelBlankService.update(this.specifyModelBlankForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.specifyModelBlankService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.specifyModelBlankForm.get(name);
  }

  initializeLookupServices() {
    this.formTypesService = new LookupService('formtypes', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
this.educationalSpacesService = new LookupService('educationalspaces', this.http);
  }
}
