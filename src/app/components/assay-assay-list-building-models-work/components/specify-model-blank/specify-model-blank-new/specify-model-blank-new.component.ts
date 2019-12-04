
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SpecifyModelBlank } from 'app/shared/models/specify-model-blank';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SpecifyModelBlankService } from '../shared/specify-model-blank.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-specify-model-blank-new',
  templateUrl: './specify-model-blank-new.component.html',
  styleUrls: ['./specify-model-blank-new.component.scss'],
  providers: [
    ]
})

export class SpecifyModelBlankNewComponent extends AppBaseComponent implements OnInit {
  specifyModelBlankForm: FormGroup;
  @Input() selectedSpecifyModelBlank: SpecifyModelBlank;
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
    @Optional() public dialogRef: MatDialogRef<SpecifyModelBlankNewComponent>,
    public specifyModelBlankService: SpecifyModelBlankService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSpecifyModelBlank = new SpecifyModelBlank();

    
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
     
  id : [0],
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
    this.specifyModelBlankService.create(this.specifyModelBlankForm.value)
        .pipe(switchMap(x => {
			return this.specifyModelBlankService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
