interface ModuleDefinition {
    identifier: string
    route: string
    module: any
}
export const defMod: ModuleDefinition[] = [
    {
        identifier: 'user_account',
        route: '/user/account',
        module: require('NeteaseCloudMusicApi/module/user_account')
    },
    {
        identifier: 'user_subcount',
        route: '/user/subcount',
        module: require('NeteaseCloudMusicApi/module/user_subcount')
    },

    {
        identifier: 'user_playlist',
        route: '/user/playlist',
        module: require('NeteaseCloudMusicApi/module/user_playlist')
    },

    {
        identifier: 'likelist',
        route: '/likelist',
        module: require('NeteaseCloudMusicApi/module/likelist')
    },

    {
        identifier: 'album_sublist',
        route: '/album/sublist',
        module: require('NeteaseCloudMusicApi/module/album_sublist')
    },

    {
        identifier: 'artist_sublist',
        route: '/artist/sublist',
        module: require('NeteaseCloudMusicApi/module/artist_sublist')
    },

    {
        identifier: 'mv_sublist',
        route: '/mv/sublist',
        module: require('NeteaseCloudMusicApi/module/mv_sublist')
    },

    {
        identifier: 'user_cloud',
        route: '/user/cloud',
        module: require('NeteaseCloudMusicApi/module/user_cloud')
    },

    {
        identifier: 'user_record',
        route: '/user/record',
        module: require('NeteaseCloudMusicApi/module/user_record')
    },

    {
        identifier: 'recommend_songs',
        route: '/recommend/songs',
        module: require('NeteaseCloudMusicApi/module/recommend_songs')
    },

    {
        identifier: 'personal_fm',
        route: '/personal_fm',
        module: require('NeteaseCloudMusicApi/module/personal_fm')
    },

    {
        identifier: 'fm_trash',
        route: '/fm_trash',
        module: require('NeteaseCloudMusicApi/module/fm_trash')
    },

    {
        identifier: 'song_detail',
        route: '/song/detail',
        module: require('NeteaseCloudMusicApi/module/song_detail')
    },

    {
        identifier: 'search',
        route: '/search',
        module: require('NeteaseCloudMusicApi/module/search')
    },

    {
        identifier: 'personalized',
        route: '/personalized',
        module: require('NeteaseCloudMusicApi/module/personalized')
    },

    {
        identifier: 'top_playlist_highquality',
        route: '/top/playlist/highquality',
        module: require('NeteaseCloudMusicApi/module/top_playlist_highquality')
    },

    {
        identifier: 'toplist',
        route: '/toplist',
        module: require('NeteaseCloudMusicApi/module/toplist')
    },

    {
        identifier: 'top_playlist',
        route: '/top/playlist',
        module: require('NeteaseCloudMusicApi/module/top_playlist')
    },

    {
        identifier: 'album_newest',
        route: '/album/newest',
        module: require('NeteaseCloudMusicApi/module/album_newest')
    },

    {
        identifier: 'album',
        route: '/album',
        module: require('NeteaseCloudMusicApi/module/album')
    },

    {
        identifier: 'personalized_newsong',
        route: '/personalized/newsong',
        module: require('NeteaseCloudMusicApi/module/personalized_newsong')
    },

    {
        identifier: 'playlist_hot',
        route: '/playlist/hot',
        module: require('NeteaseCloudMusicApi/module/playlist_hot')
    },

    {
        identifier: 'playlist_catlist',
        route: '/playlist/catlist',
        module: require('NeteaseCloudMusicApi/module/playlist_catlist')
    },

    {
        identifier: 'playlist_detail',
        route: '/playlist/detail',
        module: require('NeteaseCloudMusicApi/module/playlist_detail')
    },

    {
        identifier: 'playlist_track_all',
        route: '/playlist/track/all',
        module: require('NeteaseCloudMusicApi/module/playlist_track_all')
    },

    {
        identifier: 'mv_url',
        route: '/mv/url',
        module: require('NeteaseCloudMusicApi/module/mv_url')
    },

    {
        identifier: 'mv_detail',
        route: '/mv/detail',
        module: require('NeteaseCloudMusicApi/module/mv_detail')
    },

    {
        identifier: 'simi_mv',
        route: '/simi/mv',
        module: require('NeteaseCloudMusicApi/module/simi_mv')
    },

    {
        identifier: 'login_qr_key',
        route: '/login/qr/key',
        module: require('NeteaseCloudMusicApi/module/login_qr_key')
    },

    {
        identifier: 'login_qr_create',
        route: '/login/qr/create',
        module: require('NeteaseCloudMusicApi/module/login_qr_create')
    },

    {
        identifier: 'login_qr_check',
        route: '/login/qr/check',
        module: require('NeteaseCloudMusicApi/module/login_qr_check')
    },

    {
        identifier: 'captcha_sent',
        route: '/captcha/sent',
        module: require('NeteaseCloudMusicApi/module/captcha_sent')
    },

    {
        identifier: 'captcha_verify',
        route: '/captcha/verify',
        module: require('NeteaseCloudMusicApi/module/captcha_verify')
    },

    {
        identifier: 'logout',
        route: '/logout',
        module: require('NeteaseCloudMusicApi/module/logout')
    },

    {
        identifier: 'login_status',
        route: '/login/status',
        module: require('NeteaseCloudMusicApi/module/login_status')
    },

    {
        identifier: 'top_artists',
        route: '/top/artists',
        module: require('NeteaseCloudMusicApi/module/top_artists')
    },

    {
        identifier: 'artist_detail',
        route: '/artist/detail',
        module: require('NeteaseCloudMusicApi/module/artist_detail')
    },

    {
        identifier: 'artists',
        route: '/artists',
        module: require('NeteaseCloudMusicApi/module/artists')
    },

    {
        identifier: 'artist_mv',
        route: '/artist/mv',
        module: require('NeteaseCloudMusicApi/module/artist_mv')
    },

    {
        identifier: 'artist_album',
        route: '/artist/album',
        module: require('NeteaseCloudMusicApi/module/artist_album')
    },

    {
        identifier: 'simi_artist',
        route: '/simi/artist',
        module: require('NeteaseCloudMusicApi/module/simi_artist')
    },

    {
        identifier: 'artist_top_song',
        route: '/artist/top/song',
        module: require('NeteaseCloudMusicApi/module/artist_top_song')
    },
    {
        identifier: 'lyric',
        route: '/lyric',
        module: require('NeteaseCloudMusicApi/module/lyric')
    },
    {
        identifier: 'song_url',
        route: '/song/url',
        module: require('NeteaseCloudMusicApi/module/song_url')
    },
    {
        identifier: 'playlist_subscribe',
        route: '/playlist/subscribe',
        module: require('NeteaseCloudMusicApi/module/playlist_subscribe')
    },
    {
        identifier: 'playlist_delete',
        route: '/playlist/delete',
        module: require('NeteaseCloudMusicApi/module/playlist_delete')
    },
    {
        identifier: 'album_sublist',
        route: '/album/sublist',
        module: require('NeteaseCloudMusicApi/module/album_sublist')
    },
    {
        identifier: 'scrobble',
        route: '/scrobble',
        module: require('NeteaseCloudMusicApi/module/scrobble')
    },
    {
        identifier: 'artist_sub',
        route: '/artist/sub',
        module: require('NeteaseCloudMusicApi/module/artist_sub')
    },
    {
        identifier: 'album_sub',
        route: '/album/sub',
        module: require('NeteaseCloudMusicApi/module/album_sub')
    },
    {
        identifier: 'mv_sub',
        route: '/mv/sub',
        module: require('NeteaseCloudMusicApi/module/mv_sub')
    },
    {
        identifier: 'like',
        route: '/like',
        module: require('NeteaseCloudMusicApi/module/like')
    }
]
