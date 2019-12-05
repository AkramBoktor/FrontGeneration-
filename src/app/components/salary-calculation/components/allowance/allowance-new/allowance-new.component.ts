
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { Allowance } from 'app/shared/models/allowance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AllowanceService } from '../shared/allowance.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-allowance-new',
  templateUrl: './allowance-new.component.html',
  styleUrls: ['./allowance-new.component.scss'],
  providers: [
    ]
})

export class AllowanceNewComponent extends AppBaseComponent implements OnInit {
  allowanceForm: FormGroup;
  @Input() selectedAllowance: Allowance;
  errorMessages: FormControlError[] = [
        
  ];

  private allowancesTypesService: LookupService;

  
allowancesTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('allowancesType', { static: true }) AllowancesTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AllowanceNewComponent>,
    public allowanceService: AllowanceService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAllowance = new Allowance();

    
	this.allowancesTypeSelectOptions = new MaterialSelectOptions({
	 data: this.allowancesTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع البدل',
	});


    this.allowanceForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedAllowance.employeeCode, [ Validators.required ]],
  allowancesAmount : [this.selectedAllowance.allowancesAmount, [ Validators.required ]],
  allowancesType : [this.selectedAllowance.allowancesType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.allowanceService.create(this.allowanceForm.value)
        .pipe(switchMap(x => {
			return this.allowanceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.allowanceForm.get(name);
    }

  initializeLookupServices() {
    this.allowancesTypesService = new LookupService('allowancestypes', this.http);
  }
 }
