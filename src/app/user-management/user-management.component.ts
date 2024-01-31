import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserManagementService } from './services/user-management.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
  public users: any[] = [ {
    "first_name": "Admin",
    "last_name": "Deepersignals",
    "role": "Admin",
    "token": "QWRtaW5Vc2Vy"
  },];
  private unsubscribe$ = new Subject<void>();

  constructor(private userService: UserManagementService) {}

  ngOnInit(): void {
    // this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(users => {
        this.users = users;
      });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.loadUsers();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
