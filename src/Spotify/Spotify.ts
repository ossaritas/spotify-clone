let spotifyAccesToken = "";
// Please provide the client ID of your Spotify App.
const clientId = "5c3ebff529a740f28768e7497d6a51d6";
//Please provide the redirect URI added in your Spotify App while registration.
const redirectUri = "http://localhost:3000";

const Spotify = {
  // Get the access token using authorize API from Sportify.
  getAccessToken() {
    const scopes =
      "ugc-image-upload user-read-playback-state streaming user-read-email playlist-read-collaborative user-modify-playback-state user-read-private playlist-modify-public user-library-modify user-top-read user-read-currently-playing playlist-read-private user-follow-read app-remote-control user-read-recently-played playlist-modify-private user-follow-modify user-library-read";
    if (spotifyAccesToken) {
      return spotifyAccesToken;
    }
    const accessToken = window.location.href.match(/access_token=([^&]*)/);
    const expiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (accessToken && expiresIn) {
      spotifyAccesToken = accessToken[1];
      localStorage.setItem("accessToken", spotifyAccesToken);
      let expiryTime = Number(expiresIn[1]);
      window.setTimeout(() => (spotifyAccesToken = ""), expiryTime * 1000);
      window.history.pushState("Access Token", " ", "/");
      return spotifyAccesToken;
    } else {
      const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(
        scopes
      )}&response_type=token`;
      window.location.assign(url);
      return "";
    }
  },

  // Search for a track from Spotify

  // Save the play list to Spotify account.
  // return true if playlist created successfully.
  /*   async savePlaylist(name, trackURIs) {
    try {
      if (name && trackURIs) {
        const token = this.getAccessToken();
        const userId = await this.getUserId(token);
        if (userId) {
          //create Playlist
          const playlistID = await this.createPlayList(token, userId, name);
          if (playlistID) {
            //add tracks
            return await this.addTracks(token, userId, playlistID, trackURIs);
          }
        }
      }
    } catch (e) {
      console.log("Error occure while saving the playlist");
      console.log(e);
    }
    return false;
  }, */

  // Get user Id of logged in account user.
  async getUserId(token: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let userId = "";
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: headers,
    });
    const jsonResponse = await response.json();
    if (jsonResponse) {
      userId = jsonResponse.id;
    }
    return userId;
  },

  // Create a play list with given name and return it's ID
  /*   async createPlayList(token, userId, name) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json"
    };
    //create Playlist
    let playlistID = "";
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        body: JSON.stringify({ name: name }),
        headers: headers,
        method: "POST"
      }
    );
    const jsonResponse = await response.json();
    if (jsonResponse) {
      playlistID = jsonResponse.id;
    }
    return playlistID;
  }, */

  async getPlayList() {
    const token = this.getAccessToken();
    const userId = await this.getUserId(token);
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: headers,
        method: "GET",
      }
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  },

  async getTracks(id: string) {
    const token = this.getAccessToken();

    const userId = await this.getUserId(token);
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists/${id}/tracks`,
      {
        headers: headers,
        method: "GET",
      }
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  },

  async getCategories() {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    const response = await fetch(
      `https://api.spotify.com/v1/browse/categories`,
      {
        headers: headers,
        method: "GET",
      }
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  },

  async getCategoryPlaylists(id: string) {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    const response = await fetch(
      `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
      {
        headers: headers,
        method: "GET",
      }
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  },

  async getFeaturedPlaylists() {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    const response = await fetch(
      `https://api.spotify.com/v1/browse/featured-playlists?country=US`,
      {
        headers: headers,
        method: "GET",
      }
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  },

  async getNewReleases() {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    const response = await fetch(
      `https://api.spotify.com/v1/browse/new-releases?country=US`,
      {
        headers: headers,
        method: "GET",
      }
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  },

  async getAlbums(id: string) {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
      headers: headers,
      method: "GET",
    });
    const jsonResponse = await response.json();

    return jsonResponse;
  },

  async getPlaylistDetails(id: string) {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: headers,
      method: "GET",
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  },

  async getArtist(id: string) {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
      headers: headers,
      method: "GET",
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  },

  async getArtistsTopTracks(id: string) {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`,
      {
        headers: headers,
        method: "GET",
      }
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  },

  async getArtistsAlbums(id: string) {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${id}/albums`,
      {
        headers: headers,
        method: "GET",
      }
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  },

  async getSavedAlbums() {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    const response = await fetch(`https://api.spotify.com/v1/me/albums`, {
      headers: headers,
      method: "GET",
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  },

  async getLikedSongs() {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    const response = await fetch(`https://api.spotify.com/v1/me/tracks`, {
      headers: headers,
      method: "GET",
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  },
  async getPlayer() {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/recently-played
    `,
      {
        headers: headers,
        method: "GET",
      }
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  },
  async getYoutubeSong(url: string) {
    const response = await fetch(`${url}`);
    const jsonResponse = await response.json();
    return jsonResponse;
  },

  async getSearch(searchF: string) {
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${searchF}&type=track%2Cartist&market=US
    `,
      {
        headers: headers,
        method: "GET",
      }
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  },
};

export default Spotify;
