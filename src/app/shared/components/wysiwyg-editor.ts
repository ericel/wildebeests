import {Component, OnInit } from '@angular/core';

@Component ({
    selector: 'wysiwyg-simple',
    template: `<input type="text" name="password" formControlName="password">`,
    styles: [``]
})

export class WysiwygSimple implements OnInit {
    constructor(){
       
    }

    ngOnInit(){

    }
}