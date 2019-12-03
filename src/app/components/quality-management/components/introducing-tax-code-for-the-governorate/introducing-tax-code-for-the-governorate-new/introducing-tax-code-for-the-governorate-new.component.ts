
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { IntroducingTaxCodeForTheGovernorate } from 'app/shared/models/introducing-tax-code-for-the-governorate';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { IntroducingTaxCodeForTheGovernorateService } from '../shared/introducing-tax-code-for-the-governorate.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-introducing-tax-code-for-the-governorate-new',
  templateUrl: './introducing-tax-code-for-the-governorate-new.component.html',
  styleUrls: ['./introducing-tax-code-for-the-governorate-new.component.scss'],
  providers: [
    ]
})

export class IntroducingTaxCodeForTheGovernorateNewComponent extends AppBaseComponent implements OnInit {
  introducingTaxCodeForTheGovernorateForm: FormGroup;
  @Input() selectedIntroducingTaxCodeForTheGovernorate: IntroducingTaxCodeForTheGovernorate;
  errorMessages: FormControlError[] = [
        
  ];

  private governoratesService: LookupService;

  
governorateCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorateCode', { static: true }) GovernorateCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<IntroducingTaxCodeForTheGovernorateNewComponent>,
    public introducingTaxCodeForTheGovernorateService: IntroducingTaxCodeForTheGovernorateService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIntroducingTaxCodeForTheGovernorate = new IntroducingTaxCodeForTheGovernorate();

    
	this.governorateCodeSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المحافظة',
	});


    this.introducingTaxCodeForTheGovernorateForm = this.formBuilder.group({
     
  id : [0],
  mamoriaCode : [this.selectedIntroducingTaxCodeForTheGovernorate.mamoriaCode, [ Validators.required ]],
  mamoriaName : [this.selectedIntroducingTaxCodeForTheGovernorate.mamoriaName, [ Validators.required ]],
  governorateCode : [this.selectedIntroducingTaxCodeForTheGovernorate.governorateCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.introducingTaxCodeForTheGovernorateService.create(this.introducingTaxCodeForTheGovernorateForm.value)
        .pipe(switchMap(x => {
			return this.introducingTaxCodeForTheGovernorateService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.introducingTaxCodeForTheGovernorateForm.get(name);
    }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
  }
 }
