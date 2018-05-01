



export const getRecommendationList = () => {
	return fetch('https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json')
		.then(res => res.json());
}

export const getNormalList = () => {
	return fetch('https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json')
		.then(res => res.json())
}

export const getAppDetailById = (id) => {
	return fetch('https://itunes.apple.com/hk/lookup?id=' + id)
		.then(res => res.json())
}

export const searchApp = (term) => {
	return fetch('https://itunes.apple.com/search?term=' + term + '&entity=software')
	.then(res => res.json())
}