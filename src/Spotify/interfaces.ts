export interface Image {
  height: null;
  url: string;
  width: null;
}

export interface PlaylistItems {
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: {
    display_name: string;

    href: string;
    id: string;
  };

  tracks: {
    href: string;
  };
  type: string;
  artists: Artists[];
  available_markets?: string[];
  duration_ms?: number;
}

export interface Artists {
  name: string;
  id: string;
  href: string;
}

export interface AlbumType {
  cover: string;
  items: PlaylistItems[];
  label: string;
  name: string;
  release_date: string;
  total_tracks: number;
}
