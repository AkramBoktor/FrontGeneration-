
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BaseType } from 'app/shared/models/base-type';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BaseTypeService } from '../shared/base-type.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-base-type-new',
  templateUrl: './base-type-new.component.html',
  styleUrls: ['./base-type-new.component.scss'],
  providers: [
    ]
})

export class BaseTypeNewComponent extends AppBaseComponent implements OnInit {
  baseTypeForm: FormGroup;
  @Input() selectedBaseType: BaseType;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<BaseTypeNewComponent>,
    public baseTypeService: BaseTypeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBaseType = new BaseType();

    

    this.baseTypeForm = this.formBuilder.group({
     
  id : [0],
  code : [this.selectedBaseType.code, [ Validators.required ]],
  name : [this.selectedBaseType.name, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.baseTypeService.create(this.baseTypeForm.value)
        .pipe(switchMap(x => {
			return this.baseTypeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.baseTypeForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
