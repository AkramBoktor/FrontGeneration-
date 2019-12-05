
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TypicalExternalBodyEquippedForSchools } from 'app/shared/models/typical-external-body-equipped-for-schools';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TypicalExternalBodyEquippedForSchoolsService } from '../shared/typical-external-body-equipped-for-schools.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-typical-external-body-equipped-for-schools-new',
  templateUrl: './typical-external-body-equipped-for-schools-new.component.html',
  styleUrls: ['./typical-external-body-equipped-for-schools-new.component.scss'],
  providers: [
    ]
})

export class TypicalExternalBodyEquippedForSchoolsNewComponent extends AppBaseComponent implements OnInit {
  typicalExternalBodyEquippedForSchoolsForm: FormGroup;
  @Input() selectedTypicalExternalBodyEquippedForSchools: TypicalExternalBodyEquippedForSchools;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TypicalExternalBodyEquippedForSchoolsNewComponent>,
    public typicalExternalBodyEquippedForSchoolsService: TypicalExternalBodyEquippedForSchoolsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalExternalBodyEquippedForSchools = new TypicalExternalBodyEquippedForSchools();

    

    this.typicalExternalBodyEquippedForSchoolsForm = this.formBuilder.group({
     
  id : [0],
  supplierName : [this.selectedTypicalExternalBodyEquippedForSchools.supplierName, [ ]],
  supplierCode : [this.selectedTypicalExternalBodyEquippedForSchools.supplierCode, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.typicalExternalBodyEquippedForSchoolsService.create(this.typicalExternalBodyEquippedForSchoolsForm.value)
        .pipe(switchMap(x => {
			return this.typicalExternalBodyEquippedForSchoolsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.typicalExternalBodyEquippedForSchoolsForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
