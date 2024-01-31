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

  public loadUsers(): void {
    this.userService.getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((users: UserDto[]) => {
        this.users = users;
      });
  }

  public deleteUser(userToDelete: UserDto): void {
    // due to the lack of functionality on the API, we simply change the visual
    this.users = this.users.filter(user => !this.areUsersEqual(user, userToDelete));
    this.userService.deleteUser(userToDelete)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {});
  }

  private areUsersEqual(user1: UserDto, user2: UserDto): boolean {
    return (
      user1.name === user2.name &&
      user1.lastName === user2.lastName &&
      user1.dateOfBirth === user2.dateOfBirth &&
      user1.education === user2.education &&
      user1.position === user2.position &&
      user1.role === user2.role
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
