import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, AfterContentInit, Renderer } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as actions from '../../state/blogs.actions';
import * as fromBlog from '../../state/blogs.reducer';
import * as moment from 'moment';
import { AuthService } from '../../../../../shared/core/auth/authservice/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
@Component({
  selector: 'app-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.css']
})
export class WysiwygComponent implements OnInit, AfterViewInit, AfterContentInit {
  editorForm:  FormGroup;
  blogs: Observable<any>;
  blogID: string = '';
  blogTitle: string = 'Your Blog Needs A Title!';
  blogSection: string = 'Choose A Blog Section!';
  @ViewChild('richtextarea') richtextarea: ElementRef;
  @ViewChild('textAreas') textAreas: ElementRef;


  innerTxt = '<img src="https://s.yimg.com/ny/api/res/1.2/WWc5YlcsNY1UA5Od0FCSwg--/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9NjE4O2g9NDEy/http://media.zenfs.com/en_US/News/TheWrap/Dustin_Hoffman_Accused_of_Sexual-dad38cb83c956ae428e897211327b22b"><b><font size="7">kkkkkkkkkkkkkkkkk</font>kkk</b><img src="https://s.yimg.com/ny/api/res/1.2/WWc5YlcsNY1UA5Od0FCSwg--/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9NjE4O2g9NDEy/http://media.zenfs.com/en_US/News/TheWrap/Dustin_Hoffman_Accused_of_Sexual-dad38cb83c956ae428e897211327b22b"><b>yyyyyy</b>';
  constructor( public elementRef: ElementRef, public user:AuthService, private _renderer: Renderer,
    public fb: FormBuilder,
    private store: Store<fromBlog.State>) {
    
   }

  ngOnInit() {
    this.blogs = this.store.select(fromBlog.selectAll);
    this.store.dispatch(  new actions.Query() )
     // First Step
     this.editorForm = this.fb.group({
      'section': ['', [
        Validators.required
        ]
      ],
      'title': ['', Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(150)])
      ],
      'textArea': ['', Validators.compose([Validators.required, Validators.minLength(30)])]
    });
   
    this.richtextarea.nativeElement.contentDocument.body.innerHTML = "<h1>Hello! Wildebeests. :)  Start your Blog now!</h1>";
   
  }
 
  get title() { return this.editorForm.get('title') }
  get section() { return this.editorForm.get('section') }
  get textarea() { 
    var Body = this.richtextarea.nativeElement.contentDocument.body;
    Body = Body.innerHTML
    return Body;
}
  ngAfterViewInit(){
    this.iFrameOn();
    this.editorForm.valueChanges
    .debounceTime(1000)
    .subscribe(data => {
     if((this.title.value).length >30 && (this.section.value).length > 2){
       this.blogTitle = this.title.value;
       this.blogSection = this.section.value;
        if(this.blogID.length < 2)this.blogID = new Date().getUTCMilliseconds().toString();
        this.createBlog();
     }
    })
  }
  
  ngAfterContentInit(){
  }
  supplyTextArea(){
    if(this.textarea.length > 70){
      if(this.blogID.length < 2){
        this.blogID = new Date().getUTCMilliseconds().toString();
        this.createBlog()
      };
      this.updateBlogBody(this.blogID, this.textarea) 
  }
  }
  createBlog() {
    const blog: fromBlog.Blog = {
      id: this.blogID,
      title: this.blogTitle,
      section: this.blogSection,
      blog: this.textarea,
      createddAt: this.getCurrentTime(),
      updatedAt: this.getCurrentTime(),
      size: 'small'
    }

    this.store.dispatch( new actions.Create(blog) )
  }
  
 getCurrentTime(){
    return moment().format('DD MMM YYYY HH:mm:ss'); 
 }
  updateBlog(id, size) {
    this.store.dispatch( new actions.Update(id, { size: size, updatedAt: this.getCurrentTime() }) )
  }

  updateBlogBody(id, blog) {
    this.store.dispatch( new actions.Update(id, { blog: blog }) )
  }

  deleteBlog(id) {
    this.store.dispatch( new actions.Delete(id) )
  }


  //The editor wysiwyg
  iFrameOn(){
    this.richtextarea.nativeElement.contentDocument.designMode = "On";
  }

  iBold(){
    
    this.richtextarea.nativeElement.contentDocument.execCommand('bold',  null, null);
  }

  iUnderline(){
    this.richtextarea.nativeElement.contentDocument.execCommand('underline', false, null);
  }

  iFontSize(){
    var size = prompt('Enter a size 1 - 7', '');
    this.richtextarea.nativeElement.contentDocument.execCommand('FontSize', false, size);
  }

  iForeColor(){
    var color = prompt('Define a basic color or apply a hexadecimal color code for advanced colors:', '');
    this.richtextarea.nativeElement.contentDocument.execCommand('ForeColor',false,color);
  }
  iHorizontalRule(){
    this.richtextarea.nativeElement.contentDocument.execCommand('inserthorizontalrule',false,null);
  }
  iItalic(){
    this.richtextarea.nativeElement.contentDocument.execCommand('italic',false,null);
  }
  iUnorderedList(){
    this.richtextarea.nativeElement.contentDocument.execCommand("InsertOrderedList", false,"newOL");
  }
  iOrderedList(){
    this.richtextarea.nativeElement.contentDocument.execCommand("InsertUnorderedList", false,"newUL");
  }
  iLink(){
    var linkURL = prompt("Enter the URL for this link:", "http://"); 
    this.richtextarea.nativeElement.contentDocument.execCommand("CreateLink", false, linkURL);
  }
  iUnLink(){
    this.richtextarea.nativeElement.contentDocument.execCommand("Unlink", false, null);
  }
  iImage(){
    var imgSrc = prompt('Enter image location', '');
      if(imgSrc != null){
        this.richtextarea.nativeElement.contentDocument.execCommand('insertimage', false, imgSrc); 
      }
  }
}
