//@flow

const quoteTerms = ['"', "'"]

export class SearchQuery {
    static splitIntoTerms(query: string): Array<string> {
	const terms = []
	let currentTerm = ''
	let isInsideQuotes = false
	let currentQuoteDelimiter = null

	const pushCurrentTerm = () => {
	    if (currentTerm.length > 0) {
		terms.push(currentTerm)
	    }
	    currentTerm = ''
	}

	const startQuotedBlock = delimiter => {
	    isInsideQuotes = true
	    currentQuoteDelimiter = delimiter
	}

	const endQuotedBlock = () => {
	    isInsideQuotes = false
	    currentQuoteDelimiter = null
	}
	
	for (let ichar = 0; ichar < query.length; ichar++) {
	    const char = query.charAt(ichar)
	    if (!isInsideQuotes) {
		if (char === ' ') {
		    pushCurrentTerm()
		} else if (quoteTerms.includes(char)) {
		    startQuotedBlock(char)
		} else {
		    currentTerm += char
		}
	    } else {
		// inside quotes
		if (char === currentQuoteDelimiter) {
		    pushCurrentTerm()
		    endQuotedBlock()
		} else {
		    currentTerm += char
		}
	    }
	}
	pushCurrentTerm()
	return terms
    }
}
