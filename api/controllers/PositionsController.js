/**
 * PositionController
 *
 * @description :: Server-side logic for managing positions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getAllPosition: function (req, res) {
        //Position.find().exec(function (err, result) {
        //    if (err)
        //        return res.serverError('Internal server error');
        //    return res.send(result);
        //});
         res.send('Response for --get-- api/positions --');

    },
    addPosition: function (req, res) {
        //Position.create({positionName: req.param('positionName')}).exec(function (err, position) {
        //    if (err)
        //        return res.serverError('Internal server error');
        //    return res.send(position);
        //});
        res.send('Response for --post-- api/positions --');
    },
    updatePosition: function (req, res) {
        //req.wantsJSON = true;
        //Position.update({_id: req.param('id')}, {positionName: req.param('positionName')}).exec(function (err, Positions) {
        //    if (err)
        //        return res.serverError('Internal server error');
        //    if (!Positions.length)
        //        return res.notFound('There in no Positions with given name.');
        //
        //    res.send(Positions);
        //});
        res.send('Response for --put-- api/positions/id --');
    },
    deletePosition: function (req, res) {
        //req.wantsJSON = true;
        //Position.destroy({_id: req.param('id')}).exec(function (err, Position) {
        //    if (err)
        //        return res.serverError('Internal server error');
        //    if (!Position.length)
        //        return res.notFound('There in no Position with given name.');
        //
        //    res.send("Position deleted");
        //});
        res.send('Response for --delete-- api/positions/id --');
    }
};

