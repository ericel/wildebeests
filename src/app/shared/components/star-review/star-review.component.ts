import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StarReviewService } from './star-review.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../core/auth/authservice/auth.service';
import { User } from './../../core/auth/authservice/auth.model'
@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.css']
})
export class StarReviewComponent implements OnInit {
  ratingform: FormGroup;
  rating_value: number;
  reviews: Observable<any>;
  @Input() userId;
  @Input() authId;
  stars: Observable<any>;
  avgRating: Observable<any>;
  selected: string = 'Good';
  constructor(
    private _star: StarReviewService,
    public fb: FormBuilder,
    public _auth: AuthService
  ) { }

  ngOnInit() {
    
    this.reviews = this._star.getUsersReviews(this.userId);
    
    this.stars = this._star.getUserStars(this.userId)
    if(this.stars){
      this.avgRating = this.stars.map(arr => {
        const ratings = arr.map(v => v.rating)
        
        var total = 0;
        for(var i = 0; i < ratings.length; i++) {
            total += ratings[i];
        }
        let avg = total / ratings.length ;
        if (isNaN(avg)) {
          return '{0}';
        }
        
        return avg;
      })
    }
 
    this.ratingform = this.fb.group({
      'typeRate': [this.selected, [
        Validators.required
        ]
      ],
      'review': ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(150)
        ]
      ],
      'rating': ['', [
       Validators.required,
        ]
      ]
    });
   
    this.selected = 'good';
  }


  get review() { return this.ratingform.get('review') }
  get rating() { return this.ratingform.get('rating') }
  get type(){ return this.ratingform.get('typeRate')}
  save() {
    if(this.rating.value === ''){
      this.rating_value = 0;
    } else {
      this.rating_value = this.rating.value;
    }
    this._star.addItem(this.authId, this.userId, this.type.value, this.review.value, this.rating_value);
    this.ratingform.get('review').reset();
  }

  delete(review){
    this._star.delete(review);
  }

  getStars(rating) {
    // Get the value
    var val = parseFloat(rating);
    // Turn value into number/100
    var size = val/5*100;
    return size + '%';
  }
}
