---
title: JSON Web Tokens
highlights: JSON Web Tokens are used as part of Signed Requests with squatch.js and Open Endpoints. They are used to validate the data being supplied to Referral SaaSquatch.
slug: topics/json-web-tokens
sectionType: guide
template: hasTableOfContents.html
date: 2023-11-06
---

### What is a JWT?

A JWT is an [open standard](https://tools.ietf.org/html/rfc7519) for securely sharing information as a JSON object. JWTs are small enough to be used in a GET or POST parameter or an HTTP header and because they are digitally signed the information inside can be trusted. This allows us to use a JWT like a checksum to verify that the squatch.js init parameters are correct, but with the convenience of using a library to generate the JWT.

### How do I generate a JWT?

JWTs can easily be generated using one of the [libraries](https://jwt.io/#libraries-io) available. There are even more libraries in even more languages available on [GitHub](https://github.com/search?utf8=%E2%9C%93&q=json+web+token&type=Repositories&ref=searchresults) in addition to the ones recommended by [JWT.io](https://jwt.io).

### Example: Building the JWT

#### 1. Collect the Data Object

Whether you are using a JWT with squatch.js or the Open Endpoints you will need to start with the data object that you are trying to sign.

For [Open Endpoint](/api/openendpoints/) and [squatch.js](/developer/squatchjs/v2/) calls the data might look like:

<pre><code>{
    "id": "abc_123",
    "accountId": "abc_123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "locale": "en_US",
    "referralCode": "JOHNDOE"
}</code></pre>

#### 2. Assemble the JWT payload

The JWT payload structures the data trying to be signed as follows:

> **Please Note:** Do not include `tenantAlias` in the JWT payload for squatch.js.

For [Open Endpoint](/api/openendpoints/) and [squatch.js](/developer/squatchjs/v2/) calls:

  <pre><code>{
  "user":{
    "id": "abc_123",
    "accountId": "abc_123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "locale": "en_US",
    "referralCode": "JOHNDOE"
  }
}
</code></pre>

#### 3. Sign the Payload

Use your chosen library to build the JWT with the payload, and sign it with your tenant's API key.

> **Test mode vs. live mode** - Your SaaSquatch program provides both a [live and test mode](/success/using-referral-saasquatch/#test-vs-live). Each of these tenants provides an independant API key. Make sure to use the correct API key for call you are trying to sign.

<ul class="nav nav-tabs" id="jwt-code-samples">
		<li><a data-toggle="tab" data-target=".calculatejwt-example-cs">C#</a></li>
		<li><a data-toggle="tab" data-target=".calculatejwt-example-rb">Ruby</a></li>
		<li><a data-toggle="tab" data-target=".calculatejwt-example-java">Java</a></li>
		<li><a data-toggle="tab" data-target=".calculatejwt-example-php">PHP</a></li>
		<li class="active"><a data-toggle="tab" data-target=".calculatejwt-example-py">Python</a></li>
</ul>

<div class="tab-content">
<div class="tab-pane calculatejwt-example-cs">
<pre><code class="lang-cs">using System.Collections.Generic;
	using System.Text;
	using Jose;

    namespace JWTExample
    {
    	class Program
    	{
    		public static string buildJWT(string secret, string accountId, string userId, string email, string firstName, string lastName, long expiryDate, string referralCode)
    		{
    			var userPayload = new Dictionary&#60;string, object>()
    			{
    			  { "id", userId },
    			  { "accountId", accountId },
    			  { "firstName", firstName },
    			  { "lastName", lastName },
    			  { "email", email },
    			  { "locale", locale },
    			  { "referralCode", referralCode }
    			};

    			var payload = new Dictionary&#60;string, object>()
    			{
    			  { "user", userPayload },
    			  { "exp", expiryDate } //optional date in seconds since the epoch
    			};

    			//the encoding must match the encoding of your secret, UTF8 is just an example
    			var byteSecret = Encoding.UTF8.GetBytes(secret);

    			return Jose.JWT.Encode(payload, byteSecret, JwsAlgorithm.HS256);
    		}
    	}
    }

</code></pre>

</div>

<div class="tab-pane calculatejwt-example-rb">
	<pre><code class="lang-rb">require 'jwt'

    def buildJWT(secret, userId, accountId, email, firstName, lastName, referralCode, locale, expiryDate)
    	secret = 'Referral SaaSquatch API key'
    	return payload = JWT.encode({
    	user: {
    	  id: userId,
    	  accountId: accountId,
    	  firstName: firstName,
    	  lastName: lastName,
    	  email: email,
    	  locale: locale,
    	  referralCode: referralCode
    	},
    	exp: expiryDate #optional date in seconds since the epoch
    	}, secret)
    end

</code></pre>

</div>

<div class="tab-pane calculatejwt-example-java">
	<pre><code class="lang-java">import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JOSEObjectType;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtExample {

    public static String buildJwt(String secret, Date expiryDate) {
    	// Build user object
    	final Map<String, Object> userMap = new HashMap<>();
    	userMap.put("id", "REPLACEME");
    	userMap.put("accountId", "REPLACEME");
    	userMap.put("firstName", "REPLACEME");
    	userMap.put("lastName", "REPLACEME");
    	userMap.put("email", "REPLACEME");
    	// Extra user fields, etc.

    	final JWSHeader header = new JWSHeader.Builder(JWSAlgorithm.HS256)
    			.type(JOSEObjectType.JWT)
    			.build();
    	final JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
    			.claim("user", userMap)
    			// Not having an expiry works, but having an expiry is strongly recommended
    			.expirationTime(expiryDate)
    			.build();
    	final SignedJWT jwt = new SignedJWT(header, claimsSet);
    	try {
    		jwt.sign(new MACSigner(secret));
    	} catch (JOSEException e) {
    		// This will happen if your secret is shorter than 256 bits.
    		// If you are using your tenant API key, you won't need to worry about it.
    		throw new RuntimeException(e);
    	}
    	return jwt.serialize();
    }

}
</code></pre>

</div>

<div class="tab-pane calculatejwt-example-php">
	<pre><code class="lang-php">use \Firebase\JWT\JWT;

    function buildJWT($secret, $userId, $accountId, $email, $firstName, $lastName, $locale, $referralCode) {
    	//build user object
    	$payload = array(
    	"user" => array(
    	  "id" => $userId,
    	  "accountId" => $accountId,
    	  "firstName" => $firstName,
    	  "lastName" => $lastName,
    	  "email" => $email,
    	  "locale" => $locale,
    	  "referralCode" => $referralCode,
    	),
    	"exp" => $expiryDate //optional date in seconds since the epoch
    	);

    	//the encoder defaults to HS256, no need to specify an algorithm
    	return JWT::encode($payload, $secret);
    }

</code></pre>

</div>

<div class="tab-pane calculatejwt-example-py active">
	<pre><code class="lang-py">import jwt

    def buildJWT(secret, userId, accountId, email, firstName, lastName, locale, referralCode, expiryDate):
    return jwt.encode({
    'user': {
    	'id': userId,
    	'accountId': accountId,
    	'firstName': firstName,
    	'lastName': lastName,
    	'email': email,
    	'locale': locale,
    	'referralCode': referralCode
    },
    'exp': expiryDate #optional date in seconds since the epoch
    }, secret, algorithm='HS256')

</code></pre>

</div>
</div>

#### 4. Include the JWT

##### squatch.js

Once you have created the JWT, be sure to **include it with all of your calls**. An example of a squatch.js call including the JWT is included below:

<ul class="nav nav-tabs" id="squatch-js-widget-code">
		<li><a data-toggle="tab" data-target=".widget-example-classic">Classic</a></li>
		<li class="active"><a data-toggle="tab" data-target=".widget-example-ga">Growth Automation</a></li>
</ul>

<div class="tab-content">
<div class="tab-pane widget-example-classic">
<pre><code class="lang-js">
window.squatch.ready(function(){

//configure squatch.js for the tenant you are using  
 squatch.init({
tenantAlias: 'test_abzxg88g30tn2'
});

//object containing the init parameters for squatch.js
var initObj = {

    //the object for the user you want to upsert
    user: {
      id: 'abc_123',
      accountId: 'abc_123',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      referable: false
    },
    engagementMedium: 'EMBED',
    widgetType: 'REFERRER_WIDGET',
    	jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYWJjXzEyMyIsImFjY291bnRJZCI6ImFiY18xMjMiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJyZWZlcmFibGUiOmZhbHNlfX0.ZomcuXZxyI1vhf94q2ipByj6WVMsik1OgLxaDBke0Pg'

};

squatch.widgets().upsertUser(initObj).then(function(response) {
user = response.user;
}).catch(function(error){
console.log(error);
});
});
</code></pre>

</div>

<div class="tab-pane widget-example-ga active">
	<pre><code class="lang-js">

<script>
window.squatchTenant = “TENANT_ALIAS”
window.squatchToken = “JWT_GOES_HERE”
</script>

<squatch-embed widget=”p/program-name/w/referrerWidget”></squatch-embed>

</code></pre>

</div>
</div>

##### Open Endpoint API Call

> **Note** - Open Endpoint API calls made from a server should be signed with your tenant's API key. Only Open Endpoint calls from a client should be signed with a JWT.

For use with an Open Endpoint API call the JWT should be included in the API call as a header with the key `X-SaaSquatch-User-Token`.

cURL uses the `-H` flag to pass an extra header. You may specify any number of extra headers.

<pre><code class="lang-http">curl -X POST https://app.referralsaasquatch.com/api/v1/{tenant_alias}/open/account/{accountId}/user/{userId} \
-H "X-SaaSquatch-User-Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoidTEyMzQiLCJhY2NvdW50SWQiOiJhNTY3OCIsImVtYWlsIjoiam9lQGV4YW1wbGUuY29tIiwiZmlyc3ROYW1lIjoiSm9lIiwibGFzdE5hbWUiOiJUZXN0ZXJzb24iLCJsb2NhbGUiOiJlbl9VUyIsInJlZmVycmFsQ29kZSI6IkpPRVRFU1RFUlNPTiJ9fQ.TymCGn2W7H_QGwVqX4k5ELB7HS04RfRSpDATAsl67zI" \
-H "Content-Type: application/json" \
-d '{
    "id": "u1234",
    "accountId": "a5678",
    "email": "Joe@example.com",
    "firstName": "Joe",
    "lastName": "Testerson",
    "locale": "en_US",
    "referralCode": "JOETESTERSON"
}'</code></pre>

### Additional Resources

Read more about [Signed Requests](/developer/squatchjs/signed-requests/) for [squatch.js](/developer/squatchjs/signed-requests/) and [Open Endpoints](/api/openendpoints/#authentication-options). [This article](/developer/squatchjs/signed-requests/) covers case-specific details about parameters to exclude and how to add a JWT to a call.
