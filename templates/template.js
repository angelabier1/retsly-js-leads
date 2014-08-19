module.exports =
function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div id=\"form-container\"><form name=\"lead\" id=\"lead\" action=\"\" method=\"post\"><div id=\"form-body\"> <div class=\"header-text\">Request more information</div><input type=\"text\" id=\"namefield\" name=\"name\" placeholder=\"Name\"/><input type=\"text\" id=\"telfield\" name=\"phone\" placeholder=\"Phone: 1-234-567-8910 ext. 12\"/><input type=\"text\" id=\"emailfield\" name=\"email\" placeholder=\"Email\"/><div id=\"commentdiv\"><textarea id=\"commentfield\" name=\"comment\" placeholder=\"Please enter message\"></textarea></div><input type=\"hidden\" id=\"listing_id\" name=\"listingID\" value=\"\"/><input type=\"hidden\" id=\"vendor_id\" name=\"vendorID\" value=\"\"/><input type=\"hidden\" id=\"agent_id\" name=\"agentID\" value=\"\"/><div id=\"button-section\"><div class=\"tab-left\"><span id=\"commentSpan\">Add a message</span></div><div id=\"tab-right-bar\"><button type=\"submit\" class=\"send-button\">Send</button></div><div id=\"progress-bar\"></div></div></div></form></div>");;return buf.join("");
}