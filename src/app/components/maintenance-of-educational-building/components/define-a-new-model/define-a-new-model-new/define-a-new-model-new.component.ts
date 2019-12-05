
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DefineANewModel } from 'app/shared/models/define-a-new-model';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DefineANewModelService } from '../shared/define-a-new-model.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-define-a-new-model-new',
  templateUrl: './define-a-new-model-new.component.html',
  styleUrls: ['./define-a-new-model-new.component.scss'],
  providers: [
    ]
})

export class DefineANewModelNewComponent extends AppBaseComponent implements OnInit {
  defineANewModelForm: FormGroup;
  @Input() selectedDefineANewModel: DefineANewModel;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DefineANewModelNewComponent>,
    public defineANewModelService: DefineANewModelService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDefineANewModel = new DefineANewModel();

    

    this.defineANewModelForm = this.formBuilder.group({
     
  id : [0],
  modelCode : [this.selectedDefineANewModel.modelCode, [ Validators.required ]],
  modelName : [this.selectedDefineANewModel.modelName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.defineANewModelService.create(this.defineANewModelForm.value)
        .pipe(switchMap(x => {
			return this.defineANewModelService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.defineANewModelForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
