# cybouz_automatic_approval

set values for these consts on the top of `pupetter.mjs`

```js
const CYBOU_URL = 'https://your.cybouz.host.com/cgi-bin/cbag/ag.cgi' // URL of Cybouz

const BASIC_USERNAME = 'basicUserName'; // set username for basic auth if it has
const BASIC_PASSWORD = 'basicPassword'; // set password for basic auth if it has

const LOGIN_USER_INDEX = '1234'; // value of option for your user
const LOGIN_USER_PASS = 'foobar'; // your login password
```

run `npm install`

run `node pupetter.mjs`
