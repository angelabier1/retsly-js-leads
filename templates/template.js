module.exports =
function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div id=\"form-container\"><div id=\"form-body\"> <form name=\"lead\" id=\"lead\" action=\"\" method=\"post\"><div class=\"header-text\">Request more information</div><input type=\"text\" id=\"namefield\" name=\"name\" placeholder=\"Name\"/><input type=\"text\" id=\"telfield\" name=\"phone\" placeholder=\"Contact Number\"/><input type=\"text\" id=\"emailfield\" name=\"email\" placeholder=\"Email\"/><textarea id=\"commentfield\" name=\"comment\"></textarea><input type=\"hidden\" id=\"listing_id\" name=\"listingID\" value=\"\"/><input type=\"hidden\" id=\"vendor_id\" name=\"vendorID\" value=\"\"/><input type=\"hidden\" id=\"agent_id\" name=\"agentID\" value=\"\"/></form></div><div id=\"button-section\"><div class=\"tab-left\"></div><div class=\"addComment\">Add a Comment</div><div class=\"tab-right\"><button type=\"submit\" class=\"send-button\">Send</button></div></div></div>");;return buf.join("");
}