const config = require('../env/config')

const base = {
    eu: 'https://api.worldoftanks.eu',
    ru: 'https://api.worldoftanks.ru',
    na: 'https://api.worldoftanks.com',
    asia: 'https://api.worldoftanks.asia'
};

const endpoints = {
    players: '/wot/account/list/',
    player_info: '/wot/account/info/',
    achievements: '/wot/account/achievements/',
    player_tank_stats: '/wot/tanks/stats/',
    tanks: '/wot/encyclopedia/vehicles/',
    player_tank_achievements: '/wot/tanks/achievements/'
};

const fields = {
    players: [],
    player_info: [
        'statistics.random',
        'statistics.random.spotted',
        'statistics.random.avg_damage_blocked',
        'statistics.random.capture_points',
        'statistics.random.piercings',
        'statistics.random.avg_damage_assisted',
        'statistics.random.dropped_capture_points',
        'statistics.random.damage_dealt',
        'statistics.random.wins',
        'statistics.random.losses',
        'statistics.random.hits_percents',
        'statistics.random.tanking_factor',
        'statistics.random.survived_battles',
        'statistics.random.frags',
        'statistics.random.avg_damage_assisted_radio',
        'statistics.random.battle_avg_xp',
        'statistics.random.avg_damage_assisted_track',
        'last_battle_time',
        'created_at',
        'global_rating',
        'clan_id',
        'nickname',
        'logout_at'
    ],
    achievements: [],
    player_tank_stats: ['random', 'tank_id', 'in_garage', 'mark_of_mastery', 'max_frags', 'max_xp'],
    tanks: ['is_premium', 'images.small_icon', 'images.contour_icon', 'type', 'short_name', 'nation', 'tier'],
    player_tank_achievements: []
};

const extra = {
    players: [],
    player_info: ['statistics.random'],
    achievements: [],
    player_tank_stats: ['random'],
    tanks: ['is_premium','images.small_icon','images.contour_icon','type','short_name','nation','tier'],
    player_tank_achievements: []
};

module.exports.getBase = (reg) => {
    return base[reg];
};

module.exports.getEndpoint = (api) => {
    return endpoints[api] + '?application_id=' + config.WOT_API_KEY;
};

module.exports.getFull = (reg, api) => {
    let url = base[reg] + endpoints[api] + '?application_id=' + config.WOT_API_KEY;

    if (fields[api] !== []) {
        url += '&fields=' + encodeURIComponent(fields[api].join(','));
    }

    if (extra[api] !== []) {
        url += '&extra=' + encodeURIComponent(extra[api].join(','));
    }
    return url;
};