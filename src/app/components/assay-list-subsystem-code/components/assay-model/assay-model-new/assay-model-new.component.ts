
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AssayModel } from 'app/shared/models/assay-model';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssayModelService } from '../shared/assay-model.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assay-model-new',
  templateUrl: './assay-model-new.component.html',
  styleUrls: ['./assay-model-new.component.scss'],
  providers: [
    ]
})

export class AssayModelNewComponent extends AppBaseComponent implements OnInit {
  assayModelForm: FormGroup;
  @Input() selectedAssayModel: AssayModel;
  errorMessages: FormControlError[] = [
        
  ];

  private formTypesService: LookupService;

  
modelTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('modelType', { static: true }) ModelTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AssayModelNewComponent>,
    public assayModelService: AssayModelService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayModel = new AssayModel();

    
	this.modelTypeSelectOptions = new MaterialSelectOptions({
	 data: this.formTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع النموذج',
	});


    this.assayModelForm = this.formBuilder.group({
     
  id : [0],
  code : [this.selectedAssayModel.code, [ Validators.required ]],
  name : [this.selectedAssayModel.name, [ Validators.required ]],
  modelType : [this.selectedAssayModel.modelType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.assayModelService.create(this.assayModelForm.value)
        .pipe(switchMap(x => {
			return this.assayModelService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.assayModelForm.get(name);
    }

  initializeLookupServices() {
    this.formTypesService = new LookupService('formtypes', this.http);
  }
 }
