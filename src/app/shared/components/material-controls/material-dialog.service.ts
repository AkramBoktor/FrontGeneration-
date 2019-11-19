import { Injectable, EventEmitter, Type, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { Subject } from 'rxjs';


// Core service <<--
export interface BaseDialogInterface {
  confirm: EventEmitter<any>;
  close: EventEmitter<any>;
}

@Injectable()
export class MaterialDialogService {

  public onSave: Subject<any> = new Subject();
  public onClose: Subject<any> = new Subject();

  constructor(public dialog: MatDialog, private ngZone: NgZone) { }
  openDialog(dialogComponent: Type<any>, data: any, config?: MatDialogConfig): MatDialogRef<BaseDialogInterface, any> {
    let dialogRef: MatDialogRef<any, any>;
    this.ngZone.run(() => {
      dialogRef = this.dialog.open(dialogComponent, {
        panelClass: 'dialog-class',
        minWidth: '700px',
        data: { ...data },
        direction: 'rtl',
        ...config
      });
    });
    return dialogRef;
  }
}
