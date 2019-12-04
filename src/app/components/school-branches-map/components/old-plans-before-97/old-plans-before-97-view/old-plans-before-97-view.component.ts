
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { OldPlansBefore97 } from 'app/shared/models/old-plans-before-97';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { OldPlansBefore97Service } from '../shared/old-plans-before-97.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-old-plans-before-97-view',
  templateUrl: './old-plans-before-97-view.component.html',
  styleUrls: ['./old-plans-before-97-view.component.scss'],
  providers: []
})

export class OldPlansBefore97ViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedOldPlansBefore97: OldPlansBefore97;
  oldPlansBefore97Form: FormGroup;

  private governoratesService: LookupService;
private constructionTypesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedOldPlansBefore97Dialog: any,
    @Optional() public dialogRef: MatDialogRef<OldPlansBefore97ViewComponent>,
    public oldPlansBefore97Service: OldPlansBefore97Service) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  school : [this.selectedOldPlansBefore97.school],
  extension : [this.selectedOldPlansBefore97.extension],
  primaryDeliveryDate : [this.selectedOldPlansBefore97.primaryDeliveryDate],
  pLanYear : [this.selectedOldPlansBefore97.pLanYear],
  governorate : [this.selectedOldPlansBefore97.governorate],
  constructionType : [this.selectedOldPlansBefore97.constructionType]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.oldPlansBefore97Form.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.oldPlansBefore97Form.controls)) {
      this.oldPlansBefore97Form.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}

