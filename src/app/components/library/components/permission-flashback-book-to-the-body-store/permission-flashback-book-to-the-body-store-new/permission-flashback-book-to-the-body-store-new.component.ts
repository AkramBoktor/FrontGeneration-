
import { Component, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PermissionFlashbackBookToTheBodyStore } from 'app/shared/models/permission-flashback-book-to-the-body-store';
import { switchMap } from 'rxjs/operators';
import { PermissionFlashbackBookToTheBodyStoreService } from '../shared/permission-flashback-book-to-the-body-store.service';


@Component({
  selector: 'app-permission-flashback-book-to-the-body-store-new',
  templateUrl: './permission-flashback-book-to-the-body-store-new.component.html',
  styleUrls: ['./permission-flashback-book-to-the-body-store-new.component.scss'],
  providers: [
    ]
})

export class PermissionFlashbackBookToTheBodyStoreNewComponent extends AppBaseComponent implements OnInit {
  permissionFlashbackBookToTheBodyStoreForm: FormGroup;
  @Input() selectedPermissionFlashbackBookToTheBodyStore: PermissionFlashbackBookToTheBodyStore;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PermissionFlashbackBookToTheBodyStoreNewComponent>,
    public permissionFlashbackBookToTheBodyStoreService: PermissionFlashbackBookToTheBodyStoreService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPermissionFlashbackBookToTheBodyStore = new PermissionFlashbackBookToTheBodyStore();

    

    this.permissionFlashbackBookToTheBodyStoreForm = this.formBuilder.group({
     
  id : [0],
  bookNumber : [this.selectedPermissionFlashbackBookToTheBodyStore.bookNumber, [ Validators.required ]],
  bookNumberBranch : [this.selectedPermissionFlashbackBookToTheBodyStore.bookNumberBranch, [ Validators.required ]],
  returnAuthorizationDate : [this.selectedPermissionFlashbackBookToTheBodyStore.returnAuthorizationDate, [ Validators.required ]],
  outgoingLibraryRecipient : [this.selectedPermissionFlashbackBookToTheBodyStore.outgoingLibraryRecipient, [ Validators.required ]],
  employeeCode : [this.selectedPermissionFlashbackBookToTheBodyStore.employeeCode, [ Validators.required ]],
  extensionNumber : [this.selectedPermissionFlashbackBookToTheBodyStore.extensionNumber, [ ]],
  generalNumber : [this.selectedPermissionFlashbackBookToTheBodyStore.generalNumber, [ ]],
  bookTitle : [this.selectedPermissionFlashbackBookToTheBodyStore.bookTitle, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.permissionFlashbackBookToTheBodyStoreService.create(this.permissionFlashbackBookToTheBodyStoreForm.value)
        .pipe(switchMap(x => {
			return this.permissionFlashbackBookToTheBodyStoreService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.permissionFlashbackBookToTheBodyStoreForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
