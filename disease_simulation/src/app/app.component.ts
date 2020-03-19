import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('table', {static: false}) table: ElementRef;
  tableSize = new Array(5);
  susceptable = true;
  infected = false;
  center = Math.round((this.tableSize.length - 1) / 2);
  dayOfDisease = 0;

  infect() {
    if (this.dayOfDisease === 0) {
      this.makeInfected(this.table.nativeElement.children.item(this.center), this.center);
    } else {

      if (this.table.nativeElement.children.item(this.center)) {
        this.setCellsOfRowInfected(this.table.nativeElement.children.item(this.center), 0);
      }

      for (let i = this.dayOfDisease; i > 0; i--) {
        if (this.table.nativeElement.children.item(this.center + i)) {
          this.setCellsOfRowInfected(this.table.nativeElement.children.item(this.center + i), i);
        }

        if (this.table.nativeElement.children.item(this.center - i)) {
          this.setCellsOfRowInfected(this.table.nativeElement.children.item(this.center - i), i);
        }

      }
    }

   this.dayOfDisease++;
  }

  setCellsOfRowInfected(row: HTMLDivElement, offset ) {
    // -/+ dayofDesias - 1
    this.makeInfected(row, this.center - this.dayOfDisease + offset); //слева
    this.makeInfected(row, this.center + this.dayOfDisease - offset); //справа
  }


  makeInfected(who: HTMLDivElement, where: number): void {
    if (who.children.item(where)) {
      who.children.item(where).className = "table_cell infected";
    }
  }

}
