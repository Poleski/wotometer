const apiStatic = require("../api-static");
const wotget = require("./generic");

const getPlayerCallback = (id) => {
    return (data) => {
        return data[id];
    }
};


exports.searchPlayers = (req, res, next) => {
    const url = apiStatic.getFull(req.params.rg, 'players') + '&search=' + req.params.name;
    wotget.get(url, res);
};

exports.getPlayer = (req, res, next) => {
    const url = apiStatic.getFull(req.params.rg, 'player_info') + '&account_id=' + req.params.id;
    wotget.get(url, res, getPlayerCallback(req.params.id));
};
