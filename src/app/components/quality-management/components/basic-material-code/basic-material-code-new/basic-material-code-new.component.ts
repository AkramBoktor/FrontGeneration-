
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BasicMaterialCode } from 'app/shared/models/basic-material-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BasicMaterialCodeService } from '../shared/basic-material-code.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-basic-material-code-new',
  templateUrl: './basic-material-code-new.component.html',
  styleUrls: ['./basic-material-code-new.component.scss'],
  providers: [
    ]
})

export class BasicMaterialCodeNewComponent extends AppBaseComponent implements OnInit {
  basicMaterialCodeForm: FormGroup;
  @Input() selectedBasicMaterialCode: BasicMaterialCode;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<BasicMaterialCodeNewComponent>,
    public basicMaterialCodeService: BasicMaterialCodeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBasicMaterialCode = new BasicMaterialCode();

    

    this.basicMaterialCodeForm = this.formBuilder.group({
     
  id : [0],
  basicMaterialCode : [this.selectedBasicMaterialCode.basicMaterialCode, [ Validators.required ]],
  basicMaterialName : [this.selectedBasicMaterialCode.basicMaterialName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.basicMaterialCodeService.create(this.basicMaterialCodeForm.value)
        .pipe(switchMap(x => {
			return this.basicMaterialCodeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.basicMaterialCodeForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
