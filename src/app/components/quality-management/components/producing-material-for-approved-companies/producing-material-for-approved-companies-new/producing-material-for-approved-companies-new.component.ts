
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ProducingMaterialForApprovedCompanies } from 'app/shared/models/producing-material-for-approved-companies';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ProducingMaterialForApprovedCompaniesService } from '../shared/producing-material-for-approved-companies.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-producing-material-for-approved-companies-new',
  templateUrl: './producing-material-for-approved-companies-new.component.html',
  styleUrls: ['./producing-material-for-approved-companies-new.component.scss'],
  providers: [
    ]
})

export class ProducingMaterialForApprovedCompaniesNewComponent extends AppBaseComponent implements OnInit {
  producingMaterialForApprovedCompaniesForm: FormGroup;
  @Input() selectedProducingMaterialForApprovedCompanies: ProducingMaterialForApprovedCompanies;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ProducingMaterialForApprovedCompaniesNewComponent>,
    public producingMaterialForApprovedCompaniesService: ProducingMaterialForApprovedCompaniesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedProducingMaterialForApprovedCompanies = new ProducingMaterialForApprovedCompanies();

    

    this.producingMaterialForApprovedCompaniesForm = this.formBuilder.group({
     
  id : [0],
  companyCode : [this.selectedProducingMaterialForApprovedCompanies.companyCode, [ Validators.required ]],
  mainMaterialCode : [this.selectedProducingMaterialForApprovedCompanies.mainMaterialCode, [ Validators.required ]],
  subMaterialCode : [this.selectedProducingMaterialForApprovedCompanies.subMaterialCode, [ Validators.required ]],
  subMaterialName : [this.selectedProducingMaterialForApprovedCompanies.subMaterialName, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.producingMaterialForApprovedCompaniesService.create(this.producingMaterialForApprovedCompaniesForm.value)
        .pipe(switchMap(x => {
			return this.producingMaterialForApprovedCompaniesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.producingMaterialForApprovedCompaniesForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
