
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AnnualPlan2 } from 'app/shared/models/annual-plan-2';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AnnualPlan2Service } from '../shared/annual-plan-2.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-annual-plan-2-new',
  templateUrl: './annual-plan-2-new.component.html',
  styleUrls: ['./annual-plan-2-new.component.scss'],
  providers: [
    ]
})

export class AnnualPlan2NewComponent extends AppBaseComponent implements OnInit {
  annualPlan2Form: FormGroup;
  @Input() selectedAnnualPlan2: AnnualPlan2;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AnnualPlan2NewComponent>,
    public annualPlan2Service: AnnualPlan2Service)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAnnualPlan2 = new AnnualPlan2();

    

    this.annualPlan2Form = this.formBuilder.group({
     
  id : [0],
  fiveYearplanNumber : [this.selectedAnnualPlan2.fiveYearplanNumber, [ Validators.required ]],
  projectsNumber : [this.selectedAnnualPlan2.projectsNumber, [ Validators.required ]],
  pLanYear : [this.selectedAnnualPlan2.pLanYear, [ Validators.required ]],
  yearplanNumber : [this.selectedAnnualPlan2.yearplanNumber, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.annualPlan2Service.create(this.annualPlan2Form.value)
        .pipe(switchMap(x => {
			return this.annualPlan2Service.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.annualPlan2Form.get(name);
    }

  initializeLookupServices() {
    
  }
 }
