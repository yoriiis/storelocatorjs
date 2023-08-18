import './css/vars.css'
import './css/storelocator.css'
import 'components/autocomplete/autocomplete.css'
import 'components/form-search/form-search.css'
import 'components/loader/loader.css'
import 'components/map/map.css'
import 'components/nav/nav.css'
import 'components/popup/popup.css'
import 'components/sidebar/sidebar.css'
import 'components/sidebar-result/sidebar-result.css'

import Map from 'core/map'
import TemplateMap from 'components/map/templates/map'
import TemplateLoader from 'components/loader/templates/loader'

/**
 * storelocatorjs
 * @module storelocatorjs
 */
class Storelocator {
	constructor({ target, api, map, geocoder, templates, onReady }) {
		this.target = target

		const MapProvider = map.provider(Map)
		this.mapProvider = new MapProvider({
			api: Object.assign(
				{},
				{
					radius: 50,
					limit: 50
				},
				api
			),
			map: {
				token: map.token,
				options: map.options
			},
			geocoder,
			templates,
			onReady
		})

		this.init()
	}

	init() {
		this.render()
		this.buildLoader()
		this.mapProvider.build()
	}

	render() {
		this.target.insertAdjacentHTML('beforeend', TemplateMap())
	}

	/**
	 * Build the loader
	 */
	buildLoader() {
		this.target.insertAdjacentHTML('afterbegin', TemplateLoader())
		this.mapProvider.elements.loader = this.target.querySelector('.sl-loader')
	}
}

export default Storelocator
