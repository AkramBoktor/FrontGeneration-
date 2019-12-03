
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LinkItemToTimeTable } from 'app/shared/models/link-item-to-time-table';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LinkItemToTimeTableService } from '../shared/link-item-to-time-table.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-link-item-to-time-table-new',
  templateUrl: './link-item-to-time-table-new.component.html',
  styleUrls: ['./link-item-to-time-table-new.component.scss'],
  providers: [
    ]
})

export class LinkItemToTimeTableNewComponent extends AppBaseComponent implements OnInit {
  linkItemToTimeTableForm: FormGroup;
  @Input() selectedLinkItemToTimeTable: LinkItemToTimeTable;
  errorMessages: FormControlError[] = [
        
  ];

  private itemCodesService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<LinkItemToTimeTableNewComponent>,
    public linkItemToTimeTableService: LinkItemToTimeTableService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLinkItemToTimeTable = new LinkItemToTimeTable();

    
	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.linkItemToTimeTableForm = this.formBuilder.group({
     
  id : [0],
  itemName : [this.selectedLinkItemToTimeTable.itemName, [ ]],
  activityCode : [this.selectedLinkItemToTimeTable.activityCode, [ Validators.required ]],
  activityName : [this.selectedLinkItemToTimeTable.activityName, [ ]],
  itemCode : [this.selectedLinkItemToTimeTable.itemCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.linkItemToTimeTableService.create(this.linkItemToTimeTableForm.value)
        .pipe(switchMap(x => {
			return this.linkItemToTimeTableService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.linkItemToTimeTableForm.get(name);
    }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
  }
 }
