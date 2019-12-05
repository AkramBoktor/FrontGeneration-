
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AssayItem } from 'app/shared/models/assay-item';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AssayItemService } from '../shared/assay-item.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assay-item-edit',
  templateUrl: './assay-item-edit.component.html',
  styleUrls: ['./assay-item-edit.component.scss'],
  providers: []
})

export class AssayItemEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssayItem: AssayItem;
  assayItemForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private workTypesService: LookupService;
private modulesService: LookupService;

  
workTypeSelectOptions: MaterialSelectOptions;
unitCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('unitCode', { static: true }) UnitCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssayItemDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssayItemEditComponent>,
    public assayItemService: AssayItemService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayItem = new AssayItem();
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
      
  id : [this.selectedAssayItem.id],
  activityType : [this.selectedAssayItem.activityType, [ Validators.required ]],
  subActivityType : [this.selectedAssayItem.subActivityType, [ Validators.required ]],
  itemCode : [this.selectedAssayItem.itemCode, [ Validators.required ]],
  arabicItemName : [this.selectedAssayItem.arabicItemName, [ Validators.required ]],
  englishItemName : [this.selectedAssayItem.englishItemName, [ Validators.required ]],
  workType : [this.selectedAssayItem.workType, [ Validators.required ]],
  unitCode : [this.selectedAssayItem.unitCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.assayItemService.update(this.assayItemForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.assayItemService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.assayItemForm.get(name);
  }

  initializeLookupServices() {
    this.workTypesService = new LookupService('worktypes', this.http);
this.modulesService = new LookupService('modules', this.http);
  }
}
