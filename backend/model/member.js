var mongoose = require('mongoose');
var Schema = mongoose.Schema;

memberSchema = new Schema( {
	name: String,
	addr: String,
	email: String,
	image: String,
	ent: String,
	birthday: String,
	user_id: Schema.ObjectId,
	is_delete: { type: Boolean, default: false },
	date : { type : Date, default: Date.now }
}),
member = mongoose.model('member', memberSchema);

module.exports = member;