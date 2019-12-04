
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { NumberToCreateID } from 'app/shared/models/number-to-create-id';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { NumberToCreateIDService } from '../shared/number-to-create-id.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-number-to-create-id-new',
  templateUrl: './number-to-create-id-new.component.html',
  styleUrls: ['./number-to-create-id-new.component.scss'],
  providers: [
    ]
})

export class NumberToCreateIDNewComponent extends AppBaseComponent implements OnInit {
  numberToCreateIDForm: FormGroup;
  @Input() selectedNumberToCreateID: NumberToCreateID;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<NumberToCreateIDNewComponent>,
    public numberToCreateIDService: NumberToCreateIDService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNumberToCreateID = new NumberToCreateID();

    

    this.numberToCreateIDForm = this.formBuilder.group({
     
  id : [0],
  number : [this.selectedNumberToCreateID.number, [ Validators.required ]],
  checkDigit : [this.selectedNumberToCreateID.checkDigit, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.numberToCreateIDService.create(this.numberToCreateIDForm.value)
        .pipe(switchMap(x => {
			return this.numberToCreateIDService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.numberToCreateIDForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
