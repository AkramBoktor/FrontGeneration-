
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { IntroducingTaxCodeForTheGovernorate } from 'app/shared/models/introducing-tax-code-for-the-governorate';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { IntroducingTaxCodeForTheGovernorateService } from '../shared/introducing-tax-code-for-the-governorate.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-introducing-tax-code-for-the-governorate-edit',
  templateUrl: './introducing-tax-code-for-the-governorate-edit.component.html',
  styleUrls: ['./introducing-tax-code-for-the-governorate-edit.component.scss'],
  providers: []
})

export class IntroducingTaxCodeForTheGovernorateEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedIntroducingTaxCodeForTheGovernorate: IntroducingTaxCodeForTheGovernorate;
  introducingTaxCodeForTheGovernorateForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private governoratesService: LookupService;

  
governorateCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorateCode', { static: true }) GovernorateCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedIntroducingTaxCodeForTheGovernorateDialog: any,
    @Optional() public dialogRef: MatDialogRef<IntroducingTaxCodeForTheGovernorateEditComponent>,
    public introducingTaxCodeForTheGovernorateService: IntroducingTaxCodeForTheGovernorateService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIntroducingTaxCodeForTheGovernorate = new IntroducingTaxCodeForTheGovernorate();
    this.selectedIntroducingTaxCodeForTheGovernorate = this.selectedIntroducingTaxCodeForTheGovernorateDialog.data || this.selectedIntroducingTaxCodeForTheGovernorate;

    
	this.governorateCodeSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المحافظة',
	});


    this.introducingTaxCodeForTheGovernorateForm = this.formBuilder.group({
      
  id : [this.selectedIntroducingTaxCodeForTheGovernorate.id],
  mamoriaCode : [this.selectedIntroducingTaxCodeForTheGovernorate.mamoriaCode, [ Validators.required ]],
  mamoriaName : [this.selectedIntroducingTaxCodeForTheGovernorate.mamoriaName, [ Validators.required ]],
  governorateCode : [this.selectedIntroducingTaxCodeForTheGovernorate.governorateCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.introducingTaxCodeForTheGovernorateService.update(this.introducingTaxCodeForTheGovernorateForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.introducingTaxCodeForTheGovernorateService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.introducingTaxCodeForTheGovernorateForm.get(name);
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
  }
}
