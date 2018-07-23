
const quoteTerms = ['"', "'"]

export class SearchQuery {
    static splitIntoTerms(query) {
	const terms = []
	let currentTerm = ''
	let isInsideQuotes = false
	let currentQuoteDelimiter = null
	
	for (let ichar = 0; ichar < query.length; ichar++) {
	    const char = query.charAt(ichar)
	    if (!isInsideQuotes) {
		if (char === ' ') {
		    if (currentTerm.length > 0) {
			terms.push(currentTerm)
		    }
		    currentTerm = ''
		} else if (quoteTerms.includes(char)) {
		    isInsideQuotes = true
		    currentQuoteDelimiter = char
		} else {
		    currentTerm += char
		}
	    } else {
		// inside quotes
		if (char === currentQuoteDelimiter) {
		    if (currentTerm.length > 0) {
			terms.push(currentTerm)
		    }
		    currentTerm = ''
		    isInsideQuotes = false
		    currentQuoteDelimiter = null
		} else {
		    currentTerm += char
		}
	    }
	}
	if (currentTerm.length > 0) {
	    terms.push(currentTerm)
	}
	return terms
    }
}
