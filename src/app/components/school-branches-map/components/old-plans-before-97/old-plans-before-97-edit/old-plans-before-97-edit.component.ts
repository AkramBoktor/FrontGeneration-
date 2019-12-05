
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { OldPlansBefore97 } from 'app/shared/models/old-plans-before-97';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { OldPlansBefore97Service } from '../shared/old-plans-before-97.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-old-plans-before-97-edit',
  templateUrl: './old-plans-before-97-edit.component.html',
  styleUrls: ['./old-plans-before-97-edit.component.scss'],
  providers: []
})

export class OldPlansBefore97EditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedOldPlansBefore97: OldPlansBefore97;
  oldPlansBefore97Form: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private governoratesService: LookupService;
private constructionTypesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedOldPlansBefore97Dialog: any,
    @Optional() public dialogRef: MatDialogRef<OldPlansBefore97EditComponent>,
    public oldPlansBefore97Service: OldPlansBefore97Service) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedOldPlansBefore97 = new OldPlansBefore97();
    this.selectedOldPlansBefore97 = this.selectedOldPlansBefore97Dialog.data || this.selectedOldPlansBefore97;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.oldPlansBefore97Form = this.formBuilder.group({
      
  id : [this.selectedOldPlansBefore97.id],
  school : [this.selectedOldPlansBefore97.school, [ Validators.required ]],
  extension : [this.selectedOldPlansBefore97.extension, [ Validators.required ]],
  primaryDeliveryDate : [this.selectedOldPlansBefore97.primaryDeliveryDate, [ Validators.required ]],
  pLanYear : [this.selectedOldPlansBefore97.pLanYear, [ Validators.required ]],
  governorate : [this.selectedOldPlansBefore97.governorate, [ Validators.required ]],
  constructionType : [this.selectedOldPlansBefore97.constructionType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.oldPlansBefore97Service.update(this.oldPlansBefore97Form.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.oldPlansBefore97Service.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.oldPlansBefore97Form.get(name);
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}
