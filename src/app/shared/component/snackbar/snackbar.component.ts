import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackbar: MatSnackBar
) { }

ngOnInit() {}

get getIcon():string {
    switch (this.data.snackType) {
        case 'Done':
            return 'done';
        case 'Warning':
            return 'Warning';
        default:
          return '';
    }
}

closeSnackbar() {
    this.snackbar.dismiss();
}

}
