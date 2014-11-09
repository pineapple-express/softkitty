var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TagSchema   = new Schema({
	label: {type: String, trim: true}
});

module.exports = mongoose.model('Tag', TagSchema);