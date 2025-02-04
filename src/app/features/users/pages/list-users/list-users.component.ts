import { Component, OnInit } from '@angular/core';
import { UsersService, User } from '../../../../core/services/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery: string = '';
  statusFilter: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter(user => {
      return (
        (this.searchQuery === '' || user.name.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
        (this.statusFilter === '' || user.status === this.statusFilter)
      );
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  deleteUser(id: number): void {
    this.usersService.deleteUser(id).subscribe(() => {
      this.fetchUsers();
    });
  }
  getTotalPages(): number[] {
    return Array.from({ length: Math.ceil(this.filteredUsers.length / this.itemsPerPage) }, (_, i) => i + 1);
  }

}
