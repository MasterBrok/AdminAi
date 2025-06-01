import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { PlayerViewModel, PlayerTableState } from './models/player.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players: PlayerViewModel[] = []; 
  tableState: PlayerTableState = {
    page: 1,
    pageSize: 10,
    filters: {
      nickName: '',
      tag: ''
    }
  };
  pageSizeOptions = [10, 20, 50];
  totalPages = 0;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadPlayers();
  }

  loadPlayers() {
    let url = `Player/Players?CurrentPage=${this.tableState.page}`;
    if (this.tableState.filters.nickName?.trim()) {
      url += `&NickName=${encodeURIComponent(this.tableState.filters.nickName.trim())}`;
    }
    if (this.tableState.filters.tag?.trim()) {
      url += `&Tag=${encodeURIComponent(this.tableState.filters.tag.trim())}`;
    }
    this.api.get<any>(url).subscribe({
      next: (res) => {
        if (res.success) {
          this.players = res.response;
          this.totalPages = res.totalPages || 0;
        }
      }
    });
  }

  onSearch() {
    this.tableState.page = 1;
    this.loadPlayers();
  }

  onPageChange(page: number) {
    this.tableState.page = page;
    this.loadPlayers();
  }

  onPageSizeChange(pageSize: number) {
    if (pageSize !== this.tableState.pageSize) {
      this.tableState.pageSize = pageSize;
      this.tableState.page = 1;
      this.loadPlayers();
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  onEdit(player: PlayerViewModel) {
    this.router.navigate(['/dashboard/players/edit'], { queryParams: { id: player.id } });
  }
}
