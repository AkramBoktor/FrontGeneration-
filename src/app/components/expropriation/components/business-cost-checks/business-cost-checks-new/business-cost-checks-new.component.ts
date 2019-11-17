
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BusinessCostChecks } from 'app/shared/models/business-cost-checks';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BusinessCostChecksService } from '../shared/business-cost-checks.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-business-cost-checks-new',
  templateUrl: './business-cost-checks-new.component.html',
  styleUrls: ['./business-cost-checks-new.component.scss'],
  providers: [
    ]
})

export class BusinessCostChecksNewComponent extends AppBaseComponent implements OnInit {
  businessCostChecksForm: FormGroup;
  @Input() selectedBusinessCostChecks: BusinessCostChecks;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<BusinessCostChecksNewComponent>,
    public businessCostChecksService: BusinessCostChecksService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBusinessCostChecks = new BusinessCostChecks();

    

    this.businessCostChecksForm = this.formBuilder.group({
     
  id : [0],
  schoolNumber : [this.selectedBusinessCostChecks.schoolNumber, [ Validators.required ]],
  checkNumber : [this.selectedBusinessCostChecks.checkNumber, [ Validators.required ]],
  checkDate : [this.selectedBusinessCostChecks.checkDate, [ Validators.required ]],
  checkValue : [this.selectedBusinessCostChecks.checkValue, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.businessCostChecksService.create(this.businessCostChecksForm.value)
        .pipe(switchMap(x => {
			return this.businessCostChecksService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.businessCostChecksForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
