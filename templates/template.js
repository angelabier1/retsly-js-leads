module.exports =
function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div id=\"form-body\"><form name=\"lead\" id=\"lead\" action=\"\" method=\"post\"><input type=\"text\" id=\"namefield\" name=\"name\" placeholder=\"Name\"/><input type=\"text\" id=\"telfield\" name=\"phone\" placeholder=\"Contact Number\"/><input type=\"text\" id=\"emailfield\" name=\"email\" placeholder=\"Email\"/><input type=\"hidden\" id=\"listing_id\" name=\"listingID\" value=\"\"/><input type=\"hidden\" id=\"vendor_id\" name=\"vendorID\" value=\"\"/><input type=\"hidden\" id=\"agent_id\" name=\"agentID\" value=\"\"/></form></div><div id=\"button-section\"><button type=\"hidden\" style=\"display:none;\" class=\"button-left\">Add Comment</button><button type=\"submit\" class=\"button-right\">Send</button></div>");;return buf.join("");
}