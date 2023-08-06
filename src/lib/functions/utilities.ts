// takes a name and returns a slug
export const slugify = (name: string, year: string) => {
	return `${year ? year + '-' : ''}${name
		.toLowerCase()
		.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()']+/g, '')
		.replace(/ /g, '-')}`;
};

// convert tmdb user score to a percentage
export const tmdbPercent = (score: number) => {
	return Math.round(score * 10) + '%';
};

//convert date to a human readable format
export const formatDate = (date: string) => {
	const d = new Date(date);
	return d.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC'
	});
};

// parse json
export const parseJson = (json: string) => {
	return JSON.parse(json);
};
