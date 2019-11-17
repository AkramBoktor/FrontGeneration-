
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { CodesOfReasonForTermination } from 'app/shared/models/codes-of-reason-for-termination';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CodesOfReasonForTerminationService } from '../shared/codes-of-reason-for-termination.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-codes-of-reason-for-termination-new',
  templateUrl: './codes-of-reason-for-termination-new.component.html',
  styleUrls: ['./codes-of-reason-for-termination-new.component.scss'],
  providers: [
    ]
})

export class CodesOfReasonForTerminationNewComponent extends AppBaseComponent implements OnInit {
  codesOfReasonForTerminationForm: FormGroup;
  @Input() selectedCodesOfReasonForTermination: CodesOfReasonForTermination;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<CodesOfReasonForTerminationNewComponent>,
    public codesOfReasonForTerminationService: CodesOfReasonForTerminationService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCodesOfReasonForTermination = new CodesOfReasonForTermination();

    

    this.codesOfReasonForTerminationForm = this.formBuilder.group({
     
  id : [0],
  code : [this.selectedCodesOfReasonForTermination.code, [ Validators.required ]],
  name : [this.selectedCodesOfReasonForTermination.name, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.codesOfReasonForTerminationService.create(this.codesOfReasonForTerminationForm.value)
        .pipe(switchMap(x => {
			return this.codesOfReasonForTerminationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.codesOfReasonForTerminationForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
