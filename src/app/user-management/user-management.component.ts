import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserManagementService } from './services/user-management.service';
import { UserDto } from 'src/app/shared/interfaces/user-dto.interface';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
  public users: UserDto[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private userService: UserManagementService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((users: UserDto[]) => {
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
