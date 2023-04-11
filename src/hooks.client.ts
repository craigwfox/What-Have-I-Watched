// takes a name and returns a slug
export const slugify = (name: string) => {
	return name
		.toLowerCase()
		.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()']+/g, '')
		.replace(/ /g, '-');
};
