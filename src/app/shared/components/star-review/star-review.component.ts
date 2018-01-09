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
  users: Observable<User[]>;
  avgRating: Observable<any>;
  selected: string = 'Good';
  constructor(
    private _star: StarReviewService,
    public fb: FormBuilder,
    public _auth: AuthService
  ) { }

  ngOnInit() {
    this.users = this._auth.getSnapshot();
    this.reviews = this._star.getUsersReviews(this.userId);
    console.log(this.users)
    console.log(this.reviews)
    this.users.subscribe(value => console.log(value))
    this.reviews.subscribe(value => {
      console.log(value)
    });
    this.stars = this._star.getUserStars(this.userId)
    this.avgRating = this.stars.map(arr => {
      const ratings = arr.map(v => v.rating)
      var total = 0;
      for(var i = 0; i < ratings.length; i++) {
          total += ratings[i];
      }
      let avg = total / ratings.length;
      return avg
    })
   
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
         
        ]
      ]
    });
   
    this.selected = 'good';
  }

  starHandler(value) {
    return value;
    //this._star.setStar(this.userId, this.authId, value)
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
  }
}
