
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { MaterialType } from 'app/shared/models/material-type';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MaterialTypeService } from '../shared/material-type.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-material-type-new',
  templateUrl: './material-type-new.component.html',
  styleUrls: ['./material-type-new.component.scss'],
  providers: [
    ]
})

export class MaterialTypeNewComponent extends AppBaseComponent implements OnInit {
  materialTypeForm: FormGroup;
  @Input() selectedMaterialType: MaterialType;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<MaterialTypeNewComponent>,
    public materialTypeService: MaterialTypeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMaterialType = new MaterialType();

    

    this.materialTypeForm = this.formBuilder.group({
     
  id : [0],
  code : [this.selectedMaterialType.code, [ Validators.required ]],
  name : [this.selectedMaterialType.name, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.materialTypeService.create(this.materialTypeForm.value)
        .pipe(switchMap(x => {
			return this.materialTypeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.materialTypeForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
