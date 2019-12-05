
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { Accreditation } from 'app/shared/models/accreditation';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AccreditationService } from '../shared/accreditation.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-accreditation-new',
  templateUrl: './accreditation-new.component.html',
  styleUrls: ['./accreditation-new.component.scss'],
  providers: [
    ]
})

export class AccreditationNewComponent extends AppBaseComponent implements OnInit {
  accreditationForm: FormGroup;
  @Input() selectedAccreditation: Accreditation;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AccreditationNewComponent>,
    public accreditationService: AccreditationService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAccreditation = new Accreditation();

    

    this.accreditationForm = this.formBuilder.group({
     
  id : [0],
  accreditationCode : [this.selectedAccreditation.accreditationCode, [ Validators.required ]],
  accreditationName : [this.selectedAccreditation.accreditationName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.accreditationService.create(this.accreditationForm.value)
        .pipe(switchMap(x => {
			return this.accreditationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.accreditationForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
