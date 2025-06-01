export interface PlayerViewModel {
  id?: string;
  userId?: string;
  nickName?: string;
  avatar?: string;
  creation?: string;
  state?: number;
  tag?: string;
  role?: string;
}

export interface PlayerTableState {
  page: number;
  pageSize: number;
  filters: {
    nickName?: string;
    tag?: string;
  };
}

export interface EditPlayerViewModel {
  id: string;
  userId: string;
  nickName: string;
  avatarId: string;
  state?: number;
}
