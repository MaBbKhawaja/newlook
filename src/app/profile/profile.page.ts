import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user;
  edit = false;
  constructor(public restService: RestService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onEdit() {
    console.log("MIRZA")
    this.edit = true;
  }
  onSave() {

    console.log(this.user)
    this.restService.editUser(this.user).subscribe((res: any) => {

      if (res.status == 200) {
        localStorage.setItem("user", JSON.stringify(res.data))
        this.user = JSON.parse(localStorage.getItem('user'));
        this.edit = false;
      }
      this.restService.toastMessage(res.message)
      console.log(res)
    })

  }

}
