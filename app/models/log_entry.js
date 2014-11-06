var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LogEntrySchema   = new Schema({
	message: String,
	rating: String,
	timestamp: { type: Date, required: true, default: Date.now },
	tags: [String]
});

module.exports = mongoose.model('LogEntry', LogEntrySchema);