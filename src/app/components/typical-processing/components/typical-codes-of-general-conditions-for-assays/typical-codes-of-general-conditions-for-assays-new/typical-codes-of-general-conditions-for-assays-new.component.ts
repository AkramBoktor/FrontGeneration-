
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TypicalCodesOfGeneralConditionsForAssays } from 'app/shared/models/typical-codes-of-general-conditions-for-assays';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TypicalCodesOfGeneralConditionsForAssaysService } from '../shared/typical-codes-of-general-conditions-for-assays.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-typical-codes-of-general-conditions-for-assays-new',
  templateUrl: './typical-codes-of-general-conditions-for-assays-new.component.html',
  styleUrls: ['./typical-codes-of-general-conditions-for-assays-new.component.scss'],
  providers: [
    ]
})

export class TypicalCodesOfGeneralConditionsForAssaysNewComponent extends AppBaseComponent implements OnInit {
  typicalCodesOfGeneralConditionsForAssaysForm: FormGroup;
  @Input() selectedTypicalCodesOfGeneralConditionsForAssays: TypicalCodesOfGeneralConditionsForAssays;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TypicalCodesOfGeneralConditionsForAssaysNewComponent>,
    public typicalCodesOfGeneralConditionsForAssaysService: TypicalCodesOfGeneralConditionsForAssaysService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalCodesOfGeneralConditionsForAssays = new TypicalCodesOfGeneralConditionsForAssays();

    

    this.typicalCodesOfGeneralConditionsForAssaysForm = this.formBuilder.group({
     
  id : [0],
  conditionCode : [this.selectedTypicalCodesOfGeneralConditionsForAssays.conditionCode, [ Validators.required ]],
  conditionName : [this.selectedTypicalCodesOfGeneralConditionsForAssays.conditionName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.typicalCodesOfGeneralConditionsForAssaysService.create(this.typicalCodesOfGeneralConditionsForAssaysForm.value)
        .pipe(switchMap(x => {
			return this.typicalCodesOfGeneralConditionsForAssaysService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.typicalCodesOfGeneralConditionsForAssaysForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
