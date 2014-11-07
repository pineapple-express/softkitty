var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LogEntrySchema   = new Schema({
	message: {type: String, trim: true},
	rating: {type: String, trim: true},
	timestamp: { type: Date, required: true, default: Date.now },
	tags: [String]
});

module.exports = mongoose.model('LogEntry', LogEntrySchema);