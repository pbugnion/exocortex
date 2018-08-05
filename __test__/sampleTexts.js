
export const summaryFixtures = {
    multipleParagraphs: {
	text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam malesuada quam turpis, sit amet commodo odio commodo at.

Morbi quis turpis ac turpis condimentum imperdiet et vel velit. Sed porta magna velit, non pretium leo faucibus eget. Ut dignissim eget mauris eu viverra. Sed nec ipsum ut lacus sed.`,
	expectedSummary: [
	    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam malesuada quam turpis, sit amet commodo odio commodo at.`,
	    `Morbi quis turpis ac turpis condimentum imperdiet et vel velit. Sed porta magna velit, non pretium leo faucibus eget. Ut dignissim eget mauris eu viverra. Sed nec ipsum ut lacus sed.`
	]
    },

    longParagraph: {
	text: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam malesuada
quam turpis, sit amet commodo odio commodo at. Morbi quis turpis ac
turpis condimentum imperdiet et vel velit. Sed porta magna velit, non
pretium leo faucibus eget. Ut dignissim eget mauris eu viverra. Sed
nec ipsum ut lacus sed. Lorem ipsum dolor sit amet, consectetur
adipiscing elit. Nam malesuada quam turpis, sit amet commodo odio
commodo at. Morbi quis turpis ac turpis condimentum imperdiet et vel
velit. Sed porta magna velit, non pretium leo faucibus eget. Ut
dignissim eget mauris eu viverra. Sed nec ipsum ut lacus sed.`,
	expectedSummary: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam malesuada\nquam turpis, sit amet commodo odio commodo at. Morbi quis turpis ac\nturpis condimentum imperdiet et vel velit. Sed porta magna velit, non\npretium leo faucibus eget. Ut dignissim eget mauris eu viverra. Sed\nnec ipsum ut lacus sed. Lorem ipsum dolor sit amet, consectetur\nadipiscing elit. Nam malesuada quam turpis, sit amet commodo odio\ncommodo at. Morbi quis turpis ac turpis condimentum imperdiet et vel\nvelit. Sed porta magna v`]
    },

    withCode: {
	text: `
first

    some-code

second
`,
	expectedSummary: ['first', 'second']
    }
}
