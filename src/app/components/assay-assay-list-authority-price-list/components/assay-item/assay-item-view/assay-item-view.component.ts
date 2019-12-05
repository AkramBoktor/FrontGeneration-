
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AssayItem } from 'app/shared/models/assay-item';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AssayItemService } from '../shared/assay-item.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assay-item-view',
  templateUrl: './assay-item-view.component.html',
  styleUrls: ['./assay-item-view.component.scss'],
  providers: []
})

export class AssayItemViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssayItem: AssayItem;
  assayItemForm: FormGroup;

  private workTypesService: LookupService;
private modulesService: LookupService;

  
workTypeSelectOptions: MaterialSelectOptions;
unitCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssayItemDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssayItemViewComponent>,
    public assayItemService: AssayItemService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayItem = this.selectedAssayItemDialog.data || this.selectedAssayItem;

    
	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});

	this.unitCodeSelectOptions = new MaterialSelectOptions({
	 data: this.modulesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوحدة',
	});


    this.assayItemForm = this.formBuilder.group({
      
  activityType : [this.selectedAssayItem.activityType],
  subActivityType : [this.selectedAssayItem.subActivityType],
  itemCode : [this.selectedAssayItem.itemCode],
  arabicItemName : [this.selectedAssayItem.arabicItemName],
  englishItemName : [this.selectedAssayItem.englishItemName],
  workType : [this.selectedAssayItem.workType],
  unitCode : [this.selectedAssayItem.unitCode]
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
    return this.assayItemForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.assayItemForm.controls)) {
      this.assayItemForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.workTypesService = new LookupService('worktypes', this.http);
this.modulesService = new LookupService('modules', this.http);
  }
}

