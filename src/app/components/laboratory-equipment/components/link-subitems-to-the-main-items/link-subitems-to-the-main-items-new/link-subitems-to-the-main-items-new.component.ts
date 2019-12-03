
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LinkSubitemsToTheMainItems } from 'app/shared/models/link-subitems-to-the-main-items';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LinkSubitemsToTheMainItemsService } from '../shared/link-subitems-to-the-main-items.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-link-subitems-to-the-main-items-new',
  templateUrl: './link-subitems-to-the-main-items-new.component.html',
  styleUrls: ['./link-subitems-to-the-main-items-new.component.scss'],
  providers: [
    ]
})

export class LinkSubitemsToTheMainItemsNewComponent extends AppBaseComponent implements OnInit {
  linkSubitemsToTheMainItemsForm: FormGroup;
  @Input() selectedLinkSubitemsToTheMainItems: LinkSubitemsToTheMainItems;
  errorMessages: FormControlError[] = [
        
  ];

  private itemCodesService: LookupService;

  
mainIemNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('mainIemNumber', { static: true }) MainIemNumberSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<LinkSubitemsToTheMainItemsNewComponent>,
    public linkSubitemsToTheMainItemsService: LinkSubitemsToTheMainItemsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLinkSubitemsToTheMainItems = new LinkSubitemsToTheMainItems();

    
	this.mainIemNumberSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم البند الرئيسي',
	});


    this.linkSubitemsToTheMainItemsForm = this.formBuilder.group({
     
  id : [0],
  subItemNumber : [this.selectedLinkSubitemsToTheMainItems.subItemNumber, [ ]],
  mainIemNumber : [this.selectedLinkSubitemsToTheMainItems.mainIemNumber, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.linkSubitemsToTheMainItemsService.create(this.linkSubitemsToTheMainItemsForm.value)
        .pipe(switchMap(x => {
			return this.linkSubitemsToTheMainItemsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.linkSubitemsToTheMainItemsForm.get(name);
    }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
  }
 }
