(function(hello) {

	hello.init({

		mailchimp: {
			name: 'MailChimp',

			oauth: {
				version: 2,
				auth: 'https://login.mailchimp.com/oauth2/authorize'
			},

			scope: {
				contacts: ''
			},

			base: 'https://api.mailchimp.com/3.0/',

			get: {
			},

			wrap: {
				me: function(o, headers) {

					formatError(o, headers);
					formatUser(o);

					return o;
				},

				'default': function(o, headers, req) {

					formatError(o, headers);

					if (Array.isArray(o)) {
						o = {data:o};
					}

					if (o.data) {
						paging(o, headers, req);
						o.data.forEach(formatUser);
					}

					return o;
				}
			},

			xhr: function(p) {

				if (p.method !== 'get' && p.data) {

					// Serialize payload as JSON
					p.headers = p.headers || {};
					p.headers['Content-Type'] = 'application/json';
					if (typeof (p.data) === 'object') {
						p.data = JSON.stringify(p.data);
					}
				}

				return true;
			}
		}
	});

	function formatError(o, headers) {}

	function formatUser(o) {}

	function paging(res, headers, req) {}

})(hello);
