import jQuery from 'jquery';
global.$ = global.jQuery = require('jquery');

import cSearch from '../../components/c-search/c-search';
import cSearchHistory from '../../components/c-searchhistory/c-searchhistory';

cSearch.init();
cSearchHistory.init();
