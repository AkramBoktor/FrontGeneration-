
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RegisterANewCollectionCode } from 'app/shared/models/register-a-new-collection-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RegisterANewCollectionCodeService } from '../shared/register-a-new-collection-code.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-register-a-new-collection-code-new',
  templateUrl: './register-a-new-collection-code-new.component.html',
  styleUrls: ['./register-a-new-collection-code-new.component.scss'],
  providers: [
    ]
})

export class RegisterANewCollectionCodeNewComponent extends AppBaseComponent implements OnInit {
  registerANewCollectionCodeForm: FormGroup;
  @Input() selectedRegisterANewCollectionCode: RegisterANewCollectionCode;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RegisterANewCollectionCodeNewComponent>,
    public registerANewCollectionCodeService: RegisterANewCollectionCodeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegisterANewCollectionCode = new RegisterANewCollectionCode();

    

    this.registerANewCollectionCodeForm = this.formBuilder.group({
     
  id : [0],
  collectionCode : [this.selectedRegisterANewCollectionCode.collectionCode, [ Validators.required ]],
  collectionAmount : [this.selectedRegisterANewCollectionCode.collectionAmount, [ Validators.required ]],
  collectionName : [this.selectedRegisterANewCollectionCode.collectionName, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.registerANewCollectionCodeService.create(this.registerANewCollectionCodeForm.value)
        .pipe(switchMap(x => {
			return this.registerANewCollectionCodeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.registerANewCollectionCodeForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
