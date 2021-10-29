/******************************************************************************/
/* Copyright Yahoo Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this Software except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Integration = require('../integration.js');
const axios = require('axios');

class ShodanIntegration extends Integration {
  name = 'Shodan';
  itypes = {
    ip: 'fetchIp'
  };

  constructor () {
    super();

    Integration.register(this);
  }

  async fetchIp (user, ip) {
    try {
      const key = this.getUserConfig(user, 'ShodanKey');
      if (!key) {
        return undefined;
      }

      const response = await axios.get(`https://api.shodan.io/shodan/host/${ip}?key=${key}`, {
        headers: {
          'User-Agent': this.userAgent()
        }
      });

      return response.data;
    } catch (err) {
      console.log(this.name, ip, err);
      return null;
    }
  }
}

// eslint-disable-next-line no-new
new ShodanIntegration();
