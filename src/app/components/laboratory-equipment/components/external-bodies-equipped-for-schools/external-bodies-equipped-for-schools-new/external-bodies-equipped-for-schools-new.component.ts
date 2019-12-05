
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ExternalBodiesEquippedForSchools } from 'app/shared/models/external-bodies-equipped-for-schools';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExternalBodiesEquippedForSchoolsService } from '../shared/external-bodies-equipped-for-schools.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-external-bodies-equipped-for-schools-new',
  templateUrl: './external-bodies-equipped-for-schools-new.component.html',
  styleUrls: ['./external-bodies-equipped-for-schools-new.component.scss'],
  providers: [
    ]
})

export class ExternalBodiesEquippedForSchoolsNewComponent extends AppBaseComponent implements OnInit {
  externalBodiesEquippedForSchoolsForm: FormGroup;
  @Input() selectedExternalBodiesEquippedForSchools: ExternalBodiesEquippedForSchools;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ExternalBodiesEquippedForSchoolsNewComponent>,
    public externalBodiesEquippedForSchoolsService: ExternalBodiesEquippedForSchoolsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExternalBodiesEquippedForSchools = new ExternalBodiesEquippedForSchools();

    

    this.externalBodiesEquippedForSchoolsForm = this.formBuilder.group({
     
  id : [0],
  supplierCode : [this.selectedExternalBodiesEquippedForSchools.supplierCode, [ ]],
  supplierName : [this.selectedExternalBodiesEquippedForSchools.supplierName, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.externalBodiesEquippedForSchoolsService.create(this.externalBodiesEquippedForSchoolsForm.value)
        .pipe(switchMap(x => {
			return this.externalBodiesEquippedForSchoolsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.externalBodiesEquippedForSchoolsForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
