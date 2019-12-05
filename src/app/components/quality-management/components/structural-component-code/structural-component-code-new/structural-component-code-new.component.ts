
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { StructuralComponentCode } from 'app/shared/models/structural-component-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { StructuralComponentCodeService } from '../shared/structural-component-code.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-structural-component-code-new',
  templateUrl: './structural-component-code-new.component.html',
  styleUrls: ['./structural-component-code-new.component.scss'],
  providers: [
    ]
})

export class StructuralComponentCodeNewComponent extends AppBaseComponent implements OnInit {
  structuralComponentCodeForm: FormGroup;
  @Input() selectedStructuralComponentCode: StructuralComponentCode;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<StructuralComponentCodeNewComponent>,
    public structuralComponentCodeService: StructuralComponentCodeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedStructuralComponentCode = new StructuralComponentCode();

    

    this.structuralComponentCodeForm = this.formBuilder.group({
     
  id : [0],
  elementCode : [this.selectedStructuralComponentCode.elementCode, [ Validators.required ]],
  structuralElementName : [this.selectedStructuralComponentCode.structuralElementName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.structuralComponentCodeService.create(this.structuralComponentCodeForm.value)
        .pipe(switchMap(x => {
			return this.structuralComponentCodeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.structuralComponentCodeForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
