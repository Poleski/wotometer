const apiStatic = require("../api-static");
const wotget = require("./generic");

const tankProcessorCallback = (id) => {
    return (data) => {
        return Array.from(data[id]).reduce((acc, cur) => {
            acc[cur.tank_id] = cur;
            delete acc[cur.tank_id].tank_id;
            return acc;
        }, {});
    };
};

exports.getTanks = (req, res, next) => {
    const url = apiStatic.getFull(req.params.rg, 'tanks');
    wotget.get(url, res);
};

exports.getPlayerTanks = (req, res, next) => {
    const url = apiStatic.getFull(req.params.rg, 'player_tank_stats') + '&account_id=' + req.params.id;
    wotget.get(url, res, tankProcessorCallback(req.params.id));
};
