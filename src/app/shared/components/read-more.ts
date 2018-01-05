import { Component, Input, ElementRef, OnChanges,HostListener} from '@angular/core';
import { Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { SafeHtml } from '@angular/platform-browser';


@Component({    
    selector: 'read-more',
    template: `
        <div [innerHTML]="currentText" >
        </div>
        <a mat-button *ngIf="showToggleBtn" [class.hidden]="hideToggle" (click)="toggleView()"  >Read {{isCollapsed? 'more':'less'}}</a>
    `
})

export class ReadMoreComponent implements OnChanges {
    @Input() text: string;
    @Input() maxLength: number = 100;
    currentText: SafeHtml;
    hideToggle: boolean = true;
    content;
    showToggleBtn: boolean = true;
    public isCollapsed: boolean = true;
    
    constructor(private elementRef: ElementRef, private sanitizer: DomSanitizer) {

    }
    toggleView() {
        this.isCollapsed = !this.isCollapsed;
        this.determineView();
    }
   
    determineView() {
        if (this.text.length <= this.maxLength) {
            this.currentText = this.sanitizer.bypassSecurityTrustHtml(this.text);;
            this.isCollapsed = false;
            this.hideToggle = true;
            return;
        }
        this.hideToggle = false;
        if (this.isCollapsed == true) {
            this.currentText = this.sanitizer.bypassSecurityTrustHtml(this.text.substring(0, this.maxLength)+ "...");
        } else if(this.isCollapsed == false)  {
            this.currentText = this.sanitizer.bypassSecurityTrustHtml(this.text);;
        }

    }
    ngOnChanges() {
        this.determineView();
        if(this.text.length <= this.maxLength){
            this.showToggleBtn =false;
        }       
    }
    private wasInside = false;

    @HostListener('click')
    clickInside() {
        this.wasInside = true;
        this.toggleView() 
   }

   @HostListener('document:click')
   clickout() {
      if (!this.wasInside) {
        if (this.isCollapsed == false) {
            this.hideToggle = false;
            this.currentText = this.sanitizer.bypassSecurityTrustHtml(this.text.substring(0, this.maxLength)+ "...");
            
        }
      }
      this.wasInside = false;
   }

   
}