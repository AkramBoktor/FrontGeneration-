
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { Supply } from 'app/shared/models/supply';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SupplyService } from '../shared/supply.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-supply-new',
  templateUrl: './supply-new.component.html',
  styleUrls: ['./supply-new.component.scss'],
  providers: [
    ]
})

export class SupplyNewComponent extends AppBaseComponent implements OnInit {
  supplyForm: FormGroup;
  @Input() selectedSupply: Supply;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SupplyNewComponent>,
    public supplyService: SupplyService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSupply = new Supply();

    

    this.supplyForm = this.formBuilder.group({
     
  id : [0],
  valueNumber : [this.selectedSupply.valueNumber, [ Validators.required ]],
  valueDate : [this.selectedSupply.valueDate, [ Validators.required ]],
  valueAmount : [this.selectedSupply.valueAmount, [ Validators.required ]],
  from : [this.selectedSupply.from, [ Validators.required ]],
  to : [this.selectedSupply.to, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.supplyService.create(this.supplyForm.value)
        .pipe(switchMap(x => {
			return this.supplyService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.supplyForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
