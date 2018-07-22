
const nodeWeights = {
    heading: 2,
    emphasis: 2,
    strong: 2
}

const excludedNodes = ['yaml', 'thematicBreak', 'image']

export class AstSearcher {
    static buildRelevantAst(ast, terms) {
	const lowercaseTerms = terms.map(term => term.toLowerCase())
	return this._toRelevantNode(ast, lowercaseTerms)
    }

    static _toRelevantNode(node, terms) {
	const { type } = node
	if (excludedNodes.includes(type)) {
	    return null
	}
	const weight = nodeWeights[type] || 1
	if (this._isLeafNode(node)) {
	    const relevance = weight * this._calculateLeafRelevance(node, terms)
	    if (relevance > 0.0) {
		return this._wrapRelevantLeafNode(node, relevance)
	    }
	    else {
		return null
	    }
	} else {
	    const { children } = node
	    if (typeof children === 'undefined') {
		console.warn('Unexpected node with no children')
		return null
	    }
	    const relevantChildren = []
	    let totalUnweightedRelevance = 0.0
	    children.forEach(child => {
		const relevantChildMaybe = this._toRelevantNode(child, terms)
		if (relevantChildMaybe !== null) {
		    relevantChildren.push(relevantChildMaybe)
		    totalUnweightedRelevance += relevantChildMaybe.relevance
		}
	    })
	    if (totalUnweightedRelevance > 0.0) {
		const totalRelevance = totalUnweightedRelevance * weight
		return this._wrapRelevantBranchNode(
		    node, totalRelevance, relevantChildren)
	    } else {
		return null
	    }
	}
    }

    static _isLeafNode(node) {
	const { type } = node
	return ['text', 'code', 'inlineCode'].includes(type)
    }

    static _calculateLeafRelevance(leaf, terms) {
	const { type } = leaf
	if (type === 'text' || type === 'inlineCode') {
	    const { value } = leaf
	    const lowercaseValue = value.toLowerCase()
	    return terms.reduce(
		(acc, term) => acc + (lowercaseValue.includes(term) ? 1.0 : 0.0),
		0.0
	    )
	} else {
	    return 0.0
	}
    }

    static _wrapRelevantLeafNode(node, relevance) {
	return {
	    type: node.type,
	    relevance: relevance,
	    value: node.value
	}
    }

    static _wrapRelevantBranchNode(node, relevance, relevantChildren) {
	return {
	    type: node.type,
	    relevance: relevance,
	    children: relevantChildren
	}
    }
}
