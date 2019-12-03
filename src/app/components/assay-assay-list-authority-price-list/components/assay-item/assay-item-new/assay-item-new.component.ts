
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AssayItem } from 'app/shared/models/assay-item';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssayItemService } from '../shared/assay-item.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assay-item-new',
  templateUrl: './assay-item-new.component.html',
  styleUrls: ['./assay-item-new.component.scss'],
  providers: [
    ]
})

export class AssayItemNewComponent extends AppBaseComponent implements OnInit {
  assayItemForm: FormGroup;
  @Input() selectedAssayItem: AssayItem;
  errorMessages: FormControlError[] = [
        
  ];

  private workTypesService: LookupService;
private modulesService: LookupService;

  
workTypeSelectOptions: MaterialSelectOptions;
unitCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('unitCode', { static: true }) UnitCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AssayItemNewComponent>,
    public assayItemService: AssayItemService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayItem = new AssayItem();

    
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
     
  id : [0],
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
    this.assayItemService.create(this.assayItemForm.value)
        .pipe(switchMap(x => {
			return this.assayItemService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.assayItemForm.get(name);
    }

  initializeLookupServices() {
    this.workTypesService = new LookupService('worktypes', this.http);
this.modulesService = new LookupService('modules', this.http);
  }
 }
